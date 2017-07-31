/* eslint-disable no-unused-expressions  */
/* globals it, describe, afterEach, beforeEach */
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

    let ModelClass = null;
    const validator = null;
    let userData = null;

    describe('method "findById()"', () => {
        const idNumber = '222222222222222222222222';
        const Id = new ObjectID(idNumber);
        const existingUser = { _id: Id };

        // const toArray = () => {
        //     return Promise.resolve(existingUser);
        // };

        const findOne = () => {
            return Promise.resolve(existingUser);
        };

        describe('when there are user with such ID in db', () => {
            beforeEach(() => {
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
            const username = 'Pesho';
            const existingUser = { username: username };

            const findOne = () => {
                return Promise.resolve(existingUser);
            };

            beforeEach(() => {
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
        /* eslint-disable max-len  */
        describe('when there are provided user with invalid parameters should by returned model state with error', () => {
            const newUserInvalidUsername = {
                username: 'p',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            const modelState = new ModelState();
            modelState.errors = ['username'];

            ModelClass = {
                validate: () => {
                },
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
            const newUserValid = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            const expectedUser = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            ModelClass = class {
            };

            const modelState = new ModelState();

            ModelClass = {
                validate: () => {
                },
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
            const newUserValid = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            const expectedUser = {
                username: 'Pesho',
                password: 'pesho123456',
                names: 'Pesho',
                phone: '0888888888',
                email: 'abv@abv.bg',
                contactInfo: 'Bulgaria, Sofia...',
            };

            ModelClass = class {
            };

            const modelState = new ModelState();

            ModelClass = {
                validate: () => {
                },
            };

            expectedUser.roles = [];
            expectedUser.orders = [];
            expectedUser.favorites = [];
            expectedUser.password = authHelper.makeHashFromPassword(newUserValid.password);

            const validate = () => {
                return modelState;
            };

            const insert = (user) => {
                return Promise.resolve({ ops: [user] });
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
