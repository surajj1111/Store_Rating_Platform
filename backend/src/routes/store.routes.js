const express = require('express');
const { listStores, storeDetails, addStore, ownerStores } = require('../controllers/store.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.get('/', protect, listStores);
router.get('/:id', protect, storeDetails);
router.get('/owner/me', protect, allowRoles('owner'), ownerStores);
router.post('/', protect, allowRoles('admin'), addStore);

module.exports = router;
