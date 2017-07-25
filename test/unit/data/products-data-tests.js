/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const ProductsData = require('../../../data/products-data');
const ModelState = require('../../../data/model-state');

describe('Products data tests', () => {
    const collectionObj = {
        insert: (model) => {
            model._id = (Math.random() * 10000);
            return Promise.resolve({
                ops: [model],
            });
        },
    };
    const db = {
        collection: (name) => {
            return collectionObj;
        },
    };

    const productData = new ProductsData(db);
    productData.validate = () => {
        return ModelState.valid();
    };

    describe('create() override', () => {
        it('Expect to add dateCreated and viewsCount fields', () => {
            productData.create({ title: 'Test-Product' })
                .then((prod) => {
                    expect(prod.dateCreated).to.be.a('date');
                    expect(prod.viewsCount).to.be.equal(0);
                });
        });

        it('Expect ot return an error if no model provided', () => {
            productData.create()
                .then(() => {
                    // Should not come here
                    expect(true).to.be.false;
                })
                .catch((errors) => {
                    expect(errors).to.be.an('array');
                    expect(errors[0]).to.be.equal('model-missing');
                });
        });
    });
});
