
require('dotenv').config();

const Server = require('./models/server');
// import Server from './models/server';


const server = new Server();

server.listen();
