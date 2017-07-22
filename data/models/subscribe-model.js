const ModelState = require('../model-state');

// E-mail check constant
const emailRegExPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

class EmailSubscriber {
    static isValid(subscribeModel) {
        const modelState = new ModelState();

        if (!subscribeModel.subscribeEmail ||
            !emailRegExPattern.test(subscribeModel.subscribeEmail)) {
            modelState.addError('email');
        }

        return modelState;
    }
}

module.exports = EmailSubscriber;
