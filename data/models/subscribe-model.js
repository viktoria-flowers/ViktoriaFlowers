const ModelState = require('../model-state');
const { constants } = require('../../app/utils');

class EmailSubscriber {
    static isValid(subscribeModel) {
        const modelState = new ModelState();

        if (!subscribeModel) {
            modelState.addError(constants.MISSING_MODEL_ERR);
            return modelState;
        }

        if (!subscribeModel.subscribeEmail ||
            !constants.EMAIL_REGEX.test(subscribeModel.subscribeEmail)) {
            modelState.addError('email');
        }

        return modelState;
    }
}

module.exports = EmailSubscriber;
