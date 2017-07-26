/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { ContactUsData } = require('../../../../data/models');
const { constants } = require('../../../../app/utils');

describe('ContactUsDataModel tests', () => {
    describe('isValid() tests', () => {
        it('Expect to be a static function', () => {
            expect(ContactUsData).to.have.property('isValid');
            expect(ContactUsData.isValid).to.be.a('function');

            const instance = new ContactUsData();
            expect(instance.isValid).to.be.undefined;
        });

        it('Expect invalid state if model is not provided', () => {
            expect(ContactUsData.isValid).to.not.throw();

            const expectErr = constants.MISSING_MODEL_ERR;
            const modelState = ContactUsData.isValid();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(expectErr);
        });

        it('Expect invalid state with empty object', () => {
            const modelState = ContactUsData.isValid({});

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(3);
            expect(modelState.errors).to.include('names');
            expect(modelState.errors).to.include('email');
            expect(modelState.errors).to.include('text');
        });

        it('Expect invalid state if model name is missing', () => {
            const obj = {
                contactUserEmail: 'my@test.com',
                contactUserText: 'Description',
            };

            const modelState = ContactUsData.isValid(obj);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('names');
        });

        it('Expect invalid state if model email is invalid', () => {
            const obj = {
                contactUserNames: 'My sample names',
                contactUserEmail: 'my @invalid.email',
                contactUserText: 'Description',
            };

            const modelState = ContactUsData.isValid(obj);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('email');
        });

        it('Expect invalid state if model text is invalid', () => {
            const obj = {
                contactUserNames: 'My sample names',
                contactUserEmail: 'sample@test.com',
                contactUserText: '',
            };

            const modelState = ContactUsData.isValid(obj);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('text');
        });
    });
});
