const http = require('http');
const { RoutersManager } = require('./src/core');
const personRouter = require('./src/router/personRouter');
require('dotenv').config();

const PORT = process.env.PORT || 4305;

const routersManager = new RoutersManager([
    personRouter
]);

const server =  http.createServer((req, resp) => routersManager.manage(req, resp));
server.on('listening', () => console.log(`Server listening port: ${PORT}`));
server.listen(PORT);
