const ModelState = require('../model-state');

// User constants
const passwordLength = 6;
const phoneLength = 10;
const contactInfoLength = 10;
const userNameMinLength = 4;
const emailRegExPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

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

        if (!userModel.email || !emailRegExPattern.test(userModel.email)) {
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
