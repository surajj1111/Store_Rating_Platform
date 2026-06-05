const asyncHandler = require('express-async-handler');
const { createStore, getStores, getStoreById, getStoreRatings, getStoresByOwner } = require('../models/store.model');

const addStore = asyncHandler(async (req, res) => {
  const store = await createStore(req.body);
  res.status(201).json({ success: true, data: store });
});

const listStores = asyncHandler(async (req, res) => {
  const { search = '', address = '', sort = 'created_at', page = 1, limit = 10 } = req.query;
  const { rows, total } = await getStores({ search, address, sort, page: Number(page), limit: Number(limit) });
  res.json({ success: true, data: rows, total, page: Number(page), limit: Number(limit) });
});

const storeDetails = asyncHandler(async (req, res) => {
  const store = await getStoreById(req.params.id);
  if (!store) {
    res.status(404);
    throw new Error('Store not found');
  }
  const average = await getStoreRatings(store.id);
  res.json({ success: true, data: { ...store, average_rating: average.average_rating } });
});

const ownerStores = asyncHandler(async (req, res) => {
  const stores = await getStoresByOwner(req.user.id);
  res.json({ success: true, data: stores });
});

module.exports = { addStore, listStores, storeDetails, ownerStores };
