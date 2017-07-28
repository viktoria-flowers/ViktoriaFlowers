const { authHelper } = require('../../app/utils');

module.exports = [{
    password: authHelper.makeHashFromPassword('123456'),
    username: 'Administrator',
    roles: ['admin'],
}, {
    password: authHelper.makeHashFromPassword('123456'),
    username: 'User_00001',
}];
