var config = require('../config');
var jwt = require('jsonwebtoken');

exports.verifyAuthToken = async function (token) {
    try {
        return jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    } catch (e) {
        if (e.name == 'TokenExpiredError') {
            return ({ code: 401, message: 'jwt expired' });
        } else {
            return ({ auth: false, message: 'Failed to authenticate token' });
        }
    }
}

exports.generateAccessToken = async function (usersDetails) {
    return jwt.sign(usersDetails, process.env.JWT_PRIVATE_KEY, { expiresIn: process.env.JWT_EXPIRATION });
}