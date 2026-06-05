const express = require('express');
const { ownerRatings } = require('../controllers/storeOwner.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.get('/ratings', protect, allowRoles('owner'), ownerRatings);

module.exports = router;
