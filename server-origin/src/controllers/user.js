const { exec } = require('../database/mysql');

const userLogin = (userMsg) => {
  const sql = `select username,password from users where username='${userMsg.username}' and password='${Number(
    userMsg.password
  )}'`;
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
