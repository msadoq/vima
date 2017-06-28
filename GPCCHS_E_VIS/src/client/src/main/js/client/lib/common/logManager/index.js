let lib;

if (process.env.APP_ENV === 'renderer') {
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Build time dependency loading"
  lib = require('./renderer');
} else {
  // eslint-disable-next-line global-require, "DV6 TBC_CNES Build time dependency loading"
  lib = require('./node');
}

module.exports = lib.getLogger;

Object.assign(module.exports, {
  getLogger: lib.getLogger,
});