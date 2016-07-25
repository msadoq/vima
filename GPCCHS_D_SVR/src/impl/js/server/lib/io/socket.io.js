const debug = require('../io/debug')('io:socket.io');
const sio = require('socket.io');
let io = null;

const bindWebSockets = (server, cb) => {
  io = sio(server);
  io.sockets.on('connection', (webSocket) => {
    debug.info('Cache WebSocket connected');
    webSocket.emit('message', 'Cache WebSocket connected');
  });

  cb();
};

module.exports = { bindWebSockets, cacheWebSocket: () => io };
