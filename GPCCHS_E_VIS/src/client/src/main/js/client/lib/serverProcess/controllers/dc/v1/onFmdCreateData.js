// ====================================================================
// HISTORY
// END-HISTORY
// ====================================================================

const { decode } = require('../../../../utils/adapters');
const logger = require('../../../../common/logManager')('controllers:onFmdCreateData');
const globalConstants = require('../../../../constants');

const { pop } = require('../../../../common/callbacks');
const { add: addMessage } = require('../../../../store/actions/messages');
const { getStore } = require('../../../store');

/**
 * Triggered on create FMD document response
 *
 * - decode and pass to registered callback
 *
 * @param reply function
 * @param args array
 */
module.exports = (args) => {
  logger.silly('called');

  const queryIdBuffer = args[0];
  const statusBuffer = args[1];
  const buffer = args[2];

  const queryId = decode('dc.dataControllerUtils.String', queryIdBuffer).string;
  const callback = pop(queryId);
  logger.silly('decoded queryId', queryId);

  try {
    const { status } = decode('dc.dataControllerUtils.Status', statusBuffer);
    if (status !== globalConstants.STATUS_SUCCESS) {
      const { string: reason } = decode('dc.dataControllerUtils.String', buffer);
      callback({ err: reason });
    } else {
      callback(decode('dc.dataControllerUtils.FMDFileInfo', buffer));
    }
  } catch (e) {
    logger.error('error on processing buffer', e);
    getStore().dispatch(addMessage('global', 'warning',
      'error on processing header buffer '.concat(e)));
    callback({ err: e });
  }
};
