const User = require('../module/user');
const Notes = require('../module/notes');
class AdminController {
    // [GET -/admin/ListUsers]
    async ListUsers(req, res, next) {
        try {
            if (!req.admin) {
                return res
                    .status(403)
                    .json({ massage: 'you are not allowed to' });
            }
            const users = await User.find({ admin: false });
            const ArrayOther = users.map(({ password, ...other }) => other);
            return res.json({ data: ArrayOther });
        } catch (e) {
            res.status(400).json({ massage: e.massage });
        }
    }
    // [POST -/]
}
module.exports = new AdminController();
