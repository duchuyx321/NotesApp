const XLSX = require('xlsx');
const fs = require('fs');

const User = require('../module/user');
const Notes = require('../module/notes');
const { setData, getData } = require('../module/Redis');

require('dotenv').config();

class AdminController {
    // [GET -/admin/ListUsers]
    async ListUsers(req, res, next) {
        try {
            if (!req.admin) {
                return res
                    .status(403)
                    .json({ massage: 'you are not allowed to' });
            }
            const result = await getData('User');
            if (result) {
                const UserData = JSON.parse(result);
                return res.status(200).json(UserData);
            }
            const users = await User.find({ admin: false });
            const ArrayOther = users.map(({ password, ...other }) => other);
            setData('User', users);
            return res.status(200).json(ArrayOther);
        } catch (e) {
            res.status(400).json({ massage: e });
        }
    }

    // [GET -/admin/export/excel]
    async ExportExcel(req, res, next) {
        try {
            if (!req.admin) {
                return res
                    .status(403)
                    .json({ massage: 'you are not allowed to' });
            }
            const result = await getData('User');
            if (result) {
                const UserData = JSON.parse(result);
                const heading = [
                    ['id', 'username', 'email', 'createdAt', 'provider'],
                ];
                const workbook = XLSX.utils.book_new();
                const worksheet = XLSX.utils.json_to_sheet(UserData);
                XLSX.utils.sheet_add_aoa(worksheet, heading);
                XLSX.utils.book_append_sheet(
                    workbook,
                    worksheet,
                    'DataUserNoteApp',
                );

                // lưu file
                const buff = XLSX.write(workbook, {
                    bookType: 'xlsx',
                    type: 'buffer',
                });
                res.setHeader(
                    'Content-Disposition',
                    'attachment; filename=user.xlsx',
                );
                res.setHeader(
                    'Content-Type',
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                );

                return res.status(200).send(buff);
            }
        } catch (e) {
            res.status(400).json({ massage: e });
        }
    }
    // [GET - /admin/export/excel-from]
    async ExportExcelFrom(req, res, next) {
        try {
            if (!req.admin) {
                return res
                    .status(403)
                    .json({ massage: 'you are not allowed to' });
            }
            const heading = [['username', 'email', 'password']];
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.aoa_to_sheet(heading);
            XLSX.utils.book_append_sheet(
                workbook,
                worksheet,
                'DataUserNoteApp',
            );

            // lưu file
            const buff = XLSX.write(workbook, {
                bookType: 'xlsx',
                type: 'buffer',
            });
            res.setHeader(
                'Content-Disposition',
                'attachment; filename=user.xlsx',
            );
            res.setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            );

            return res.status(200).send(buff);
        } catch (e) {
            res.status(404).json({ massage: e });
        }
    }

    // [POST -/admin/import/excel]
    async ImportExcel(req, res, next) {
        try {
            if (!req.admin) {
                return res
                    .status(401)
                    .json({ massage: 'You are not allowed to' });
            }
            if (!req.files) {
                return res
                    .status(403)
                    .json({ massage: 'import file not allowed to' });
            }
            const { fileImport } = req.files;
            if (
                fileImport.mimetype !==
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            ) {
                return res.status(401).json({ massage: 'file is not a valid' });
                fs.unlinkSync(fileImport.tempFilePath);
            }
            const workbook = XLSX.readFile(fileImport.tempFilePath);
            const sheetName = workbook.SheetNames[0];
            const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            console.log(data);
            let results = [];
            for (let i = 0; i < data.length; i++) {
                const row = data[i];
                const username = row.username;
                const email = row.email;
                const password = row.password;
                if (!username || !email || !password) {
                    results.push({
                        username,
                        email,
                        status: 'Dữ liệu không đầy đủ',
                    });
                    continue; // Bỏ qua hàng này nếu dữ liệu không đầy đủ
                }
                const existingUser = await User.findOne({ username, email });
                if (existingUser) {
                    results.push({
                        username,
                        email,
                        status: 'tài khoản đã tồn tại đã tồn tại ',
                    });
                } else {
                    try {
                        const newUser = new User({
                            username,
                            email,
                            password,
                        });
                        await newUser.save();
                        results.push({
                            username,
                            email,
                            status: 'lưu thành công',
                        });
                    } catch (e) {
                        results.push({
                            username,
                            email,
                            status: 'Lưu thất bại',
                        });
                    }
                }
            }
            fs.unlinkSync(fileImport.tempFilePath);
            return res.status(200).json(results);
        } catch (err) {
            res.status(400).json({ message: err });
        }
    }
}
module.exports = new AdminController();
