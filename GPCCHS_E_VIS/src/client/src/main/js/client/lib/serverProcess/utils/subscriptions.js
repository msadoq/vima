const logger = require('../../common/logManager')('utils/subscriptions');
const { encode } = require('common/protobuf');
const globalConstants = require('../../constants');
const flattenDataId = require('../../common/flattenDataId');

const registeredCallbacks = require('../../common/callbacks');
const connectedDataModel = require('../models/connectedData');
const { main } = require('../ipc');

function errorCallback(err) {
  if (err) {
    // forward error to main
    main.message(globalConstants.IPC_METHOD_ERROR, { err });
  }
}

/**
 * Protobuf optimization
 */
let staticProtobufs;
function getStaticProtobuf(type) {
  if (!staticProtobufs) {
    staticProtobufs = {
      header: encode('dc.dataControllerUtils.Header', {
        messageType: globalConstants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION,
      }),
      add: encode('dc.dataControllerUtils.Action', {
        action: globalConstants.SUBSCRIPTIONACTION_ADD,
      }),
      delete: encode('dc.dataControllerUtils.Action', {
        action: globalConstants.SUBSCRIPTIONACTION_DELETE,
      }),
    };
  }

  return staticProtobufs[type];
}

let subIdIndex = 0;
function generateSubId() {
  subIdIndex += 1;
  return `sub${subIdIndex}`;
}

const resetSubId = () => {
  subIdIndex = 0;
};

const dataIdProtobufs = {};
function getDataIdProtobuf(dataId) {
  const flatDataId = flattenDataId(dataId);
  if (typeof dataIdProtobufs[flatDataId] === 'undefined') {
    dataIdProtobufs[flatDataId] = encode('dc.dataControllerUtils.DataId', dataId);
  }

  return dataIdProtobufs[flatDataId];
}

const createAddSubscriptionMessage = (dataId) => {
  const subId = generateSubId();

  registeredCallbacks.set(subId, errorCallback);

  const args = [
    getStaticProtobuf('header'),
    encode('dc.dataControllerUtils.String', { string: subId }),
    getDataIdProtobuf(dataId),
    getStaticProtobuf('add'),
  ];

  return { args, subId };
};

const createDeleteSubscriptionMessage = (dataId) => {
  const subId = generateSubId();

  registeredCallbacks.set(subId, errorCallback);

  const args = [
    getStaticProtobuf('header'),
    encode('dc.dataControllerUtils.String', { string: subId }),
    getDataIdProtobuf(dataId),
    getStaticProtobuf('delete'),
  ];

  return { args, subId };
};

/**
 * Loop on existing subscriptions and close each
 *
 * @param sendMessageToDc
 */
const unsubscribeAll = (sendMessageToDc) => {
  const subscriptions = connectedDataModel.getAll();
  connectedDataModel.cleanup();

  if (subscriptions.length) {
    subscriptions.forEach((subscription) => {
      const message = createDeleteSubscriptionMessage(subscription.dataId);
      logger.debug('sending subscription deletion to DC');
      return sendMessageToDc(message.args);
    });
  }
};

module.exports = {
  resetSubId,
  createAddSubscriptionMessage,
  createDeleteSubscriptionMessage,
  unsubscribeAll,
};
