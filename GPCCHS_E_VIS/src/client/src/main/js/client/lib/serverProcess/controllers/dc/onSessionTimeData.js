const logger = require('../../../common/logManager')('controllers:onSessionTimeData');
const { decode } = require('common/protobuf');

/**
 * Triggered on DC session time request response.
 *
 * - decode and pass to registered callback
 *
 * @param queryIdBuffer
 * @param buffer
 */
module.exports = (reply, queryIdBuffer, buffer) => {
  logger.silly('called');

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  logger.silly('decoded queryId', queryId);
  reply(queryId, { timestamp: decode('dc.dataControllerUtils.Timestamp', buffer).ms });
};
