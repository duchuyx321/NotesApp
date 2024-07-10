const jwt = require('jsonwebtoken');

const Notes = require('../module/notes');
const { multiplyMongooseToObject } = require('../../util/mongoose');
require('dotenv').config();

class HomeController {
    // [GET] --/
    async home(req, res, next) {
        let image = '';
        try {
            if (!req.cookies.accessToken || !req.cookies) {
                image =
                    'https://res.cloudinary.com/dglgdtov0/image/upload/v1720106908/Screenshot_2024-07-04_222755_pa6ouo.png';
                return res.json({
                    message: 'you are logged in without',
                    image,
                });
            }
            const token = req.cookies.accessToken;
            const accessToken = jwt.verify(token, process.env.ACCESS_TOKEN);
            const { id, admin } = accessToken;
            const note = await Notes.find({ userId: id });
            if (!note || !note.length) {
                image =
                    'https://res.cloudinary.com/dglgdtov0/image/upload/v1720213018/Screenshot_2024-07-06_035631_otsfoz.png';
                return res.json({ message: 'not notes', image, id });
            } else {
                image =
                    'https://res.cloudinary.com/dglgdtov0/image/upload/v1720213076/Screenshot_2024-07-06_035741_ldxahf.png';
                const notes = multiplyMongooseToObject(note);
                // return res.json({note, image,id});
                return res.json({ notes, image, id });
            }
        } catch (err) {
            res.json({ message: err.message, next });
        }
    }
}

module.exports = new HomeController();
