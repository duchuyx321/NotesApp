const User = require('../module/user');
const Notes = require('../module/notes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {
    // [GET] --/user
    async user(req, res, next) {
        try {
            if (req.userId) {
                const user = await User.findOne({ _id: req.userId });
                const note = await Notes.countDocumentsWithDeleted({
                    userId: req.userId,
                    deleted: 'true',
                });
                res.status(200).json({ user, countRestoreNotes: note });
            }
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new UserController();
