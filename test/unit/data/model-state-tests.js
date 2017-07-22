
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');

const ModelState = require('../../../data/model-state');

describe('Model state tests', () => {
    describe('Static method "valid()"', () => {
        it('Expect to return valid model state', () => {
            expect(ModelState.valid())
                .to.have.property('isValid', true, 'isValid()');
        });

        it('Expect to return model state without errors', () => {
            const modelStateTest = ModelState.valid();
            expect(modelStateTest)
                .to.have.property('errors');
            expect(modelStateTest.errors)
                .to.deep.equal([]);
        });
    });

    describe('Constructor tests', () => {
        it('Expect to has valid state without parameters', () => {
            const modelStateTest = new ModelState();
            expect(modelStateTest.isValid).to.be.true;
            expect(modelStateTest.errors).to.deep.equal([]);
        });

        it('Expect "isValid" to be false with provided errors', () => {
            const modelStateTest = new ModelState(['error']);
            expect(modelStateTest.isValid).to.be.false;
            expect(modelStateTest.errors).to.not.be.undefined;
            expect(modelStateTest.errors[0]).to.be.equal('error');
        });

        it('Expect "isValid" to be true. Param is false', () => {
            const modelStateTest = new ModelState(false);
            expect(modelStateTest.isValid).to.be.true;
            expect(modelStateTest.errors).to.deep.equal([]);
        });

        it('Expect "isValid" to be true. Param is empty array', () => {
            const modelStateTest = new ModelState([]);
            expect(modelStateTest.isValid).to.be.true;
            expect(modelStateTest.errors).to.deep.equal([]);
        });
    });

    describe('addErrors() tests', () => {
        it('Expect method to be instance', () => {
            expect(ModelState.addError).to.be.undefined;
            const modelState = new ModelState();
            expect(modelState.addError).to.be.a('function');
        });

        it('Expect to has false state if add real error', () => {
            const modelState = new ModelState();
            modelState.addError('username');
            expect(modelState.isValid).to.be.false;
        });

        it('Expect to has true state if add empty text', () => {
            const modelState = new ModelState();
            modelState.addError('');
            expect(modelState.isValid).to.be.true;
        });

        it('Expect to has true state with no parameters', () => {
            const modelState = new ModelState();
            modelState.addError();
            expect(modelState.isValid).to.be.true;
        });

        it('Expect to add duplicate error texts', () => {
            const modelState = new ModelState();
            const errText = 'user-exist';
            modelState.addError(errText);
            modelState.addError(errText);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.equal(2);
            modelState.errors.forEach(function(textError) {
                expect(textError).to.equal(errText);
            });
        });
    });
});
