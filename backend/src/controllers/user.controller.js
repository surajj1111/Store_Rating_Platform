const asyncHandler = require('express-async-handler');
const { getUsers, getUserById } = require('../models/user.model');

const listUsers = asyncHandler(async (req, res) => {
  const { search = '', role = '', sort = 'created_at', page = 1, limit = 10 } = req.query;
  const { rows, total } = await getUsers({ search, role, sort, page: Number(page), limit: Number(limit) });
  res.json({ success: true, data: rows, total, page: Number(page), limit: Number(limit) });
});

const userDetails = asyncHandler(async (req, res) => {
  const user = await getUserById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, data: user });
});

module.exports = { listUsers, userDetails };
