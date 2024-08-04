const express = require('express');
const router = express.Router();

const { CheckAdmin } = require('../app/middleware/CheckAdmin');
const AdminController = require('../app/controller/AdminController');

// [GET -/admin]
// middleware check admin
router.get('/ListUsers', CheckAdmin, AdminController.ListUsers);

// [POST -/admin]

module.exports = router;
