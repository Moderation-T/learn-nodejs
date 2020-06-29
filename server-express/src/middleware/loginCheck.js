const { FailModel } = require('../models/resModel');

module.exports = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new FailModel('未登录'));
};
