// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// END-HISTORY
// ====================================================================

const _each = require('lodash/each');
const constants = require('../../constants');
const logger = require('../../common/logManager')('stubs:utils');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

const DCMap = (queryId, dataId, payloads, rawBuffer) => {
  const buffer = [
    null,
    stubData.getTimebasedArchiveDataHeaderProtobufADE(queryId, true, false),
    rawBuffer,
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  return buffer;
};

function shouldPushANewValue(timestamp) {
  if (timestamp > Date.now()) {
    return false; // stub never send value in the future
  }
  return timestamp % 7 === 0;
}

module.exports = function sendObsoleteEventData(
  queryKey,
  queryId,
  dataId,
  interval,
  isLast,
  zmq,
  versionDCCom,
  rawBuffer
) {
  const from = interval.startTime.ms;
  const to = interval.endTime.ms;
  if (to <= from) {
    throw new Error(
      'Invalid interval requested to DC stub',
      dataId.parameterName,
      interval.startTime.ms,
      interval.endTime.ms
    );
  }

  const payloads = [];
  const now = Date.now();

  for (let timestamp = from;
       timestamp <= to && timestamp < now;
       timestamp += constants.DC_STUB_VALUE_TIMESTEP
  ) {
    if (shouldPushANewValue(timestamp)) {
      const payload = getPayload(timestamp, dataId, versionDCCom, {
        epName: dataId.parameterName,
      });
      if (payload !== null) {
        payloads.push(payload);
      }
    }
  }

  if (!payloads.length) {
    return;
  }
  const buffer = DCMap(queryId, dataId, payloads, rawBuffer);
  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }

  logger.debug(`push ${payloads.length} obsolete event data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
