const logger = require('common/log')('controllers:onDomainQuery');
const { encode } = require('common/protobuf');
const zmq = require('common/zmq');
const registeredCallbacks = require('common/callbacks');
const globalConstants = require('common/constants');

/**
 * Triggered when there is a new domain query on HSC
 *
 * - send a DomainQuery message to DC
 *
 * @param spark
 */

const protobufDomainHeader = encode('dc.dataControllerUtils.Header', {
  messageType: globalConstants.MESSAGETYPE_DOMAIN_QUERY,
});
let idIndex = 0;
const generateDomainId = () => {
  idIndex += 1;
  return `domain${idIndex}`;
};

const errorCallback = (err) => {
  if (err) {
    throw err;
  }
};

const domainQuery = (id, messageHandler) => {
  logger.debug('new domain query');

  // create and register queryId
  const queryId = (typeof id === 'undefined') ? generateDomainId() : id;
  registeredCallbacks.set(queryId, errorCallback);
  // protobufferize queryId
  const protobufQueryId = encode('dc.dataControllerUtils.String', {
    string: queryId,
  });

  const queryArgs = [protobufDomainHeader, protobufQueryId];

  messageHandler('dcPush', queryArgs);
};

module.exports = {
  domainQuery,
  onDomainQuery: queryId => domainQuery(queryId, zmq.push),
};
