// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 03/04/2017 : Remove viewManager utils folder .
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : fix editor opening per view and rename longData to
//  convertData
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update DynamicView : plug it to data consumption
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

/* eslint-disable no-continue, "DV6 TBC_CNES Perf. requires 'for', 'continue' avoid complexity" */
import _get from 'lodash/get';
import _isEqual from 'lodash/isEqual';
import getLogger from 'common/logManager';
import { updateObjectValues } from 'viewManager/commonData/convertData';

const logger = getLogger('data:lastValue');

/* ************************************
 * Select payload to add for current view
 * @param: current view data map
 * @param: intervals for all entry Points
 * @param: received data
 * @return: updated state
/* *********************************** */
export function selectDataPerView(currentViewMap, intervalMap, payload, viewSubState) {
  if (!currentViewMap) {
    return {};
  }

  const epNames = Object.keys(currentViewMap.entryPoints);
  if (!epNames.length) {
    return {};
  }
  const epName = epNames[0];
  const ep = currentViewMap.entryPoints[epName];
  // Entry points on this tbdId
  const { tbdId, localId } = ep;
  const tbdIdPayload = payload[tbdId];
  if (!tbdIdPayload) {
    return {};
  }
  const expectedInterval = _get(intervalMap, [tbdId, localId, 'expectedInterval']);
  // case of error when visuWindow duration is too long
  if (!expectedInterval) {
    return {};
  }

  const lower = expectedInterval[0];
  const current = expectedInterval[1];

  // previous time recorded
  let previousTime = 0;
  if (viewSubState && viewSubState.index) {
    if (viewSubState.index < current) {
      previousTime = viewSubState.index;
    }
  }
  let newValue;
  // search over payloads
  const timestamps = Object.keys(tbdIdPayload);
  for (let j = 0; j < timestamps.length; j += 1) {
    const p = tbdIdPayload[timestamps[j]];
    const timestamp = _get(p, ['referenceTimestamp', 'value']);
    if (typeof timestamp === 'undefined') {
      logger.warn('get a payload without .referenceTimestamp key');
      continue;
    }
    if (timestamp < lower || timestamp > current) {
      continue;
    }
    if (timestamp > previousTime) {
      newValue = { timestamp, value: p };
      previousTime = timestamp;
    } else if (timestamp === previousTime) {
      // Update the value if it is different
      if (_isEqual(viewSubState.value, p)) {
        continue;
      }
      newValue = { timestamp, value: p };
    }
  }
  if (newValue) {
    newValue.value = updateObjectValues(newValue.value);
    return {
      index: newValue.timestamp,
      value: newValue.value,
    };
  }
  return viewSubState;
}

export function viewDataUpdate(viewDataState, payload) {
  if (!payload || !payload.value) {
    return viewDataState;
  }
  return payload;
}
