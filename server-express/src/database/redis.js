const redis = require('redis');
const { REDIS_CONF } = require('../conf/database');

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on('error', (err) => {
  console.log('redis 连接错误', err);
});

module.exports = redisClient;
