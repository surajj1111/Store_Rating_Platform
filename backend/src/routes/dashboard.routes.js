const express = require('express');
const { getAdminDashboard, getOwnerDashboard } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.get('/admin', protect, allowRoles('admin'), getAdminDashboard);
router.get('/owner', protect, allowRoles('owner'), getOwnerDashboard);

module.exports = router;
