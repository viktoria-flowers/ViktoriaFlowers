const ModelState = require('../model-state');
const { constants } = require('../../app/utils');

class ContactUsData {
    static isValid(contactUsModelData) {
        const modelState = new ModelState();

        if (!contactUsModelData) {
            modelState.addError(constants.MISSING_MODEL_ERR);
            return modelState;
        }

        if (!contactUsModelData.contactUserNames) {
            modelState.addError('names');
        }

        if (!contactUsModelData.contactUserEmail ||
            !constants.EMAIL_REGEX.test(contactUsModelData.contactUserEmail)) {
            modelState.addError('email');
        }
        if (!contactUsModelData.contactUserText ||
            !constants.TEXTAREA_REGEX.
                test(contactUsModelData.contactUserText)) {
            modelState.addError('text');
        }

        return modelState;
    }
}

module.exports = ContactUsData;
