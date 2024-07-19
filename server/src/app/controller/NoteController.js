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

    // [GET] --/note?slug = "..."
    async edit(req, res, next) {
        try {
            const result = await Notes.findOne({ slug: req.query.slug });
            res.status(200).json(result);
        } catch (e) {
            res.status(403).json(e);
        }
    }

    // [GET] --/note/restoreNotes
    async restoreNote(req, res, next) {
        try {
            if (!req.userId) {
                res.status(400).json({ message: 'you not logged in' });
            }
            const notes = await Notes.findWithDeleted({
                userId: req.userId,
                deleted: 'true',
            });
            res.status(200).json(notes);
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }
    // [POST] --/note/create
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

    // [POST] --/note/restore
    async restore(req, res, next) {
        try {
            const notes = await Notes.restore(
                { _id: { $in: req.body.noteIds } },
                (error, result) => {
                    if (error) {
                        return res.status(403).json({ message: error.message });
                    }
                },
            );
            res.status(200).json({
                message: 'Restored successfully!',
            });
            console.log(notes);
        } catch (e) {
            res.status(404).json({ message: 'not found Id ', e });
        }
    }

    // [PUT] ---/note/update
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
            await Notes.delete({
                _id: { $in: req.body.noteIds },
            });
            res.status(200).json({ message: 'Delete successfully!' });
        } catch (e) {
            res.status(404).json({ message: e.message, next });
        }
    }
    // [DELETE] --/note/deleteNote
    async deleteNote(req, res, next) {
        try {
            await Notes.delete({ _id: req.body.noteId });
            res.status(200).json({ message: 'Delete successfully!' });
        } catch (e) {
            res.status(404).json({ message: e });
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
