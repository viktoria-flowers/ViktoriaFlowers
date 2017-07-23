/* eslint-disable no-unused-expressions */
const { SubscribeModel } = require('../../../../data/models');
const { constants } = require('../../../../app/utils');
const { expect } = require('chai');
const emailError = 'email';

describe('SubscribeModel tests', () => {
    describe('isValid() tests', () => {
        it('Expect to be a static function', () => {
            expect(SubscribeModel).to.have.property('isValid');
            expect(SubscribeModel.isValid).to.be.a('function');

            const instance = new SubscribeModel();
            expect(instance.isValid).to.be.undefined;
        });

        it('Expect invalid state if model is not provided', () => {
            expect(SubscribeModel.isValid).to.not.throw();

            const expectErr = constants.MISSING_MODEL_ERR;
            const modelState = SubscribeModel.isValid();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(expectErr);
        });

        it('Expect invalid state if empty object passed', () => {
            const modelState = SubscribeModel.isValid({});

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(emailError);
        });

        it('Expect invalid state if email is a function', () => {
            const testModel = {};
            testModel.subscribeEmail = () => { };
            const modelState = SubscribeModel.isValid(testModel);

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(emailError);
        });

        it('Expect invalid state if email is in wrong format', () => {
            const testModel = { subscribeEmail: 'myWrongEmail' };

            const modelState = SubscribeModel.isValid(testModel);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(emailError);
        });

        it('Expect all email formats to have invalid state', () => {
            const testModels = [{
                subscribeEmail: '',
            }, {
                subscribeEmail: '@@@@',
            }, {
                subscribeEmail: 'AF920CD',
            }, {
                subscribeEmail: '@',
            }, {
                subscribeEmail: 'TEST_12@mode',
            }, {
                subscribeEmail: 'TEST_12@',
            }, {
                subscribeEmail: '@Email.ME',
            }, {
                subscribeEmail: 'Iam@Valid@office.com',
            }, {
                subscribeEmail: 'Iam Valid@too.eu',
            }, {
                subscribeEmail: 'www.example.com',
            }, {
                subscribeEmail: null,
            }, {
                subscribeEmail: 'invalid@email address.com',
            }, {
                subscribeEmail: 'no.spaces@allowed. com',
            }];

            testModels.forEach((model) => {
                const modelState = SubscribeModel.isValid(model);
                expect(modelState.isValid, model.subscribeEmail).to.be.false;
                expect(modelState.errors.length).to.be.equal(1);
                expect(modelState.errors[0]).to.be.equal(emailError);
            });
        });

        it('Expect all email formats to have valid state', () => {
            const testModels = [{
                subscribeEmail: 'valid@offices.com',
            }, {
                subscribeEmail: 'no_validate@my.sub.domain.is.awesome.ok',
            }, {
                subscribeEmail: '12345@IS_valid.ok',
            }, {
                subscribeEmail: 'TEST_12@mode-site.su',
            }, {
                subscribeEmail: '2@a.com',
            }];

            testModels.forEach((model) => {
                const modelState = SubscribeModel.isValid(model);
                expect(modelState.isValid, model.subscribeEmail).to.be.true;
                expect(modelState.errors.length).to.be.equal(0);
            });
        });
    });
});
