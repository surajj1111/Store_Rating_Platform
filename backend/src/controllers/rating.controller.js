const asyncHandler = require('express-async-handler');
const { createRating, getRatingById, getRatingByUserAndStore, updateRating, getRatingsByUser, getRatingsForOwner } = require('../models/rating.model');
const { getStoreById } = require('../models/store.model');

const submitRating = asyncHandler(async (req, res) => {
  const ratingValue = Number(req.body.rating);
  if (!Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    const error = new Error('Rating must be an integer between 1 and 5');
    error.status = 400;
    throw error;
  }

  const existingRating = await getRatingByUserAndStore(req.user.id, req.body.store_id);
  if (existingRating) {
    const error = new Error('You have already rated this store');
    error.status = 409;
    throw error;
  }
  const store = await getStoreById(req.body.store_id);
  if (!store) {
    const error = new Error('Store not found');
    error.status = 404;
    throw error;
  }

  const rating = await createRating({ user_id: req.user.id, store_id: req.body.store_id, rating: ratingValue });
  res.status(201).json({ success: true, data: rating });
});

const editRating = asyncHandler(async (req, res) => {
  const ratingId = req.params.id;
  const ratingValue = Number(req.body.rating);

  if (!Number.isInteger(ratingValue) || ratingValue < 1 || ratingValue > 5) {
    const error = new Error('Rating must be an integer between 1 and 5');
    error.status = 400;
    throw error;
  }

  console.log('[editRating] ratingId=', ratingId, 'ratingValue=', ratingValue, 'user=', req.user && req.user.id);
  const ratingRecord = await getRatingById(ratingId);
  console.log('[editRating] ratingRecord=', ratingRecord);
  if (!ratingRecord || Number(ratingRecord.user_id) !== Number(req.user.id)) {
    const error = new Error('Cannot update rating');
    error.status = 403;
    throw error;
  }
  const rating = await updateRating(ratingId, ratingValue);
  res.json({ success: true, data: rating });
});

const myRatings = asyncHandler(async (req, res) => {
  const ratings = await getRatingsByUser(req.user.id);
  res.json({ success: true, data: ratings });
});

const ownerRatingHistory = asyncHandler(async (req, res) => {
  const { sort = 'created_at', page = 1, limit = 10 } = req.query;
  const response = await getRatingsForOwner(req.user.id, { sort, page: Number(page), limit: Number(limit) });
  res.json({ success: true, ...response, page: Number(page), limit: Number(limit) });
});

module.exports = { submitRating, editRating, myRatings, ownerRatingHistory };
