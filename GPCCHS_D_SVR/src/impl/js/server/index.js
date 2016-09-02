#!/usr/bin/env node

require('dotenv-safe').load();

const debug = require('./lib/io/debug')('startup');
const exit = require('exit');
const app = require('./lib/express');
const http = require('http');
const zmq = require('./lib/io/zmq');
const primus = require('./lib/io/primus');
const onDcData = require('./lib/controllers/onDcData');
const onTimeBarUpdate = require('./lib/controllers/onTimeBarUpdate');
const onViewOpen = require('./lib/controllers/onViewOpen');
const onViewClose = require('./lib/controllers/onViewClose');
const onViewUpdate = require('./lib/controllers/onViewUpdate');

const dcStub = require('./lib/stubs/dc');
const tbStub = require('./lib/stubs/tb');
const fs = require('fs');
const path = require('path');
const check = require('./lib/schemaManager/schemaManager');
const { set } = require('./lib/timeBar/index');

// port
function normalizePort(val) {
  const p = parseInt(val, 10);

  if (isNaN(p)) {
    // named pipe
    return val;
  }

  if (p >= 0) {
    // port number
    return p;
  }

  return false;
}

const port = normalizePort(process.env.PORT);
app.set('port', port);

// HTTP server
const server = http.createServer(app);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ?
    `Pipe ${port}` :
    `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      debug.error(`${bind} requires elevated privileges`);
      exit(1);
      break;
    case 'EADDRINUSE':
      debug.error(`${bind} is already in use`);
      exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  debug.info(`Server launched on ${bind}`);
});

// Primus
primus.init(server, onViewOpen, onViewClose, {
  viewUpdate: onViewUpdate,
});

// ZeroMQ
zmq.open({
  dcReq: {
    type: 'req',
    url: process.env.ZMQ_GPCCDC_REQ,
    handler: payload => payload, // TODO implement a onDcRequestResponse (with error)
  },
  dcData: {
    type: 'pull',
    url: process.env.ZMQ_GPCCDC_DATA,
    handler: onDcData,
  },
  vimatimebar: {
    type: 'pull',
    url: process.env.ZMQ_VIMA_TIMEBAR,
    handler: onTimeBarUpdate,
  },
}, err => {
  if (err) {
    throw err;
  }

  if (process.env.STUB_DC_ON === 'on') {
    dcStub(launchStubError => {
      if (launchStubError) {
        throw launchStubError;
      }
    });
  }
  if (process.env.STUB_TB_ON === 'on') {
    // Read TB file
    const tb = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'lib/schemaManager/examples/TB.example.json'), 'utf8')
    );
    if (check.validateTbJson(tb)) {
      debug.error('Invalid JSON file');
      const error = 'Invalid JSON file';
      throw error;
    }
    set(JSON.parse(JSON.stringify(tb)));
    tbStub(tb, launchStubError => {
      if (launchStubError) {
        throw launchStubError;
      }
    });
  }
  // once ZMQ sockets are open, launch express
  debug.info(`Trying to launch server in '${process.env.NODE_ENV}' env`);
  server.listen(port);
});
