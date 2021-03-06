// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 22/08/2017 : Add robustness test on rangeData (try/catch)
// VERSION : 1.1.2 : FA : #7578 : 24/08/2017 : Add robustness code on dataId retrieval
// VERSION : 1.1.2 : DM : #6700 : 25/08/2017 : Add execution map trace in three middlewares to make
//  performance analysis easier
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// VERSION : 2.0.0 : DM : #5806 : 23/10/2017 : Generate and include out of time range alarms
//  requiring an Ack
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================prepareObsoleteEvent.spec

import _isEmpty from 'lodash/isEmpty';
import _isBuffer from 'lodash/isBuffer';
import * as types from 'store/types';
import { newData } from 'store/actions/incomingData';
import { decode, getType } from 'utils/adapters';
import dataMapGenerator from 'dataManager/map';
import { isTimestampInLastInterval } from 'dataManager/mapSelector';
import executionMonitor from 'common/logManager/execution';
import { add as addMessage } from 'store/actions/messages';
import { PREFIX_KNOWN_RANGES } from 'constants';

const logger = require('../../../common/logManager')('middleware:prepareRange');

const prepareRange = lokiManager => ({ dispatch, getState }) => next => (action) => {
  if (action.type !== types.INCOMING_RANGE_DATA) {
    return next(action);
  }

  const execution = executionMonitor('middleware:prepareRange');
  execution.start('global');

  const tbdId = action.payload.tbdId;
  const dataId = action.payload.dataId;
  const peers = action.payload.peers;
  const payloadProtobufType = getType(dataId.comObject);
  if (typeof payloadProtobufType === 'undefined') {
    logger.error('protobufType unknown');
    execution.stop('global');
    execution.print();
    return next(action);
  }

  const payloadsJson = { [tbdId]: {} };

  execution.start('dataMap');
  const dataMap = dataMapGenerator(getState());
  execution.stop('dataMap');

  let index = 0;

  const isIn = !!dataMap.expectedRangeIntervals[tbdId];

  while (index + 1 < peers.length) {
    // robustness code, LPISIS could send empty ZeroMQ frame
    if (_isBuffer(peers[index]) && _isBuffer(peers[index + 1])) {
      try {
        execution.start('decode timestamp');
        const timestamp = decode('dc.dataControllerUtils.Timestamp', peers[index]).ms;
        execution.stop('decode timestamp');

        execution.start('decode payload');
        const payload = decode(payloadProtobufType, peers[index + 1]);
        execution.stop('decode payload');
        execution.start('addRecord');
        lokiManager.addRecord(PREFIX_KNOWN_RANGES, tbdId, { timestamp, payload });
        execution.stop('addRecord');

        execution.start('persist');
        /**
         * isIn {bool}: We required an interval
         * isTimestampInLastInterval(...): specific treatment for forecast & last data
         */
        if (isIn || isTimestampInLastInterval(dataMap, { tbdId, timestamp })) {
          payloadsJson[tbdId][timestamp] = payload;
        }
        execution.stop('persist');
      } catch (e) {
        logger.error('error on processing buffer', e);
        dispatch(addMessage('global', 'warning', 'error on processing header buffer '.concat(e)));
      }
    }
    index += 2;
  }

  // If data needs to be send to reducers, dispatch action
  if (!_isEmpty(payloadsJson[tbdId])) {
    dispatch(newData({ [PREFIX_KNOWN_RANGES]: payloadsJson }));
  }

  execution.stop('global', `${peers.length / 2} payloads`);
  execution.print();
  return next(action);
};

export default prepareRange;
