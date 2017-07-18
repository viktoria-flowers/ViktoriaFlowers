/* globals describe, beforeEach, afterEach, it */
const { expect } = require('chai');
const sinon = require('sinon');

const BaseData = require('../../../data/base-data/base-data');

describe('BaseData.getAll()', () => {
    const db = {
        collection: () => { },
    };
    let items = [];

    let ModelClass = null;
    const validator = null;
    let data = null;

    const toArray = () => {
        return Promise.resolve(items);
    };

    const find = () => {
        return {
            toArray,
        };
    };

    describe('when there are items in db', () => {

		// 1
        describe('with default toViewModel', () => {
            beforeEach(() => {
                items = [1, 2, 3, 4];
                sinon.stub(db, 'collection')
                    .callsFake(() => {
                        return { find };
					});
					
                ModelClass = class {};

                data = new BaseData(db, ModelClass, validator);
            });

            afterEach(() => {
                db.collection.restore();
            });

            it('expect to return items', () => {
                return data.getAll()
                    .then((models) => {
                        expect(models).to.deep.equal(items);
                    });
            });
		});
		
		// 2
        // describe('with custom toViewModel', () => {
       
        // });
    });
});