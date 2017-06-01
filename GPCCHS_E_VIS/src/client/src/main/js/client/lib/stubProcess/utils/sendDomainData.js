const stubData = require('common/protobuf/stubs');

const buffer = [
  null,
  stubData.getDomainDataHeaderProtobuf(),
  null,
  stubData.getDomainsProtobuf(stubData.getDomains()),
];

module.exports = function sendDomainData(queryId, zmq) {
  buffer[2] = stubData.getStringProtobuf(queryId);
  zmq.push('stubData', buffer);
};