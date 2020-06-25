const { userLogin } = require('../controllers/user');
const { SuccessModel, FailModel } = require('../models/resModel');
const { set } = require('../database/redis');

const userHandle = (req, res) => {
  // 登陆设置

  if (req.method === 'POST' && req.path === '/api/user/login') {
    const postData = req.body;

    return userLogin(postData).then((user) => {
      console.log('userMSG', user);

      if (user.username) {
        // 设置 session
        req.session.username = user.username;
        req.session.password = user.password;

        // 同步到 redis
        set(req.sessionId, req.session);

        return new SuccessModel();
      } else {
        return new FailModel('登陆失败');
      }
    });
  }
};

module.exports = userHandle;
