const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

module.exports.io = socketIO(server);
require('./sockets/socket');
// IO = esta es la comunicacion del backend
server.listen(port, (err) => {
  if (err) throw new Error(err);

  console.log(`Servidor corriendo en puerto ${port}`);
});
