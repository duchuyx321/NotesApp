const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../module/user');
const { AccessToken, RefreshToken } = require('../../util/JWTToken');

class AuthController {
    // [GET] /auth/fromLogin
    async fromLogin(req, res, next) {
        try {
            res.render('auth/login');
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }
    //[GET] /auth/fromRegister
    async fromRegister(req, res, next) {
        try {
            res.render('auth/register');
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }

    //[POST] /auth/login
    async login(req, res, next) {
        try {
            const user = await User.findOne({
                username: req.body.username.trim(),
            });
            if (!user.username) {
                res.status(401).json({ message: 'User not found' });
                return;
            }
            if (user.email != req.body.email.trim()) {
                res.status(401).json({ message: 'Email not found' });
                return;
            }
            const hashPassword = await bcrypt.compare(
                req.body.password.trim(),
                user.password,
            );
            if (!hashPassword) {
                res.status(401).json({ message: 'Password not found' });
                return;
            }
            const accessToken = AccessToken(user);
            const refreshToken = RefreshToken(user);
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            const { password, ...other } = user._doc;
            // res.redirect('/');
            res.status(200).json({ ...other, accessToken });
        } catch (e) {
            res.status(500).json({ message: e.message, next });
        }
    }

    // [POST] --/auth/refresh
    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;
            console.log(refreshToken);
            if (!refreshToken) {
                res.status(403).json({ message: 'you are not login' });
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
                if (err) {
                    return res
                        .status(403)
                        .json({ message: 'Invalid access token' });
                }
                console.log(user);
                const newAccessToken = AccessToken(user);
                const newRefreshToken = RefreshToken(user);
                res.cookie('refreshToken', newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                });

                res.status(200).json({ accessToken: newAccessToken }); //accessToken: newAccessToken
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    }

    // [POST] --/auth/logout
    async logout(req, res, next) {
        try {
            await res.clearCookie('refreshToken');
            res.status(200).json({ message: 'logout successful' });
        } catch (err) {
            res.json({ message: err.message, next });
        }
    }
    // [POST] /auth/register
    async register(req, res, next) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password.trim(), salt);
            req.body.password = hash;
            req.body.email = req.body.email.trim();
            req.body.username = req.body.username.trim();

            const user = new User(req.body);
            await user.save();

            const accessToken = AccessToken(user);
            const refreshToken = RefreshToken(user);

            const { password, ...other } = user._doc;
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: false,
                path: '/',
                sameSite: 'strict',
            });
            res.json({ ...other, accessToken });
        } catch (e) {
            res.status(401).json({ message: e.message, next });
        }
    }
}

module.exports = new AuthController();
