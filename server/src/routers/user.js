const express = require('express');
const router = express.Router();

const UserController = require('../app/controller/UserController');
const checkAuthorization = require('../app/middleware/CheckAuthorization');

// [GET /user]
router.get('/', checkAuthorization, UserController.user);

module.exports = router;
