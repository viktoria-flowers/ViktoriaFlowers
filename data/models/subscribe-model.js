const ModelState = require('../model-state');

// E-mail check constant
const emailRegExPattern = /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/;

class EmailSubscriber {
    static isValid(emailSubscription) {
        const modelState = new ModelState(false);

        if (!emailSubscription.email ||
            !emailRegExPattern.test(emailSubscription.email)) {
            modelState.addError('email');
        }

        return modelState;
    }
}

module.exports = EmailSubscriber;
