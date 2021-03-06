// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// END-HISTORY
// ====================================================================

// const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
// const Adapter = require('./domain');

// const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/Domain.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Domain');

const getDomain = override => applyOverride({
  itemNamespace: 'Domains',
  name: 'fr',
  oid: '',
  domainId: 1,
  parentDomainId: 0,
}, override);

module.exports = {
  getDomain,
};
