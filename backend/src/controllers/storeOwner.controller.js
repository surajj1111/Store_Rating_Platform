const asyncHandler = require('express-async-handler');
const { getRatingsForOwnerUsers } = require('../models/rating.model');

const ownerRatings = asyncHandler(async (req, res) => {
  const ownerId = req.user.id;
  const rows = await getRatingsForOwnerUsers(ownerId);
  res.json({ success: true, data: rows });
});

module.exports = { ownerRatings };
