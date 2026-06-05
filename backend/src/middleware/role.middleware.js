const allowRoles = (...roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      const error = new Error('Forbidden: insufficient permissions');
      error.status = 403;
      throw error;
    }
    next();
  };
};

module.exports = { allowRoles };
