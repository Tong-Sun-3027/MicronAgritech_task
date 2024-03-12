const crypto = require('crypto');
const secretKey = 'Micron';         // secret Key

hashPassword = (password) => {
    /**
        createHmac():  create a HMAC(Hash-based Message Authentication Code) instance
        update():  add the password
        digest():  get HMAC
    */
    return crypto.createHmac('sha256', secretKey).update(password).digest('hex');
}

module.exports = {hashPassword: hashPassword}
