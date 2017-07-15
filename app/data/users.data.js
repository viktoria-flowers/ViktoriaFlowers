const { authHelper } = require('../utils');
const BaseData = require('./base.data');
const UserModel = require('../models/user.model');
const { ObjectID } = require('mongodb');

// const usersList = [{
//     username: 'Marti',
//     password: authHelper.makeHashFromPassword('ala'),
//     roles: [],
//     contactInfo: '',
//     email: 'test@test.com',

// }];

class UsersData extends BaseData {
    constructor(db) {
        super(db, UserModel, UserModel);
    }

    findById(id) {
        return this.collection.findOne({ _id: new ObjectID(id) })
            .then((user) => {
                return new Promise((resolve, reject) => {
                    if (!user) {
                        return reject('No such user');
                    }

                    return resolve(user);
                });
            });
    }

    findByUsername(username) {
        return this.collection.findOne({
            username:
            { $regex: new RegExp('^' + username.toLowerCase() + '$', 'i') },
        })
            .then((user) => {
                return new Promise((resolve, reject) => {
                    if (!user) {
                        return reject('No such user');
                    }

                    return resolve(user);
                });
            });
    }

    // override base
    create(newUser) {
        const modelState = this.validate(newUser);
        if (!modelState.isValid) {
            return new Promise((resolve, reject) => {
                return reject(modelState.errors);
            });
        }

        newUser.roles = [];
        newUser.password = authHelper.makeHashFromPassword(newUser.password);
        return super.create(newUser);
    }
}

module.exports = UsersData;
