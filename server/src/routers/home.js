const express = require('express');
const router = express.Router();

const HomeController = require('../app/controller/HomeController');
const { CheckCookie } = require('../app/middleware/CheckCookie');

router.get('/', CheckCookie, HomeController.home);

module.exports = router;
