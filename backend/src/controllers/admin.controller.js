const asyncHandler = require('express-async-handler');
const { createUser, getUsers } = require('../models/user.model');
const { createStore, getStores } = require('../models/store.model');

const addUser = asyncHandler(async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({ success: true, data: user });
});

const addStoreByAdmin = asyncHandler(async (req, res) => {
  const store = await createStore(req.body);
  res.status(201).json({ success: true, data: store });
});

const listUsers = asyncHandler(async (req, res) => {
  const { search = '', role = '', sort = 'created_at', page = 1, limit = 10 } = req.query;
  const { rows, total } = await getUsers({ search, role, sort, page: Number(page), limit: Number(limit) });
  res.json({ success: true, data: rows, total, page: Number(page), limit: Number(limit) });
});

const listStores = asyncHandler(async (req, res) => {
  const { search = '', address = '', sort = 'created_at', page = 1, limit = 10 } = req.query;
  const { rows, total } = await getStores({ search, address, sort, page: Number(page), limit: Number(limit) });
  res.json({ success: true, data: rows, total, page: Number(page), limit: Number(limit) });
});

module.exports = { addUser, addStoreByAdmin, listUsers, listStores };
