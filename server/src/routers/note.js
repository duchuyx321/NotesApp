const express = require('express');
const router = express.Router();

const NoteController = require('../app/controller/NoteController');
const CheckAuthorization = require('../app/middleware/CheckAuthorization');
const CreateIndex = require('../app/middleware/CreateIndex');
const checkAuthorization = require('../app/middleware/CheckAuthorization');

// [GET /note]
router.get('/formCreate', NoteController.formCreate);
router.get('/search', CreateIndex, checkAuthorization, NoteController.search);
router.get('/restoreNotes', checkAuthorization, NoteController.restoreNote);
router.get('/edit', NoteController.edit);

// [POST /note]
router.post('/create', checkAuthorization, NoteController.create);
router.post('/restore', NoteController.restore);
router.post('/restore', NoteController.manyRestore);

// [PUT /note]
router.put('/update/:id', NoteController.update);

// [DELETE /note]
router.delete('/deleteNote', NoteController.deleteNote);
router.delete('/delete', NoteController.delete);
router.delete('/destroy', NoteController.destroy);

module.exports = router;
