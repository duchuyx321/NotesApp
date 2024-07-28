const express = require('express');
const router = express.Router();

const AuthController = require('../app/controller/AuthController');
// [GET /auth]
router.get('/fromLogin', AuthController.fromLogin);
router.get('/formRegister', AuthController.fromRegister);
router.get('/getCode', AuthController.getCode);

// [POST /auth]
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.post('/register', AuthController.register);
router.post('/getCode', AuthController.getCode);

module.exports = router;
