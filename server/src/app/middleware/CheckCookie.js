const CheckCookie = async (req, res, next) => {
    try {
        if (res.cookie.refreshToken) {
            res.isCookie = true;
        } else {
            res.isCookie = false;
        }
        next();
    } catch (err) {
        res.json({ message: err.message, next });
    }
};

module.exports = { CheckCookie };
