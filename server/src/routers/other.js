const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    PassportProfile,
    PassportRedirect,
} = require('../app/middleware/PassportProfile');
const OtherController = require('../app/controller/OtherController');

// --[GET - /api/auth ]--
router.get('/google/callback', PassportProfile, PassportRedirect);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    }),
);
// --[POST - /api/auth ]--
router.post('/login-Success', OtherController.ggCallback);

module.exports = router;
