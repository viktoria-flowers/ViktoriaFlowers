const ModelState = require('../model-state');

class User {
    constructor(user) {
        this.id = user._id.toString();
        this.username = user.username;
    }

    static isValid() {
        // to do add validations.
        return ModelState.valid();
    }
}

module.exports = User;
