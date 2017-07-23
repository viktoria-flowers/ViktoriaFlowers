/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { ProductModel } = require('../../../../data/models');
const { constants } = require('../../../../app/utils');

describe('ProductModel tests', () => {
    describe('isValid() tests', () => {
        it('Expect to be a static function', () => {
            expect(ProductModel).to.have.property('isValid');
            expect(ProductModel.isValid).to.be.a('function');

            const instance = new ProductModel();
            expect(instance.isValid).to.be.undefined;
        });


        it('Expect invalid state when no object provided', () => {
            expect(ProductModel.isValid).to.not.throw();

            const modelState = ProductModel.isValid();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0])
                .to.be.equal(constants.MISSING_MODEL_ERR);
        });

        it('Expect invalid state when empty object provided', () => {
            const modelState = ProductModel.isValid({});

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(3);
            expect(modelState.errors).to.include('title');
            expect(modelState.errors).to.include('description');
            expect(modelState.errors).to.include('price');
        });

        it('Expect invalid state when title is short', () => {
            const testProduct = {
                title: 'a',
                description: 'valid',
                price: 100,
            };

            const modelState = ProductModel.isValid(testProduct);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors).to.include('title');
        });

        it('Expect invalid state when title is missing', () => {
            const testProduct = {
                description: 'valid',
                price: 100,
            };

            const modelState = ProductModel.isValid(testProduct);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors).to.include('title');
        });

        it('Expect invalid state when description is missing', () => {
            const testProduct = {
                title: 'Product #11',
                price: 100,
            };

            const modelState = ProductModel.isValid(testProduct);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors).to.include('description');
        });

        it('Expect invalid state when price is missing', () => {
            const testProduct = {
                title: 'Product #11',
                description: 'Most wanted',
            };

            const modelState = ProductModel.isValid(testProduct);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors).to.include('price');
        });

        it('Expect invalid state when price is too low', () => {
            const testProduct = {
                title: 'Product #11',
                description: 'Most wanted',
                price: 0,
            };

            const modelState = ProductModel.isValid(testProduct);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors).to.include('price');
        });
    });
});
