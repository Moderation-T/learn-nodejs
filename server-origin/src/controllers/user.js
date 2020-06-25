const { exec } = require('../database/mysql');

const userLogin = (userMsg) => {
  console.log('mysql check user msg');

  const sql = `select username,password from users where username='${userMsg.username}' and password='${userMsg.password}'`;
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
