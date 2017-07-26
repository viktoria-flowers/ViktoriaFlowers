/* eslint-disable no-unused-expressions */
/*globals it, describe, afterEach, beforeEach */
const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectID } = require('mongodb');
const ModelState = require('./../../../data/model-state');

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
        describe('when there are provided user as parameter', () => {
            describe('with invalid parameters should by returned model state with error', () => {
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

                // mock userModel
                ModelClass = {
                    create: () => {
                    },
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
                        userData = new UsersData(db, ModelClass, ModelClass);
                    });

                    // afterEach(() => {
                    //     db.collection.restore();
                    // });

                    it('expect to return ModelState with errors user in db such', () => {
                        return userData.create(newUserInvalidUsername)
                            .then((modelStateWithErrors) => {
                                expect(modelStateWithErrors).to.deep.equal(modelState);
                            });
                    });
                });

                let newUserValid = {
                    username: 'p',
                    password: 'pesho123456',
                    names: 'Pesho',
                    phone: '0888888888',
                    email: 'abv@abv.bg',
                    contactInfo: 'Bulgaria, Sofia...',
                };

            });
        });
    });
