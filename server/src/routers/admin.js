const express = require('express');
const router = express.Router();

const { CheckAdmin } = require('../app/middleware/CheckAdmin');
const AdminController = require('../app/controller/AdminController');

// [GET -/admin]
// middleware check admin
router.get('/ListUsers', CheckAdmin, AdminController.ListUsers);
router.get('/export/excel', CheckAdmin, AdminController.ExportExcel);
router.get('/export/excel-from', CheckAdmin, AdminController.ExportExcelFrom);

// [POST -/admin]
router.post('/import/excel', CheckAdmin, AdminController.ImportExcel);

module.exports = router;
