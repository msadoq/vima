// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 2.0.0 : DM : #5806 : 13/11/2017 : Pass mode into archive query (GMA/OBA)
// VERSION : 2.0.0.2 : FA : #11854 : 18/04/2018 : Fix provider flow field in data map
// END-HISTORY
// ====================================================================

import _has from 'lodash/has';
import _set from 'lodash/set';
import _each from 'lodash/each';
import _findIndex from 'lodash/findIndex';
import { DATASTRUCTURETYPE_RANGE, PROVIDER_FLOW_ALL } from '../constants';
import { getStructureType } from '../viewManager';

export function addEpInRangeTbdIdMap(rangeTbdIdMap, ep, viewId) {
  const { tbdId } = ep;
  // error on entry point => no remoteId
  if (!tbdId) {
    return rangeTbdIdMap;
  }
  const newMap = rangeTbdIdMap || {};
  if (!newMap[tbdId]) {
    const { dataId, filters, mode } = ep;
    const provider = dataId.provider === PROVIDER_FLOW_ALL ? '' : dataId.provider;
    newMap[tbdId] = {
      dataId: {
        ...dataId,
        provider,
      },
      localIds: {},
      views: [viewId],
      mode,
      filters,
    };
  } else {
    // Add the connected view only once
    const index = _findIndex(newMap[tbdId].views, id => id === viewId);
    if (index < 0) {
      newMap[tbdId].views.push(viewId);
    }
  }
  const { localId, field, fieldX, fieldY, offset, timebarUuid, type } = ep;
  // ignore existing localIds (will represent the same data)
  if (!_has(newMap, [tbdId, 'localIds', localId])) {
    // insert (perRangeTbdId)
    _set(newMap, [tbdId, 'localIds', localId], {
      timebarUuid,
      offset,
      viewType: type,
    });
    // keep test on field for parametric plot
    if (field) {
      newMap[tbdId].localIds[localId].field = field;
    } else if (fieldY) {
      newMap[tbdId].localIds[localId].fieldX = fieldX;
      newMap[tbdId].localIds[localId].fieldY = fieldY;
    }
  }
  return newMap;
}

export default function perRangeTbdIdMap(perViewMap) {
  let rangeTbdIdMap = {};
  _each(perViewMap, (view, viewId) => {
    // Get structure type of view to treat only range structure
    if (getStructureType(view.type) === DATASTRUCTURETYPE_RANGE) {
      _each(view.entryPoints, (entryPoint) => {
        rangeTbdIdMap = addEpInRangeTbdIdMap(rangeTbdIdMap, entryPoint, viewId);
      });
    }
  });
  return rangeTbdIdMap;
}
