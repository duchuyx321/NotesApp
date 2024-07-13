const User = require('../module/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    // [GET] --/user
    async user(req, res, next) {
        try {
            if (req.userId) {
                console.log(req.userId);
                const user = await User.findOne({ _id: req.userId });
                console.log(user);
                res.status(200).json(user);
            }
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }
}

module.exports = new UserController();
