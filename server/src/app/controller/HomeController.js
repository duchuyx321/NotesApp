const jwt = require('jsonwebtoken');

const Notes = require('../module/notes');
const { multiplyMongooseToObject } = require('../../util/mongoose');
require('dotenv').config();

class HomeController {
    // [GET] --/
    async home(req, res, next) {
        try {
            if (req.userId) {
                const notes = await Notes.find({ userId: req.userId });
                res.status(200).json(notes);
            }
        } catch (err) {
            res.json({ message: err.message, next });
        }
    }
}

module.exports = new HomeController();
