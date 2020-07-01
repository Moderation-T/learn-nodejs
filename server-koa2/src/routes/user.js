const router = require('koa-router')();
const { userLogin } = require('../controllers/user');
const { SuccessModel, FailModel } = require('../models/resModel');

router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
  const postData = ctx.request.body;
  const user = await userLogin(postData);

  if (user.username) {
    console.log('has username is ', user.username);

    // 设置 session
    // ctx.session.username = user.username;
    // ctx.session.password = user.password;

    ctx.body = new SuccessModel({ username: user.username });
  } else {
    ctx.body = new FailModel('登陆失败');
  }
});

module.exports = router;
