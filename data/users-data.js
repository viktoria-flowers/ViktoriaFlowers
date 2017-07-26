const { ObjectID } = require('mongodb');
const { authHelper } = require('../app/utils');
const BaseData = require('./base-data');
const UserModel = require('./models/user-model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, UserModel, UserModel);
    }

    // override base
    findById(id) {
        return this.collection.findOne({ _id: new ObjectID(id) });
    }

    findByUsername(username) {
        return this.collection.findOne({
            username:
            { $regex: new RegExp('^' + username.toLowerCase() + '$', 'i') },
        });
    }

    // override base
    create(newUser) {
        const modelState = this.validate(newUser);
        if (!modelState.isValid) {
            return Promise.reject(modelState.errors);
        }
        
        const newPassword = authHelper.makeHashFromPassword(newUser.password);
        return this.findByUsername(newUser.username)
            .then((user) => {
                if (user) {
                    return Promise.reject(['username-exist']);
                }

                // register the new user
                newUser.roles = [];
                newUser.orders = [];
                newUser.password = newPassword;
                return super.create(newUser);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}

module.exports = UsersData;
