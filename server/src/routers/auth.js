const express = require('express');
const router = express.Router();

const AuthController = require('../app/controller/AuthController');

router.get('/fromLogin', AuthController.fromLogin);
router.get('/formRegister', AuthController.fromRegister);

router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.post('/refresh', AuthController.refresh);
router.post('/register', AuthController.register);

module.exports = router;
