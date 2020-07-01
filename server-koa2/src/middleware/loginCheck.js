const { FailModel } = require('../models/resModel');
const { createContext } = require('../../app');

const loginCheck = async (ctx, next) => {
  if (ctx.session.username) {
    await next();
    return;
  }
  ctx.body = new FailModel('未登录');
};

module.exports = loginCheck;
