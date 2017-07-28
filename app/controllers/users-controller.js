class UsersController {
    constructor(data) {
        this._data = data;
    }

    getAllUsers(req, res) {
        return this._data.users
            .getAll(null, null, null, Number.MAX_SAFE_INTEGER)
            .then((userlist) => {
                const pugView = 'userslist';
                return res.render(pugView, { userlist: userlist });
            });
    }
}

module.exports = UsersController;
