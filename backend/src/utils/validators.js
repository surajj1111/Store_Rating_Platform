const Joi = require('joi');

const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};:'"\\|,.<>/?]).{8,16}$/;

const registerSchema = Joi.object({
  name: Joi.string().trim().min(20).max(60).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().pattern(passwordPattern).required(),
  address: Joi.string().trim().max(400).allow('', null),
  role: Joi.string().valid('admin', 'user', 'owner').default('user'),
});

const loginSchema = Joi.object({
  email: Joi.string().trim().email().required(),
  password: Joi.string().required(),
});

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  newPassword: Joi.string().pattern(passwordPattern).required(),
});

const storeSchema = Joi.object({
  name: Joi.string().trim().min(3).max(100).required(),
  email: Joi.string().trim().email().required(),
  address: Joi.string().trim().max(400).required(),
  owner_id: Joi.number().integer().positive().required(),
});

const ratingSchema = Joi.object({
  store_id: Joi.number().integer().positive().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  changePasswordSchema,
  storeSchema,
  ratingSchema,
};
