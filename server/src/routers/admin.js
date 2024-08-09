const express = require('express');
const router = express.Router();
const fileUpload = require('express-fileupload');

const AdminController = require('../app/controller/AdminController');
const { CheckAdmin } = require('../app/middleware/CheckAdmin');
const { uploadOp } = require('../app/middleware/ImportFileOnCloud');

// [GET -/admin]
// middleware check admin
router.get('/ListUsers', CheckAdmin, AdminController.ListUsers);
router.get('/export/excel', CheckAdmin, AdminController.ExportExcel);
router.get('/export/excel-from', CheckAdmin, AdminController.ExportExcelFrom);

// [POST -/admin]
router.post(
    '/import/excel',
    CheckAdmin,
    fileUpload(uploadOp),
    AdminController.ImportExcel,
);

module.exports = router;
