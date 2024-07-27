const User = require('../module/user');
const { AccessToken, RefreshToken } = require('../../util/JWTToken');

class OtherController {
    // [POST] --/api/auth/login-Success
    async ggCallback(req, res, next) {
        try {
            console.log(req.body.id);
            if (req.body?.id) {
                const user = await User.findOne({ _id: req.body.id });
                if (!user) {
                    res.json({ message: 'User not found' });
                }
                const accessToken = `Bearer ${AccessToken(user)}`;
                const refreshToken = RefreshToken(user);
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: true,
                    path: '/',
                    sameSite: 'strict',
                });
                const { password, ...other } = user._doc;
                res.status(200).json({ ...other, accessToken });
            } else {
                res.status(400).json({ message: 'ID not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err });
        }
    }
}
module.exports = new OtherController();
