const { userLogin } = require('../controllers/user');

const userHandle = (req, res) => {
  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/user/login') {
    const postData = req.body;
    const userMsgData = userLogin(postData);

    return userMsgData;
  }
};

module.exports = userHandle;
