const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const passport = require('passport');

const User = require('../app/module/user');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback',
        },
        async function (accessToken, refreshToken, profile, cb) {
            // find or create database
            try {
                if (profile) {
                    const existingProfile = await User.findOne({
                        $or: [
                            { provider_Id: profile.provider },
                            { email: profile._json.email },
                        ],
                    });
                    if (!existingProfile) {
                        const profileName = profile._json.name.trim();

                        // Thay thế khoảng trắng giữa các từ bằng không gian trống
                        const newUsername = profileName.replace(/\s+/g, '');
                        const newUser = new User({
                            username: newUsername,
                            name: profile._json.name,
                            email: profile._json.email,
                            avatar: profile._json.picture,
                            provider: profile.provider,
                            provider_Id: profile.id,
                        });
                        await newUser.save();
                        return cb(null, newUser);
                    } else {
                        return cb(null, existingProfile);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
    ),
);
