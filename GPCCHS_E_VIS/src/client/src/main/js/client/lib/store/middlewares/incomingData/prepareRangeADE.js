import _isBuffer from 'lodash/isBuffer';
import * as types from 'store/types';
import { newData } from 'store/actions/incomingData';
import { decode, getTypeAggreg, decodePayload } from 'utils/adapters';
import dataMapGenerator from 'dataManager/map';
import { isTimestampInLastInterval } from 'dataManager/mapSelector';
import executionMonitor from 'common/logManager/execution';
import { add as addMessage } from 'store/actions/messages';
import { PREFIX_KNOWN_RANGES, PREFIX_SAMPLING } from 'constants';


const logger = require('../../../common/logManager')('middleware:prepareRangeADE');

const prepareRange = lokiManager => ({ dispatch, getState }) => next => (action) => {
  if (action.type !== types.INCOMING_RANGE_DATA) {
    return next(action);
  }

  const execution = executionMonitor('middleware:prepareRangeADE');
  execution.start('global');

  const tbdId = action.payload.tbdId;
  const dataId = action.payload.dataId;
  const peers = action.payload.peers;
  const samplingNumber = action.payload.samplingNumber;
  const samplingStatus = samplingNumber === undefined ? 'off' : 'on';

  // console.log('reponse ', tbdId, ' peers: ', peers.length/2);

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
        const decoded = decodePayload(peers[index + 1]);
        const decodedPayload = decode(getTypeAggreg(dataId.comObject), decoded);
        execution.stop('decode payload');
        // console.log('prepareRange dataId: ', dataId);

        execution.start('addRecord');
        switch (samplingStatus) {
          case 'on':
            lokiManager.addRecord(
              PREFIX_SAMPLING,
              tbdId,
              { timestamp, payload: decodedPayload }
            );
            break;
          default: // default is when sampling is off
            lokiManager.addRecord(
              PREFIX_KNOWN_RANGES,
              tbdId,
              { timestamp, payload: decodedPayload }
            );
        }
        execution.stop('addRecord');

        execution.start('persist');
        /**
         * isIn {bool}: We required an interval
         * isTimestampInLastInterval(...): specific treatment for forecast & last data
         */
        if (isIn || isTimestampInLastInterval(dataMap, { tbdId, timestamp })) {
          payloadsJson[tbdId][timestamp] = decodedPayload;
        }
        execution.stop('persist');
      } catch (e) {
        logger.error('error on processing buffer', e);
        dispatch(addMessage('global', 'warning', 'error on processing header buffer '.concat(e)));
      }
    }
    index += 2;
  }

  // dispatch data per tbdId
  const tbdIds = Object.keys(payloadsJson);

  // If data needs to be send to reducers, dispatch action
  if (tbdIds.length) {
    dispatch(newData({ [PREFIX_KNOWN_RANGES]: payloadsJson }));
  }

  execution.stop('global', `${peers.length / 2} payloads`);
  execution.print();
  return next(action);
};

export default prepareRange;
