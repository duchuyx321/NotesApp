const express = require('express');
const router = express.Router();

const SendCodeController = require('../app/controller/CodeController');

// [GET /code]

// [POST /code]
router.post('/getCode', SendCodeController.getCode);
router.post('/checkCode', SendCodeController.checkCode);

module.exports = router;
