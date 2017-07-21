const BaseData = require('./base-data');
const EmailSubscriber = require('./models/subscribe-model');

class EmailSubscriberData extends BaseData {
    constructor(db) {
        super(db, EmailSubscriber, EmailSubscriber);
    }

    // override base
    create(newEmailSubscriber) {
        const modelState = this.validate(newEmailSubscriber);
        if (!modelState.isValid) {
            return new Promise((resolve, reject) => {
                return reject(modelState.errors);
            });
        }

        return this.collection.insert(newEmailSubscriber)
            .then((emailSubscribeUser) => {
                if (emailSubscribeUser.email) {
                    return new Promise((resolve, reject) => {
                        return reject(['email-exist']);
                    });
                }

                // register the new user
                newEmailSubscriber.email = emailSubscribeUser.email;
                return super.create(emailSubscribeUser);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}

module.exports = EmailSubscriberData;

