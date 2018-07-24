const logger = require('../../common/logManager')('stubs:utils');
const constants = require('../../constants');
const getPayload = require('./getPayload');
const stubs = require('../../utils/stubs');

const stubData = stubs.getStubData();

function shouldPushANewValue(timestamp, previous) {
  return timestamp < Date.now() &&
  Math.abs(timestamp - previous) >= constants.PUS_STUB_VALUE_TIMESTEP;
}

module.exports = function sendPusData(
  header,
  structure,
  zmq
) {
  const { sessionId, domainId, pusService, pusServiceApid, messageUniqueId } = header;
  const { forReplay, firstTime, lastTime, continuous } = structure;

  const from = firstTime.value;
  const to = lastTime.value;

  if (to <= from) {
    throw new Error(
      'Invalid interval requested to PusActor stub',
      pusService.value,
      from,
      to
    );
  }

  const payloads = [];
  const now = Date.now();
  let previousTimestamp = 0;

  for (let timestamp = from;
       timestamp <= to && timestamp < now;
       timestamp += constants.PUS_STUB_VALUE_TIMESTEP
  ) {
    if (shouldPushANewValue(timestamp, previousTimestamp)) {
      const payload = getPayload(pusService.value, timestamp);
      if (payload !== null) {
        payloads.push(payload);
      }
    }
    previousTimestamp = timestamp;
  }

  if (!payloads.length) {
    return;
  }

  if (payloads.length !== 0) {
    payloads.forEach((payload) => {
      zmq.push('stubPusPush', [
        stubData.getHeaderStructureProtobuf({
          messageType: constants.PUS_DATA,
          sessionId: sessionId.value,
          domainId: domainId.value,
          pusService: pusService.value,
        }),
        payload,
      ]);
    });
  }

  logger.debug(`push ${payloads.length} data from query from: ${new Date(from)} to ${new Date(to)} now`);
}