/* eslint-disable no-unused-expressions */
/*globals it, describe, afterEach, beforeEach */
const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectID } = require('mongodb');
const ModelState = require('./../../../data/model-state');
const { authHelper } = require('./../../../app/utils');

const UsersData = require('../../../data/users-data');

describe('UsersData tests', () => {
    const db = {
        collection: () => { },
    };

    let items = [];
    let ModelClass = null;
    const validator = null;
    let userData = null;

    describe('method "findById()"', () => {
        let idNumber = '222222222222222222222222';
        let Id = new ObjectID(idNumber);
        let existingUser = { _id: Id };

        // const toArray = () => {
        //     return Promise.resolve(existingUser);
        // };

        const findOne = () => {
            return Promise.resolve(existingUser);
        };

        describe('when there are user with such ID in db', () => {
            beforeEach(() => {
                items = [existingUser];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });
                ModelClass = class {
                };

                // Arrange
                userData = new UsersData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return user whit such ID', () => {
                return userData.findById(idNumber)
                    .then((user) => {
                        expect(user).to.deep.equal(existingUser);
                    });
            });
        });
    });

    describe('method "findByUsername()"', () => {
        describe('when there are user with such username in db', () => {
            let username = 'Pesho';
            let existingUser = { username: username };

            const findOne = () => {
                return Promise.resolve(existingUser);
            };

            beforeEach(() => {
                items = [existingUser];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });
                ModelClass = class {
                };

                // Arrange
                userData = new UsersData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return user with such username', () => {
                return userData.findByUsername(username)
                    .then((user) => {
                        expect(user).to.deep.equal(existingUser);
                    });
            });
        });
    });

    describe('method "create()"', () => {
        describe('when there are provided user with invalid parameters should by returned model state with error', () => {
            let newUserInvalidUsername = {
                username: 'p',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            let modelState = new ModelState();
            modelState.errors = ['username'];

            ModelClass = {
                validate: () => {
                }
            };

            const validate = () => {
                return modelState;
            };

            beforeEach(() => {
                sinon.stub(ModelClass, 'validate')
                    .callsFake(() => {
                        return { validate };
                    });

                // Arrange
                userData = new UsersData(db, ModelClass, null);
            });

            it('expect to return ModelState with errors user in db such', () => {
                return userData.create(newUserInvalidUsername)
                    .catch((errors) => {
                        expect(errors).to.deep.equal(modelState.errors);
                    });
            });
        });

        describe('when there are provided user and hi exist in data base should be return error', () => {
            let newUserValid = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            let expectedUser = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            ModelClass = class {
            };

            let modelState = new ModelState();

            ModelClass = {
                validate: () => {
                }
            };

            expectedUser.roles = [];
            expectedUser.orders = [];
            expectedUser.password = authHelper.makeHashFromPassword(newUserValid.password);

            const validate = () => {
                return modelState;
            };

            const findOne = (name) => {
                return Promise.resolve(expectedUser);
            };

            beforeEach(() => {
                sinon.stub(ModelClass, 'validate')
                    .callsFake(() => {
                        return { validate };
                    });

                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne };
                    });

                // Arrange
                userData = new UsersData(db, ModelClass, { isValid: () => ModelState.valid() });
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return user with set correct parameters', () => {
                return userData.create(newUserValid)
                    .catch((error) => {
                        expect(error).to.deep.equal(['username-exist']);
                    });
            });
        });


        describe('when there are provided user with valid parameters should by created and saved in database', () => {
            let newUserValid = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            let expectedUser = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            ModelClass = class {
            };

            let modelState = new ModelState();

            ModelClass = {
                validate: () => {
                }
            };

            expectedUser.roles = [];
            expectedUser.orders = [];
            expectedUser.password = authHelper.makeHashFromPassword(newUserValid.password);

            const validate = () => {
                return modelState;
            };

            const insert = (user) => {
                return Promise.resolve({ops: [user]});
            };

            const findOne = (name) => {
                return Promise.resolve(null);
            };

            beforeEach(() => {
                sinon.stub(ModelClass, 'validate')
                    .callsFake(() => {
                        return { validate };
                    });

                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { findOne, insert };
                    });

                // Arrange
                userData = new UsersData(db, ModelClass, { isValid: () => ModelState.valid() });
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return user with set correct parameters', () => {
                return userData.create(newUserValid)
                    .then((user) => {
                        expect(user).to.deep.equal(expectedUser);
                    });
            });
        });
    });
});
