const express = require('express');
const passport = require('passport');
const router = express.Router();

const {
    PassportProfile,
    PassportRedirect,
} = require('../app/middleware/PassportProfile');
const OtherController = require('../app/controller/OtherController');

router.get('/google/callback', PassportProfile, PassportRedirect);
router.post('/login-Success', OtherController.ggCallback);
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        session: false,
    }),
);
module.exports = router;
