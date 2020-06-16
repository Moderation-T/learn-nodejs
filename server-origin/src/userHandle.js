const userHandle = (req, res) => {
  // 删除一篇博客
  if (req.method === 'POST' && req.path === '/api/user/login') {
    return {
      msg: '登陆',
    };
  }
};

module.exports = userHandle;
