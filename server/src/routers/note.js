const express = require('express');
const router = express.Router();

const NoteController = require('../app/controller/NoteController');
const CheckAuthorization = require('../app/middleware/CheckAuthorization');
const CreateIndex = require('../app/middleware/CreateIndex');
const checkAuthorization = require('../app/middleware/CheckAuthorization');

// [GET /note]
router.get('/formCreate', NoteController.formCreate);
router.get('/search', CreateIndex, checkAuthorization, NoteController.search);

// [POST /note]
router.post('/create', NoteController.create);

// [PUT /note]
router.put('/update/:id', NoteController.update);

// [DELETE /note]
router.delete('/delete/:id', NoteController.delete);
router.delete('/destroy/:id', NoteController.destroy);

module.exports = router;
