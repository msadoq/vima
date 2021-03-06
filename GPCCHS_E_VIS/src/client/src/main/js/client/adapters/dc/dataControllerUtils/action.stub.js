// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const ProtoBuf = require('protobufjs');
const Adapter = require('./action');
const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/Action.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Action');

const SUBSCRIPTIONACTION_ADD = 0;
const SUBSCRIPTIONACTION_DELETE = 1;

const getAddAction = () => ({
  action: SUBSCRIPTIONACTION_ADD,
});
const getDeleteAction = () => ({
  action: SUBSCRIPTIONACTION_DELETE,
});

const getAddActionProtobuf = () => Builder.encode(Adapter.encode(getAddAction())).finish();
const getDeleteActionProtobuf = () => Builder.encode(Adapter.encode(getDeleteAction())).finish();

module.exports = {
  getAddAction,
  getDeleteAction,
  getAddActionProtobuf,
  getDeleteActionProtobuf,
};
