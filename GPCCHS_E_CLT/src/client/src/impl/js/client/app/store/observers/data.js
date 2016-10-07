import _ from 'lodash';

import * as constants from '../../constants';
import debug from '../../utils/mainDebug';
import { getStatus as getAppStatus } from '../selectors/hsc';
import dataMapGenerator from '../../connectedData/dataMap';
import requestsMapGenerator from '../../connectedData/requestsMap';
import { getWebsocket } from '../../websocket/mainWebsocket';
import { addRequests } from '../actions/dataRequests';

const logger = debug('store:observers:data');

// TODO _.throttle
export default function data(state, dispatch) {
  if (getAppStatus(state) !== constants.LIFECYCLE_STARTED) {
    return undefined;
  }

  logger.debug('begin data synchronisation');

  const start = process.hrtime();

  const dataMap = dataMapGenerator(state);
  // console.log(require('util').inspect(dataMap, {depth: 5}));

  const dataQueries = requestsMapGenerator(state, dataMap);
  // console.log(require('util').inspect(dataQueries, {depth: 5}));

  getWebsocket().write({ event: 'dataQuery', payload: dataQueries });

  dispatch(addRequests(dataQueries));

  const duration = process.hrtime(start)[1] / 1e6;
  logger.debug(
    `data synchronization done in ${duration}ms, ${Object.keys(dataQueries).length} remoteId`
  );
}
