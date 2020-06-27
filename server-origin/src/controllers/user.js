const { exec, escape } = require('../database/mysql');

const userLogin = (userMsg) => {
  const username = escape(userMsg.username);
  const password = escape(userMsg.password);
  const sql = `select username,password from users where username='${username}' and password='${Number(password)}'`;
  return exec(sql)
    .then((userData) => {
      return userData[0];
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  userLogin,
};
