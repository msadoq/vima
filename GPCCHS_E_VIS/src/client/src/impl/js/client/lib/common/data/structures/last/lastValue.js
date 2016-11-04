import { each, has, get, set } from 'lodash';
import { constants as globalConstants } from 'common';
import debug from '../../../debug/mainDebug';

const logger = debug('data:lastValue');

// Get the nearest value from the current time
export function select(remoteIdPayload, ep, epName, viewSubState) {
  // Entry points on this remoteId
  const lower = ep.expectedInterval[0];
  const current = ep.expectedInterval[1];
  // previous time recorded
  let previousTime = 0;
  if (viewSubState && viewSubState.index[epName]) {
    if (viewSubState.index[epName] < current) {
      previousTime = viewSubState.index[epName];
    }
  }
  let newValue;
  // search over payloads
  each(remoteIdPayload, (p) => {
    const timestamp = p.referenceTimestamp;
    if (typeof timestamp === 'undefined') {
      return logger.warn('get a payload without .referenceTimestamp key');
    }

    if (timestamp < lower || timestamp > current) {
      return;
    }
    if (timestamp >= previousTime) {
      newValue = { timestamp, value: p[ep.field] };
      previousTime = timestamp;
    }
  });
  return newValue;
}

export default function lastValue(state, payload, viewId, entryPoints, count) {
  let viewData;
  // Entry points
  each(entryPoints, (ep, epName) => {
    // No payload for this remote Id
    if (!has(payload, ep.remoteId)) {
      return;
    }
    // Get current state for update
    const currentSubState = get(state, ['viewData', viewId]);
    // compute new data
    const newData = select(payload[ep.remoteId], ep, epName, currentSubState);
    if (!newData) {
      return;
    }
    if (!viewData) {
      viewData = {};
    }

    set(viewData, ['index', epName], newData.timestamp);
    set(viewData, ['values', epName], newData.value);
    set(viewData, ['structureType'], globalConstants.DATASTRUCTURETYPE_LAST);
    count.last += 1; // eslint-disable-line no-param-reassign
  });
  return viewData;
}
