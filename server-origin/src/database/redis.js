const redis = require('redis');
const { REDIS_CONF } = require('../conf/database');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', (err) => {
  console.log('redis 连接错误', err);
});

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }

  redisClient.set(key, val);
}

function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
      }

      if (val === null) {
        resolve(null);
      } 

      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  set,
  get,
};
