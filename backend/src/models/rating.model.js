const { getDb } = require('../config/db');

const createRating = async ({ user_id, store_id, rating }) => {
  const [result] = await getDb().query(
    'INSERT INTO ratings (user_id, store_id, rating, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
    [user_id, store_id, rating]
  );
  const [rows] = await getDb().query('SELECT * FROM ratings WHERE id = ?', [result.insertId]);
  return rows[0];
};

const getRatingById = async (id) => {
  const [rows] = await getDb().query('SELECT * FROM ratings WHERE id = ?', [id]);
  return rows[0];
};

const getRatingByUserAndStore = async (user_id, store_id) => {
  const [rows] = await getDb().query('SELECT * FROM ratings WHERE user_id = ? AND store_id = ?', [user_id, store_id]);
  return rows[0];
};

const updateRating = async (id, rating) => {
  await getDb().query('UPDATE ratings SET rating = ?, updated_at = NOW() WHERE id = ?', [rating, id]);
  const [rows] = await getDb().query('SELECT * FROM ratings WHERE id = ?', [id]);
  return rows[0];
};

const getRatingsByUser = async (user_id) => {
  const [rows] = await getDb().query(
    `SELECT r.id, r.rating, r.store_id, s.name AS store_name, s.address, r.created_at, r.updated_at
      FROM ratings r
      JOIN stores s ON s.id = r.store_id
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC`,
    [user_id]
  );
  return rows;
};

const getRatingsForOwner = async (ownerId, { sort, page, limit }) => {
  const offset = (page - 1) * limit;
  const filters = [ownerId];
  const orderBy = ['rating', 'created_at', 'user_name'].includes(sort) ? sort : 'created_at';
  const [rows] = await getDb().query(
    `SELECT r.id, r.rating, r.created_at, u.name AS user_name, u.email AS user_email, s.name AS store_name
      FROM ratings r
      JOIN users u ON u.id = r.user_id
      JOIN stores s ON s.id = r.store_id
      WHERE s.owner_id = ?
      ORDER BY ${orderBy} DESC
      LIMIT ? OFFSET ?`,
    [...filters, limit, offset]
  );
  const [[{ total }]] = await getDb().query(
    `SELECT COUNT(*) AS total
      FROM ratings r
      JOIN stores s ON s.id = r.store_id
      WHERE s.owner_id = ?`,
    [ownerId]
  );
  return { rows, total };
};

const getRatingsForOwnerUsers = async (ownerId) => {
  const [rows] = await getDb().query(
    `SELECT r.user_id AS userId, u.name AS userName, u.email AS userEmail,
      r.store_id AS storeId, s.name AS storeName,
      r.rating AS rating, r.created_at AS createdAt
      FROM ratings r
      JOIN users u ON u.id = r.user_id
      JOIN stores s ON s.id = r.store_id
      WHERE s.owner_id = ?
      ORDER BY r.created_at DESC`,
    [ownerId]
  );
  return rows;
};

module.exports = {
  createRating,
  getRatingById,
  getRatingByUserAndStore,
  updateRating,
  getRatingsByUser,
  getRatingsForOwner,
  getRatingsForOwnerUsers,
};
