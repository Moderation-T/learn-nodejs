const { userLogin } = require('../controllers/user');
const { SuccessModel, FailModel } = require('../models/resModel');
const userHandle = (req, res) => {
  // 登陆设置

  if (req.method === 'POST' && req.path === '/api/user/login') {
    const postData = req.body;

    return userLogin(postData).then((user) => {
      console.log('userMSG', user);

      if (user.username) {
        return new SuccessModel();
      } else {
        return new FailModel('登陆失败');
      }
    });
  }
};

module.exports = userHandle;
