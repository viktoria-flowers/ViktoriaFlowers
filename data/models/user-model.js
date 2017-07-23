const ModelState = require('../model-state');
const { constants } = require('../../app/utils');

// User constants
const passwordLength = 6;
const phoneLength = 10;
const contactInfoLength = 10;
const userNameMinLength = 4;

class User {
    static toViewModel(user) {
        return {
            id: user._id.toString(),
            username: user.username,
        };
    }

    static isValid(userModel) {
        const modelState = new ModelState();
        if (!userModel.names) {
            modelState.addError('names');
        }

        if (!userModel.phone || userModel.phone.length < phoneLength) {
            modelState.addError('phone');
        }

        if (!userModel.email || !constants.EMAIL_REGEX.test(userModel.email)) {
            modelState.addError('email');
        }

        if (!userModel.contactInfo ||
            userModel.contactInfo.length < contactInfoLength) {
            modelState.addError('contactInfo');
        }

        if (!userModel.password || userModel.password.length < passwordLength) {
            modelState.addError('password');
        }

        if (!userModel.username ||
            userModel.username.length < userNameMinLength) {
            modelState.addError('username');
        }

        return modelState;
    }
}

module.exports = User;
