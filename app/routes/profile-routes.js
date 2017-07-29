const { isLoggedIn } = require('../middlewares');

const profileRoutes = (app, profileController) => {
    app.get('/profile', isLoggedIn, (req, res) => {
        return profileController.getProfile(req, res);
    });

    app.get('/profile-edit', isLoggedIn, (req, res) => {
        return profileController.getEditProfile(req, res);
    });

    app.post('/profile-edit', isLoggedIn, (req, res) => {
        return profileController.postEditProfile(req, res);
    });
};

module.exports = profileRoutes;
