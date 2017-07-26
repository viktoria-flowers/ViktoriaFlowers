/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const ImagesData = require('../../../data/images-data');
const ModelState = require('../../../data/model-state');

describe('ImagesData tests', () => {
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

    const imageData = new ImagesData(db);
    imageData.validate = () => {
        return ModelState.valid();
    };

    describe('create() override', () => {
        it('Expect to add dateCreated fields', () => {
            imageData.create({ originalname: 'test.png' })
                .then((image) => {
                    expect(image.dateCreated).to.be.a('date');
                });
        });

        it('Expect to replace empty spaces with underscore in name', () => {
            imageData.create({ originalname: '   t   e    s     t.png' })
                .then((image) => {
                    expect(image.originalname).to.be.equal('_t_e_s_t.png');
                });
        });

        it('Expect ot return an error if no model provided', () => {
            imageData.create()
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


