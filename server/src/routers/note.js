const express = require('express');
const router = express.Router();

const NoteController = require('../app/controller/NoteController');

router.get('/formCreate', NoteController.formCreate);
router.get('/search', NoteController.search);

router.post('/create', NoteController.create);

module.exports = router;
