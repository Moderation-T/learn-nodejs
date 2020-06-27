const fs = require('fs');
const path = require('path');

// 写日志的方法
function writeLog(writeStream, log) {
  writeStream.write(log + '\n'); // 这是关键方法
}

// 创建写入文件流的方法
function createWriteStream(filename) {
  const fullFileName = path.resolve(__dirname, '../', '../', 'logs');
  const writeStream = fs.createWriteStream(fullFileName, { flags: 'a' });

  return writeStream;
}

// 写访问日志 
const accessWriteStream = createWriteStream('access.log');
function access(log) {
  writeLog( , log);
}

// 写事件日志 
const accessWriteStream = createWriteStream('event.log');
function event(log) {
  writeLog( , log);
}

// 写错误日志 
const accessWriteStream = createWriteStream('error.log');
function error(log) {
  writeLog( , log);
}

module.exports = {
  access,
  event,
  error
};
