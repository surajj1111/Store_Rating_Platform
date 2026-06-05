const express = require('express');
const { submitRating, editRating, myRatings, ownerRatingHistory } = require('../controllers/rating.controller');
const { protect } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/role.middleware');

const router = express.Router();
router.get('/me', protect, allowRoles('user'), myRatings);
router.post('/', protect, allowRoles('user'), submitRating);
router.put('/:id', protect, allowRoles('user'), editRating);
router.get('/owner/history', protect, allowRoles('owner'), ownerRatingHistory);

module.exports = router;
