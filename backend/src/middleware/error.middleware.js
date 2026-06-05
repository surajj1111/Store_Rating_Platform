function errorHandler(err, req, res, next) {
  const status = res.statusCode >= 400 ? res.statusCode : err.status || 500;
  const message = err.message || 'Internal server error';
  console.error(err);
  res.status(status).json({ success: false, message });
}

module.exports = { errorHandler };
