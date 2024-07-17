require('dotenv').config();
const jwt = require('jsonwebtoken');

const AccessToken = (user) =>
    jwt.sign({ id: user._id, admin: user.admin }, process.env.ACCESS_TOKEN, {
        expiresIn: process.env.END_TIME_REFRESH,
    });

const RefreshToken = (user) =>
    jwt.sign({ id: user._id, admin: user.admin }, process.env.REFRESH_TOKEN, {
        expiresIn: process.env.END_TIME_ACCESS,
    });

module.exports = { AccessToken, RefreshToken };
