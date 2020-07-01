const { FailModel } = require('../models/resModel');

const loginCheck = (req, res, next) => {
  if (req.session.username) {
    next();
    return;
  }
  res.json(new FailModel('未登录'));
};

module.exports = loginCheck;
