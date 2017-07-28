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

    getTopProductsForHomePage(req, res) {
        let sortViewsObj = { viewsCount: -1 };
        let sortNewsesObj = { dateCreated: 1 };

        return this._data.products.getAll({}, sortViewsObj, 1, 6)
            .then((topViewed) => {
                this._data.products.getAll({}, sortNewsesObj, 1, 6)
                    .then((topNewest) => {
                        var products = { topNewest: topNewest, topViewed: topViewed };

                        return res.render('home', products);
                    });
            });
    }
}

module.exports = UsersController;
