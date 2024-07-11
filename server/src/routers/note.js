const express = require('express');
const router = express.Router();

const NoteController = require('../app/controller/NoteController');

// [GET /note]
router.get('/formCreate', NoteController.formCreate);
router.get('/search', NoteController.search);

// [POST /note]
router.post('/create', NoteController.create);

// [PUT /note]
router.put('/update/:id', NoteController.update);

// [DELETE /note]
router.delete('/delete/:id', NoteController.delete);
router.delete('/destroy/:id', NoteController.destroy);

module.exports = router;
