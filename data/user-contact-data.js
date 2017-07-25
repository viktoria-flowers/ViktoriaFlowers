const BaseData = require('./base-data');
const ContactUsModel = require('./models/user-contact-model');

class ContactUsUsers extends BaseData {
    constructor(db) {
        super(db, ContactUsModel, ContactUsModel);
    }
}

module.exports = ContactUsUsers;
