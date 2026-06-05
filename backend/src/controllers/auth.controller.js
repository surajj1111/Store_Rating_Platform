const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser, updateUserPassword, getUserById } = require('../models/user.model');
const { registerSchema, loginSchema, changePasswordSchema } = require('../utils/validators');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const register = asyncHandler(async (req, res) => {
  const value = await registerSchema.validateAsync(req.body, { abortEarly: false });

  const existing = await getUserByEmail(value.email);
  if (existing) {
    res.status(409);
    throw new Error('Email already registered');
  }

  const hashedPassword = await bcrypt.hash(value.password, 12);
  const createdUser = await createUser({
    ...value,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    user: {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      address: createdUser.address,
    },
    token: generateToken(createdUser),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = await loginSchema.validateAsync(req.body, { abortEarly: false });
  const user = await getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error('Invalid email or password');
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      address: user.address,
    },
    token: generateToken(user),
  });
});

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = await changePasswordSchema.validateAsync(req.body, { abortEarly: false });
  const user = await getUserById(req.user.id);
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    res.status(401);
    throw new Error('Old password does not match');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  const updatedUser = await updateUserPassword(req.user.id, hashedPassword);
  res.json({ success: true, message: 'Password updated successfully', user: updatedUser });
});

module.exports = { register, login, changePassword };
