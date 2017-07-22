const ModelState = require('../model-state');

// E-mail check constant
const emailRegExPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

class EmailSubscriber {
    static isValid(subscribeModel) {
        const modelState = new ModelState(false);

        if (!subscribeModel.subscribeEmail ||
            !emailRegExPattern.test(subscribeModel.subscribeEmail)) {
            modelState.addError('email');
        }

        if (!modelState.errors || modelState.errors.length === 0) {
            modelState.isValid = true;
        }

        return modelState;
    }
}

module.exports = EmailSubscriber;
