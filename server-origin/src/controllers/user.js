const { exec, escape } = require('../database/mysql');
const { genPassword } = require('../utils/cryp');

const userLogin = (userMsg) => {
  const username = escape(userMsg.username);
  const password = genPassword(userMsg.password);
  const sql = `select username,password from users where username=${username} and password='${password}'`;
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
