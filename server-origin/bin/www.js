const http = require('http');
const serverHandle = require('../app');
const server = http.createServer(serverHandle);
const PORT = 3000;

server.listen(PORT);
console.log('server run at 3000');
