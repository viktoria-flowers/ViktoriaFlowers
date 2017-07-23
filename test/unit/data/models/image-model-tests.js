/* eslint-disable no-unused-expressions */
const { ImageModel } = require('../../../../data/models');
const { expect } = require('chai');
const { constants } = require('../../../../app/utils');


describe('ImageModel tests', () => {
    describe('isValid() tests', () => {
        it('Expect to be a static function', () => {
            expect(ImageModel).to.have.property('isValid');
            expect(ImageModel.isValid).to.be.a('function');

            const instance = new ImageModel();
            expect(instance.isValid).to.be.undefined;
        });

        it('Expect invalid state when no object provided', () => {
            expect(ImageModel.isValid).to.not.throw();

            const modelState = ImageModel.isValid();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0])
                .to.be.equal(constants.MISSING_MODEL_ERR);
        });

        it('Expect invalid state when empty object provided', () => {
            const modelState = ImageModel.isValid({});

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('size');
        });

        it('Expect invalid state when size is too high', () => {
            const imageTest = { size: (1000 * 2000) + 1 };
            const modelState = ImageModel.isValid(imageTest);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('size');
        });

        it('Expect valid state when object is correct', () => {
            const imageTest = { size: 20031, originalName: 'image.png' };
            const modelState = ImageModel.isValid(imageTest);

            expect(modelState.isValid).to.be.true;
            expect(modelState.errors.length).to.be.equal(0);
        });
    });
});
