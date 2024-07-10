const Notes = require('../module/notes');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class NoteController {
    // [GET] --/note/formCreate
    async formCreate(req, res, next) {
        try {
            if (!req.cookies.accessToken) {
                res.status(404).json({ message: 'Access token not provided' });
            }
            const accessToken = req.cookies.accessToken;
            const token = jwt.verify(accessToken, process.env.ACCESS_TOKEN);

            const { id, admin } = token;
            // res.json(id);
            res.render('notes/create', { id });
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }

    // [GET] --/note/search?text="...."
    async search(req, res, next) {
        try {
            const Authorization = req.headers['authorization'];
            if (!Authorization) {
                return res.json({ message: 'please login' });
            }
            const token = Authorization.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN, async (err, other) => {
                if (err) {
                    return res.json({ message: err.message });
                }
                const { id, admin } = other;
                if (req.query.text) {
                    const regexText = new RegExp(req.query.text, 'i');
                    const results = await Notes.find(
                        {
                            userId: id,
                            $or: [
                                { title: { $regex: regexText } },
                                { content: { $regex: regexText } },
                            ],
                        },
                        // { score: { $meta: 'textScore' } }, // Sắp xếp theo điểm số từ cao đến thấp
                    ); //.sort({ score: { $meta: 'textScore' } }

                    res.json(results);
                }
            });
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }

    // [POST] ---/note/create
    async create(req, res, next) {
        try {
            if (!req.body.title) {
                res.status(400).json({ message: 'title not found' });
            } else if (!req.body.content) {
                res.status(400).json({ message: 'content not found' });
            } else if (!req.body.userId) {
                res.status(400).json({ message: ' id user not found' });
            }
            const note = new Notes(req.body);
            await note.save();
            res.redirect('/');
            // res.status(200).json(req.body);
        } catch (e) {
            res.json({ message: e.message, next });
        }
    }
}

module.exports = new NoteController();
