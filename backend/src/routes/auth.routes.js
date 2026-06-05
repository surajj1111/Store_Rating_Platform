const express = require('express');
const { register, login, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/change-password', protect, changePassword);

module.exports = router;
