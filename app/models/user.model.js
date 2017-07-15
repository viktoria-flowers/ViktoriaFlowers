const ModelState = require('../data/modelstate');
class User {
    constructor(user) {
        this.id = user._id.toString();
        this.username = user.username;
    }

    static isValid() {
        // TODO add valdiations.
        return ModelState.valid();
    }
}

module.exports = User;
