const { ObjectID } = require('mongodb');
const { authHelper } = require('./../utils');

class ProfileController {
    constructor(data) {
        this._data = data;
    }

    getProfile(req, res) {
        return this._data.users.getAll(req.user._id)
            .then((user) => {
                return res.render('profile', { user: user[0] });
            });
    }

    getEditProfile(req, res) {
        return this._data.users.getAll(req.user._id).then((user) => {
            return res.render('profile-edit', { user: user[0] });
        });
    }

    postEditProfile(req, res) {
        /* This is done because mongodb ids are ObjectIDs and we are trying to 
        send it a string as an ID, this is why we convert it into an ObjectID */
        const convertStringToObjectID = new ObjectID(req.user._id);
        req.body._id = convertStringToObjectID;

        if (req.body.password.length === 0) {
            req.body.password = req.user.password;

            return this._data.users.updateUserPropertiesById(req.body)
                .then(() => {
                    res.redirect('/profile');
                }, (error) => {
                    res.redirect('/profile-edit');
                });
        }

        req.body.password = authHelper
            .makeHashFromPassword(req.body.password);
        return this._data.users
            .updateUserPropertiesById(req.body, req.body.password)
            .then((updatedUser, error) => {
                res.redirect('/profile');
            }, (error) => {
                res.redirect('/profile-edit');
            });
    }
}

module.exports = ProfileController;
