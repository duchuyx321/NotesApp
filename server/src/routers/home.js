const express = require('express');
const router = express.Router();

const HomeController = require('../app/controller/HomeController');
const CheckAuthorization = require('../app/middleware/CheckAuthorization');

router.get('/', CheckAuthorization, HomeController.home);

module.exports = router;
