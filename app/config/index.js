const requireAll = (app) => {
    require('./auth-config')(app);
};

module.exports = requireAll;
