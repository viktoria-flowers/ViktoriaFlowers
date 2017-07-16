const crypto = require('crypto');
const algorithm = 'sha256';
const defaultSalt = '7d6fc41917953';
const hashEncoding = 'hex';

const makeHashFromPassword = (password, salt) => {
    salt = salt || defaultSalt;
    if (!password || (!!password.length && password.length === 0)) {
        throw new Error('The password is required');
    }

    return crypto.createHmac(algorithm, salt)
        .update(password)
        .digest(hashEncoding);
};

module.exports = { makeHashFromPassword };
