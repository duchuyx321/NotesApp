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
            if (req.userId) {
                if (req.query.text) {
                    const regexText = new RegExp(req.query.text, 'i');
                    const results = await Notes.find(
                        {
                            userId: req.userId,
                            $or: [
                                { title: { $regex: regexText } },
                                { content: { $regex: regexText } },
                            ],
                        },
                        // { score: { $meta: 'textScore' } }, // Sắp xếp theo điểm số từ cao đến thấp
                    ); //.sort({ score: { $meta: 'textScore' } }

                    res.json(results);
                }
            }
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
            }
            const title = req.body.title.trim();
            const content = req.body.content.trim();
            const userId = req.userId;
            const note = new Notes({ title, content, userId });
            await note.save();
            res.status(200).json({ message: 'create successfully!' });
        } catch (e) {
            res.json({ message: e.message, next });
        }
    }

    // [PUT] ---/note/update/:_id
    async update(req, res, next) {
        try {
            await Notes.updateOne({ _id: req.params.id }, req.body);
            res.status(200).json({ message: 'Update Success' });
        } catch (e) {
            res.status(404).json({ message: e.message, next });
        }
    }
    //[DELETE] --/note/delete
    async delete(req, res, next) {
        try {
            await Notes.delete({ _id: { $in: req.body.noteIds } });
            res.status(200).json({ message: 'Delete success' });
        } catch (e) {
            res.status(404).json({ message: e.message, next });
        }
    }

    //[DELETE] --/note/destroy
    async destroy(req, res, next) {
        try {
            await Notes.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'destroy Success' });
        } catch (e) {
            res.status(404).json({ message: e.message, next });
        }
    }
}

module.exports = new NoteController();
