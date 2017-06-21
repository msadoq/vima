// const ProtoBuf = require('protobufjs');
const applyOverride = require('../applyOverride');
// const Adapter = require('./domain');

// const Builder = new ProtoBuf.Root().loadSync(`${__dirname}/dataControllerUtils/Domain.proto`, { keepCase: true }).lookup('dataControllerUtils.protobuf.Domain');

const getDomain = override => applyOverride({
  itemNamespace: 'Domains',
  name: 'fr.cnes.isis',
  oid: '0051525005151000565215465660515',
  domainId: 1,
  parentDomainId: 0,
}, override);

module.exports = {
  getDomain,
};
