const BaseData = require('./base-data');
const EmailSubscriber = require('./models/subscribe-model');

class EmailSubscriberData extends BaseData {
    constructor(db) {
        super(db, EmailSubscriber, EmailSubscriber);
    }
}

module.exports = EmailSubscriberData;

