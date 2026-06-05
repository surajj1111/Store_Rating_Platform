const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: './.env' });

const connectionConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345',
};

const seed = async () => {
  const connection = await mysql.createConnection(connectionConfig);
  await connection.query('CREATE DATABASE IF NOT EXISTS store_rating_platform');
  await connection.query('USE store_rating_platform');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(60) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      address VARCHAR(400) DEFAULT '',
      role ENUM('admin','user','owner') NOT NULL DEFAULT 'user',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS stores (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      address VARCHAR(400) NOT NULL,
      owner_id INT UNSIGNED NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS ratings (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      user_id INT UNSIGNED NOT NULL,
      store_id INT UNSIGNED NOT NULL,
      rating TINYINT UNSIGNED NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
      UNIQUE KEY unique_user_store (user_id, store_id)
    )
  `);

  await connection.query('DELETE FROM ratings');
  await connection.query('DELETE FROM stores');
  await connection.query('DELETE FROM users');

  const password = await bcrypt.hash('Password!1', 12);
  const users = [
    ['Admin System User', 'admin@example.com', password, '123 Admin Avenue', 'admin'],
    ['Normal Rating User One', 'user1@example.com', password, '400 Elm Street', 'user'],
    ['Normal Rating User Two', 'user2@example.com', password, '501 Maple Avenue', 'user'],
    ['Store Owner One Example', 'owner1@example.com', password, '210 Baker Street', 'owner'],
    ['Store Owner Two Example', 'owner2@example.com', password, '320 Cedar Road', 'owner'],
  ];

  for (const [name, email, pass, address, role] of users) {
    await connection.query('INSERT INTO users (name, email, password, address, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW())', [name, email, pass, address, role]);
  }

  const [ownerRows] = await connection.query('SELECT id, email FROM users WHERE role = ?', ['owner']);
  const stores = [
    ['Fresh Market', 'freshmarket@example.com', '25 Garden Lane', ownerRows[0].id],
    ['Urban Bites', 'urbanbites@example.com', '87 City Center', ownerRows[1].id],
  ];
  for (const [name, email, address, owner_id] of stores) {
    await connection.query('INSERT INTO stores (name, email, address, owner_id, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())', [name, email, address, owner_id]);
  }

  const [storeRows] = await connection.query('SELECT id FROM stores');
  const [usersList] = await connection.query('SELECT id FROM users WHERE role = ?', ['user']);
  const ratings = [
    [usersList[0].id, storeRows[0].id, 5],
    [usersList[1].id, storeRows[0].id, 4],
    [usersList[0].id, storeRows[1].id, 3],
  ];
  for (const [user_id, store_id, rating] of ratings) {
    await connection.query('INSERT INTO ratings (user_id, store_id, rating, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())', [user_id, store_id, rating]);
  }

  console.log('Seed completed successfully.');
  await connection.end();
};

seed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
