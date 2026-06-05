const express = require('express');
const { addUser, addStoreByAdmin, listUsers, listStores } = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.use(protect, allowRoles('admin'));
router.post('/users', addUser);
router.post('/stores', addStoreByAdmin);
router.get('/users', listUsers);
router.get('/stores', listStores);

module.exports = router;
