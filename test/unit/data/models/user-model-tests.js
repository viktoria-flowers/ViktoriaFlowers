/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const { UserModel } = require('../../../../data/models');
const { constants } = require('../../../../app/utils');

describe('UserModel tests', () => {
    describe('isValid() tests', () => {
        const validUser = {};
        beforeEach(() => {
            validUser.names = 'My Test user';
            validUser.password = '123456789';
            validUser.username = 'Sandokan';
            validUser.phone = '08984878878';
            validUser.email = 'my-company@offices.com';
            validUser.contactInfo = 'London 23 Trader st.';
        });

        it('Expect to be a static function', () => {
            expect(UserModel).to.have.property('isValid');
            expect(UserModel.isValid).to.be.a('function');

            const instance = new UserModel();
            expect(instance.isValid).to.be.undefined;
        });

        it('Expect invalid state if model is not provided', () => {
            expect(UserModel.isValid).to.not.throw();

            const expectErr = constants.MISSING_MODEL_ERR;
            const modelState = UserModel.isValid();
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal(expectErr);
        });

        it('Expect invalid state if empty object passed', () => {
            const modelState = UserModel.isValid({});

            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(6);
            expect(modelState.errors).to.include('names');
            expect(modelState.errors).to.include('phone');
            expect(modelState.errors).to.include('email');
            expect(modelState.errors).to.include('contactInfo');
            expect(modelState.errors).to.include('password');
            expect(modelState.errors).to.include('username');
        });

        it('Expect invalid state if the names are missing', () => {
            delete validUser.names;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('names');
        });

        it('Expect invalid state if the phone is missing', () => {
            delete validUser.phone;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('phone');
        });

        it('Expect invalid state if the phone is short', () => {
            validUser.phone = '08887';

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('phone');
        });

        it('Expect invalid state if the email is missing', () => {
            delete validUser.email;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('email');
        });

        it('Expect invalid state if the email is wrong', () => {
            validUser.email = 'wrong email';

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('email');
        });

        it('Expect invalid state if the contactInfo is missing', () => {
            delete validUser.contactInfo;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('contactInfo');
        });

        it('Expect invalid state if the contactInfo is short', () => {
            validUser.contactInfo = 'London';

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('contactInfo');
        });

        it('Expect invalid state if the password is missing', () => {
            delete validUser.password;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('password');
        });

        it('Expect invalid state if the password is short', () => {
            validUser.password = 'p[@';

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('password');
        });

        it('Expect invalid state if the username is missing', () => {
            delete validUser.username;

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('username');
        });

        it('Expect invalid state if the username is short', () => {
            validUser.username = 'w';

            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.false;
            expect(modelState.errors.length).to.be.equal(1);
            expect(modelState.errors[0]).to.be.equal('username');
        });

        it('Expect valid state', () => {
            const modelState = UserModel.isValid(validUser);
            expect(modelState.isValid).to.be.true;
            expect(modelState.errors).to.be.deep.equal([]);
        });
    });

    describe('toViewModel() tests', () => {
        let objectId = {};

        beforeEach(() => {
            objectId = (value) => {
                return {
                    _value: value,
                    toString: function() {
                        return this._value + '';
                    },
                };
            };
        });

        it('Expect to be a static function', () => {
            expect(UserModel.toViewModel).to.be.a('function');
            expect(new UserModel().toViewModel).to.be.undefined;
        });

        it('Expect to throw if object is not provided', () => {
            expect(UserModel.toViewModel).to.throw();
        });

        it('Expect to return object with not defined properties', () => {
            const viewModel = UserModel.toViewModel({});
            expect(viewModel.id).to.be.undefined;
            expect(viewModel.username).to.be.undefined;
        });

        it('Expect ot return correct model', () => {
            const testModel = {
                _id: objectId('D1C5A487AF'),
                username: 'username00012',
            };

            const viewModel = UserModel.toViewModel(testModel);

            expect(viewModel.id).to.be.equal('D1C5A487AF');
            expect(viewModel.username).to.be.equal('username00012');
        });
    });
});
