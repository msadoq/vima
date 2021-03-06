// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some
//  stubProcesses and some controllers
// VERSION : 2.0.0 : DM : #5806 : 20/10/2017 : Change alarm frequency and random generation
// VERSION : 2.0.0 : DM : #5806 : 23/10/2017 : Generate and include out of time range alarms
//  requiring an Ack
// VERSION : 2.0.0 : DM : #5806 : 03/11/2017 : Fix generation of alarms ack
// VERSION : 2.0.0 : DM : #5806 : 06/11/2017 : Out of range alarms treatment + double alarms
//  corection
// VERSION : 2.0.0 : DM : #5806 : 07/11/2017 : refacto for getpaiload for alarms
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : Fix parseEntryPoint to take into account
//  provider field and update dc stubs
// END-HISTORY
// ====================================================================

const _each = require('lodash/each');
const _get = require('lodash/get');
const logger = require('../../common/logManager')('stubs:utils');
const constants = require('../../constants');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();
const thisIsTheEnd = stubData.getBooleanProtobuf(true);

const queries = {};

const V1 = (queryId, dataId, payloads) => {
  const buffer = [
    null,
    stubData.getTimebasedArchiveDataHeaderProtobuf(),
    stubData.getStringProtobuf(queryId),
    stubData.getDataIdProtobuf(dataId),
    thisIsTheEnd,
  ];
  _each(payloads, (payload) => {
    buffer.push(payload.timestamp);
    buffer.push(payload.payload);
  });
  return buffer;
};

const V2 = (queryId, dataId, payloads, rawBuffer) => {
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

const versionDCMap = {
  [constants.DC_COM_V1]: V1,
  [constants.DC_COM_V2]: V2,
};

function shouldPushANewValue(queryKey, timestamp) {
  if (timestamp > Date.now()) {
    return false; // stub never send value in the future
  }

  const previous = _get(queries, queryKey);
  if (typeof previous === 'undefined') {
    queries[queryKey] = timestamp;
    return true;
  }
  if (Math.abs(timestamp - previous) >= constants.DC_STUB_VALUE_TIMESTEP) {
    queries[queryKey] = timestamp;
    return true;
  }
  return false;
}

module.exports = function sendArchiveData(
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

  if (isLast) {
    // compute number of steps from lower time to current
    const n = Math.floor((to - from) / constants.DC_STUB_VALUE_TIMESTEP) / 2;
    let timestamp = from + (n * constants.DC_STUB_VALUE_TIMESTEP);
    if (timestamp > now) {
      // stub never send value in the future
      timestamp = now - constants.DC_STUB_VALUE_TIMESTEP;
    }
    const payload = getPayload(
      timestamp,
      dataId,
      versionDCCom,
      { epName: dataId.parameterName }
    );
    if (payload !== null) {
      payloads.push(payload);
    }
  } else {
    // All toAck alarms are pushed by DC whatever the given alarm
    if (dataId.comObject.indexOf('Alarm') !== -1) {
      for (let timestamp = 1e4; timestamp < 12e3; timestamp += constants.DC_STUB_VALUE_TIMESTEP) {
        const payload = getPayload(timestamp, dataId, versionDCCom, {
          epName: dataId.parameterName,
          withAckRequest: true,
          withAck: false,
        });
        if (payload !== null) {
          payloads.push(payload);
        }
      }
    }

    const sampledTimeStep = (to - from) / (dataId.samplingNumber + 1);
    const computeStep = (samplingParam) => {
      switch (samplingParam) {
        case 0: // 0 is when sampling is off
          return constants.DC_STUB_VALUE_TIMESTEP;
        default: // default is when sampling is on
          return (
            (
              (constants.DC_STUB_VALUE_TIMESTEP > sampledTimeStep) ?
              constants.DC_STUB_VALUE_TIMESTEP :
              sampledTimeStep
            )
          );
      }
    };
    const timeStep = computeStep(dataId.samplingNumber);
    for (let timestamp = from;
      timestamp <= to && timestamp < now;
      timestamp += timeStep
    ) {
      if (shouldPushANewValue(queryKey, timestamp)) {
        const payload = getPayload(timestamp, dataId, versionDCCom, {
          epName: dataId.parameterName,
          alarmFrequency: (1 / constants.DC_STUB_VALUE_ALARMTIMESTEP),
        });
        if (payload !== null) {
          payloads.push(payload);
        }
      }
    }
  }

  if (!payloads.length) {
    return;
  }
  const buffer = versionDCMap[versionDCCom](queryId, dataId, payloads, rawBuffer);
  if (payloads.length !== 0) {
    zmq.push('stubData', buffer);
  }

  logger.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
};
