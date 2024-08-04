const jwt = require('jsonwebtoken');
require('dotenv').config();

const CheckAdmin = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const authorization = req.headers.authorization;
            const token = authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN, (err, config) => {
                if (err) {
                    return res
                        .status(401)
                        .json({ massage: 'Token is invalid' });
                }
                const { admin } = config;
                if (!admin) {
                    return res
                        .status(403)
                        .json({ massage: 'you are not allowed to' });
                } else {
                    req.admin = admin;
                    return next();
                }
            });
        }
    } catch (err) {
        res.status(403).json({ message: err.message });
    }
};

module.exports = { CheckAdmin };
