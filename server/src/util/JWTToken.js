require('dotenv').config();
const jwt = require('jsonwebtoken');

const AccessToken = (user) =>
    jwt.sign({ id: user._id, admin: user.admin }, process.env.ACCESS_TOKEN, {
        expiresIn: '1h',
    });

const RefreshToken = (user) =>
    jwt.sign({ id: user._id, admin: user.admin }, process.env.REFRESH_TOKEN, {
        expiresIn: '1h',
    });

module.exports = { AccessToken, RefreshToken };
