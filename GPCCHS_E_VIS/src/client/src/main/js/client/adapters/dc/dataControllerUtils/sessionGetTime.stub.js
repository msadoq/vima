// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
const Adapter = require('./sessionGetTime');

const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/SessionGetTime.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.SessionGetTime');


const getSessionGetTime = override => applyOverride({
  id: 42,
}, override);

const getSessionGetTimeProtobuf = override => Builder.encode(Adapter.encode(getSessionGetTime(override))).finish();

module.exports = {
  getSessionGetTime,
  getSessionGetTimeProtobuf,
};
