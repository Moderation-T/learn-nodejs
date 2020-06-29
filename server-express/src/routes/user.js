var express = require('express');
var router = express.Router();
const { userLogin } = require('../controllers/user');
const { SuccessModel, FailModel } = require('../models/resModel');

router.post('/login', (req, res, next) => {
  const postData = req.body;
  return userLogin(postData).then((user) => {
    if (user.username) {
      // 设置 session
      req.session.username = user.username;
      req.session.password = user.password;

      res.json(new SuccessModel({ username: user.username }));
    } else {
      res.json(new FailModel('登陆失败'));
    }
  });
});

module.exports = router;
