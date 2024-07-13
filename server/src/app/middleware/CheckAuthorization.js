const jwt = require('jsonwebtoken');
require('dotenv').config();
const checkAuthorization = (req, res, next) => {
    try {
        const Authorization = req.headers['authorization'];
        if (!Authorization) {
            return res
                .status(401)
                .json({ message: ' your are not authorized' });
        }
        const token = Authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, data) => {
            if (err) {
                return res.status(402).json({ message: err.message });
            }
            const { id, admin } = data;
            req.userId = id;
            req.admin = admin;
            next();
        });
    } catch (err) {
        res.status(501).json({ error: err.message });
    }
};

module.exports = checkAuthorization;
