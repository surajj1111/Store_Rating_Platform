const asyncHandler = require('express-async-handler');
const { getDb } = require('../config/db');

const getAdminDashboard = asyncHandler(async (req, res) => {
  const db = getDb();
  const [[usersTotal]] = await db.query('SELECT COUNT(*) AS count FROM users');
  const [[storesTotal]] = await db.query('SELECT COUNT(*) AS count FROM stores');
  const [[ratingsTotal]] = await db.query('SELECT COUNT(*) AS count FROM ratings');

  res.json({
    success: true,
    totals: {
      users: usersTotal.count,
      stores: storesTotal.count,
      ratings: ratingsTotal.count,
    },
  });
});

const getOwnerDashboard = asyncHandler(async (req, res) => {
  const db = getDb();
  const [rows] = await db.query(
    `SELECT IFNULL(ROUND(AVG(r.rating), 2), 0) AS average_rating, COUNT(r.id) AS rating_count
      FROM ratings r
      JOIN stores s ON s.id = r.store_id
      WHERE s.owner_id = ?`,
    [req.user.id]
  );
  res.json({ success: true, data: rows[0] });
});

module.exports = { getAdminDashboard, getOwnerDashboard };
