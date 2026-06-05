const { getDb } = require('../config/db');

const createStore = async (store) => {
  const [result] = await getDb().query(
    'INSERT INTO stores (name, email, address, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())',
    [store.name, store.email, store.address, store.owner_id]
  );
  const [rows] = await getDb().query('SELECT * FROM stores WHERE id = ?', [result.insertId]);
  return rows[0];
};

const getStoreById = async (id) => {
  const [rows] = await getDb().query('SELECT * FROM stores WHERE id = ?', [id]);
  return rows[0];
};

const getStoreRatings = async (storeId) => {
  const [rows] = await getDb().query(
    'SELECT AVG(rating) AS average_rating, COUNT(*) AS rating_count FROM ratings WHERE store_id = ?',
    [storeId]
  );
  return rows[0];
};

const getStores = async ({ search, address, sort, page, limit }) => {
  const offset = (page - 1) * limit;
  const filters = [];
  let condition = 'WHERE 1=1';

  if (search) {
    condition += ' AND name LIKE ?';
    filters.push(`%${search}%`);
  }
  if (address) {
    condition += ' AND address LIKE ?';
    filters.push(`%${address}%`);
  }
  const orderBy = ['name', 'email', 'created_at'].includes(sort) ? sort : 'created_at';

  const [rows] = await getDb().query(
    `SELECT s.id, s.name, s.email, s.address, s.owner_id, s.created_at, s.updated_at,
      IFNULL(ROUND(AVG(r.rating), 2), 0) AS average_rating,
      COUNT(r.id) AS rating_count
      FROM stores s
      LEFT JOIN ratings r ON s.id = r.store_id
      ${condition}
      GROUP BY s.id
      ORDER BY ${orderBy} DESC
      LIMIT ? OFFSET ?`,
    [...filters, limit, offset]
  );

  const [[{ total }]] = await getDb().query(`SELECT COUNT(*) AS total FROM stores ${condition}`, filters);
  return { rows, total };
};

const getStoresByOwner = async (ownerId) => {
  const [rows] = await getDb().query('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
  return rows;
};

module.exports = {
  createStore,
  getStoreById,
  getStoreRatings,
  getStores,
  getStoresByOwner,
};
