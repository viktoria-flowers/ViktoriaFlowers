/* eslint-disable no-unused-expressions */
/*globals it, describe, afterEach, beforeEach */
const { expect } = require('chai');
const sinon = require('sinon');
const { ObjectID } = require('mongodb');

const UsersData = require('../../../data/users-data');

describe('UsersData tests', () => {
    describe('method "findById()"', () => {
        const db = {
            collection: () => { },
        };
        let items = [];

        let ModelClass = null;
        const validator = null;
        let userData = null;
        let idNumber = '222222222222222222222222';
        let Id = new ObjectID(idNumber);
        let existingUser = { _id: Id };

        const toArray = () => {
            return Promise.resolve(existingUser);
        };

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

            it('expect to return user', () => {
                return userData.findById(idNumber)
                    .then((user) => {
                        expect(user).to.deep.equal(existingUser);
                    });
            });
        });
    });
});
