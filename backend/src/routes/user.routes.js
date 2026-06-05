const express = require('express');
const { listUsers, userDetails } = require('../controllers/user.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.get('/', protect, allowRoles('admin'), listUsers);
router.get('/:id', protect, allowRoles('admin'), userDetails);

module.exports = router;
