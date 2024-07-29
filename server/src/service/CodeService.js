const nodemailer = require('nodemailer');
require('dotenv').config();

class CodeService {
    // send code
    async sendEmailCode(email, code) {
        try {
            console.log(code);
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.PASS_EMAIL,
                },
            });

            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"Mã Xác Thực NotesApp" <NotesApp@gmail.com>', // sender address
                to: email, // list of receivers
                subject: 'Send code authentication', // Subject line
                text: 'authentication code ', // plain text body
                html: `<div> 
                            <div><h1>authentication code</h1></div>
                            <div><h3>${code}</h3></div>
                        </div>`, // html body
            });

            return info;
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }
}
module.exports = new CodeService();
