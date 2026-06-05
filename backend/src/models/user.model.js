const { getDb } = require('../config/db');

const getUserById = async (id) => {
  const [rows] = await getDb().query('SELECT id, name, email, address, role, created_at, updated_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

const getUserByEmail = async (email) => {
  const [rows] = await getDb().query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

const createUser = async (user) => {
  const [result] = await getDb().query(
    'INSERT INTO users (name, email, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
    [user.name, user.email, user.password, user.address || '', user.role || 'user']
  );
  return getUserById(result.insertId);
};

const getUsers = async ({ search, role, sort, page, limit }) => {
  const offset = (page - 1) * limit;
  const filters = [];
  let condition = 'WHERE 1=1';

  if (search) {
    condition += ' AND (name LIKE ? OR email LIKE ? OR address LIKE ?)';
    filters.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }
  if (role) {
    condition += ' AND role = ?';
    filters.push(role);
  }

  const orderBy = ['name', 'email', 'role', 'created_at'].includes(sort) ? sort : 'created_at';
  const [rows] = await getDb().query(
    `SELECT id, name, email, address, role, created_at, updated_at FROM users ${condition} ORDER BY ${orderBy} DESC LIMIT ? OFFSET ?`,
    [...filters, limit, offset]
  );

  const [[{ total }]] = await getDb().query(`SELECT COUNT(*) AS total FROM users ${condition}`, filters);
  return { rows, total };
};

const updateUserPassword = async (id, hashedPassword) => {
  await getDb().query('UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?', [hashedPassword, id]);
  return getUserById(id);
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
  getUsers,
  updateUserPassword,
};
