/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const BaseData = require('../../../data/base-data/base-data');
const ModelState = require('../../../data/model-state');
const { constants } = require('../../../app/utils');
const sinon = require('sinon');
const { ObjectID } = require('mongodb');

describe('BaseData tests', () => {
    const db = {
        collection: () => { },
    };

    let items = [];

    let ModelClass = null;
    const validator = null;
    let baseData = null;
    const idNumber = '222222222222222222222222';
    // let Id = new ObjectID(idNumber);

    const toArray = () => {
        return Promise.resolve(items);
    };

    // const findOne = () => {
    //     return Promise.resolve(existingUser);
    // };

    const find = (obj) => {
        if (obj) {
            items.push({ findWith: obj });
        }

        return { sort };
    };

    const sort = (obj) => {
        if (obj) {
            items.push({ sortWith: obj });
        }

        return { skip };
    };

    const skip = (obj) => {
        if (typeof obj !== 'undefined') {
            items.push({ skipWith: obj });
        }

        return { limit };
    };

    const limit = (obj) => {
        if (obj) {
            items.push({ limitWith: obj });
        }

        return { toArray };
    };

    const findByIdObject = {
        title: 'Product #0003',
        description: 'Testing product description',
        price: 22,
    };

    const findOne = (obj) => {
        if (obj) {
            items.push({ withId: obj });
        }

        return Promise.resolve(findByIdObject);
    };

    describe('getAll() tests', () => {
        // Arrange
        beforeEach(() => {
            items = [];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { find };
                });

            ModelClass = class {
            };

            baseData = new BaseData(db, ModelClass);
        });

        it('Expect to use default parameters', () => {
            const expectedLimit = constants.DEFAULT_PAGE_SIZE;
            baseData.getAll()
                .then((fakeItems) => {
                    expect(fakeItems).to.deep.include({ sortWith: {} });
                    expect(fakeItems)
                        .to.deep.include({ limitWith: expectedLimit });
                    expect(fakeItems).to.deep.include({ skipWith: 0 });
                });
        });

        it('Expect to use default parameters for page and size', () => {
            const expectedLimit = constants.DEFAULT_PAGE_SIZE;
            const expectedFilter = {
                title: 'flower',
            };

            baseData.getAll(expectedFilter)
                .then((fakeItems) => {
                    expect(fakeItems)
                        .to.deep.include({ findWith: expectedFilter });
                    expect(fakeItems).to.deep.include({ sortWith: {} });
                    expect(fakeItems)
                        .to.deep.include({ limitWith: expectedLimit });
                    expect(fakeItems).to.deep.include({ skipWith: 0 });
                });
        });

        it('Expect to use default find when using only paging', () => {
            const page = 2;
            const size = 50;
            const expectedLimit = (page - 1) * size;

            baseData.getAll(null, null, page, size)
                .then((fakeItems) => {
                    expect(fakeItems).to.deep.include({ sortWith: {} });
                    expect(fakeItems)
                        .to.deep.include({ limitWith: expectedLimit });
                    expect(fakeItems).to.deep.include({ skipWith: size });
                });
        });

        afterEach(() => {
            db.collection.restore();
        });
    });

    describe('getById() tests', () => {
        // Arrange
        beforeEach(() => {
            items = [];
            sinon.stub(db, 'collection')
                .callsFake(() => {
                    return { findOne };
                });

            const classModel = {
                name: 'Test',
            };

            baseData = new BaseData(db, classModel);
        });


        it('Expect to return error if id is missing', () => {
            baseData.findById()
                .then(() => {
                    // Should not come here!
                    expect(false).to.be.true;
                })
                .catch((err) => {
                    expect(err).to.be.an('array');
                    expect(err).to.include('invalid-id');
                });
        });

        it('Expect to return error if id is invalid', () => {
            baseData.findById('8799456646')
                .then(() => {
                    // Should not come here!
                    expect(false).to.be.true;
                })
                .catch((err) => {
                    expect(err).to.be.an('array');
                    expect(err).to.include('invalid-id');
                });
        });

        it('Expect to resolve with the model', () => {
            // make valid ID 
            const validId = '2'.repeat(24);
            baseData.findById(validId)
                .then((model) => {
                    // Should not come here!
                    expect(model).to.be.deep.equal(findByIdObject);
                });
        });

        afterEach(() => {
            db.collection.restore();
        });
    });

    describe('validate() tests', () => {
        const classModel = { name: 'TestProducts' };
        const dbMock = { collection: () => { } };

        beforeEach(() => {
            baseData = new BaseData(dbMock, classModel);
        });

        it('Expect valid state if validator is undefined', () => {
            const modelState = baseData.validate();
            expect(modelState.isValid).to.be.true;
        });

        it('Expect valid state if validator.isValid is undefined', () => {
            baseData.validator = {};
            const modelState = baseData.validate();
            expect(modelState.isValid).to.be.true;
        });

        it('Expect valid state if validator.isValid is not a function', () => {
            baseData.validator = { isValid: 'test' };
            const modelState = baseData.validate();
            expect(modelState.isValid).to.be.true;
        });

        it('Expect to return false state', () => {
            baseData.validator = { isValid: () => new ModelState(['error']) };
            const modelState = baseData.validate();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors).to.include('error');
        });
    });
});

