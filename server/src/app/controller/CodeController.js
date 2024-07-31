const crypto = require('crypto');

const CodeService = require('../../service/CodeService');
const CodeModule = require('../../app/module/codeModule');

class CodeController {
    // [POST] --/code/getCode
    async getCode(req, res, next) {
        try {
            const { email } = req.body;
            const code = crypto.randomBytes(3).toString('hex');
            if (!email) {
                return res.status(400).json({
                    massage: 'mail not found',
                    error: e.message,
                });
            }
            const Response = await CodeService.sendEmailCode(email, code);
            const mail = Response.accepted[0];
            const status = Response.response;

            const newCode = new CodeModule({
                email: mail,
                code: code,
            });
            await newCode.save();
            res.status(200).json({ mail, code, status });
        } catch (e) {
            console.log(e);
            res.status(500).json({
                message: 'you are not code',
                error: e.message,
            });
        }
    }
    // [POST] --/code/checkCode
    async checkCode(req, res, next) {
        try {
            const { code, email } = req.body;
            const now = new Date();
            const Code = await CodeModule.findOne({ email, code });
            const timeNow =
                (now.getTime() - Code.createdAt.getTime()) / 1000 / 60;
            if (!Code) {
                return res.status(403).json({ message: 'code not found!' });
            } else {
                if (timeNow > 2) {
                    return res.status(401).json({ message: 'code expired!' });
                }
                return res.status(200).json({ message: 'code exists!' });
            }
        } catch (e) {
            res.status(500).json({
                massage: 'you are not code',
                error: e.massage,
            });
        }
    }
}

module.exports = new CodeController();
