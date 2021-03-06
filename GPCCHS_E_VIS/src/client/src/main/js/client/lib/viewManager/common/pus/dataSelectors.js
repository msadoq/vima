import _get from 'lodash/get';
import _set from 'lodash/set';
import _omit from 'lodash/omit';
import _getOr from 'lodash/fp/getOr';
import { getPusFlattenId } from 'common/flattenDataId';
import { getModelEntryByDataType, getViewType, getTableIdsByPusService } from 'viewManager/common/pus/utils';
import { getSessionByTimelineId } from '../../../store/reducers/sessions';
import { getVisuWindowByViewId } from '../../../store/selectors/views';
import { getDomainId } from '../../../store/reducers/domains';

const getEntryPointsByViewId = (state, { viewId, pusService }) => (
  _getOr([], [`${getViewType(pusService)}Configuration`, viewId, 'entryPoints'], state)
);

const getPUSViewData = (state, { viewId, pusService }) => {
  const entryPoint = getEntryPointsByViewId(state, { viewId, pusService })[0];
  const { connectedData } = entryPoint;
  const domainId = getDomainId(state, { domainName: connectedData.domain });
  const session = getSessionByTimelineId(state, { timelineId: connectedData.timeline });
  const sessionId = session !== undefined ? session.id : undefined;
  const apids = connectedData.apids || [];
  const models = apids.map((apid) => {
    const flattenId = getPusFlattenId([apid], { domainId, sessionId });
    let model = _getOr({}, ['knownPus', pusService, flattenId, 'model'], state);
    const deltas = _getOr({}, ['knownPus', pusService, flattenId, 'deltas'], state);
    if (Object.keys(model).length !== 0) {
      // there is some deltas to apply
      if (Object.keys(deltas).length !== 0) {
        const visuWindow = getVisuWindowByViewId(state, { viewId });
        const { current, lower } = visuWindow;
        // get deltas between lower timestamp and current timestamp of visuWindow
        const deltasToApply = Object.keys(deltas).filter(t => t > lower && t < current);
        deltasToApply.forEach((index) => {
          const delta = deltas[index];
          const key = getModelEntryByDataType(delta.dataType);
          let addToParts = true;
          const modelPart = _get(model.payload, [key]).map((part) => {
            // search part of model that will change with the delta
            // return the delta for replace it in the array
            if (part.uniqueId === delta.payload.uniqueId) {
              addToParts = false;
              return delta.payload;
            }
            return part;
          });
          // if delta does not correspond of a part of the model it will be add in the array
          if (addToParts) {
            modelPart.push(delta.payload);
          }
          // replace model part with the one transform by deltas
          model = _set(model, ['payload', key], modelPart);
        });
      }
      return model;
    }
    return null;
  }).filter(model => model !== null);

  return Object.keys(models).length > 0 ?
    pusDataAggregation(models, getTableIdsByPusService(pusService)) : models;
};

const pusDataAggregation = (models, tableIds) => {
  const headers = models.map((model) => {
    const omitedTableIds = _omit(model.payload, tableIds);
    return omitedTableIds;
  });
  const dataForTables = {};
  tableIds.forEach((tableId) => {
    const blah = models.reduce((pV, cV) => {
      pV.push(_getOr({}, ['payload', tableId], cV));
      return pV;
    }, []);
    const merged = [].concat(...blah);
    dataForTables[tableId] = merged;
  });
  return {
    headers,
    dataForTables,
  };
};

export default {
  getPUSViewData,
  getEntryPointsByViewId,
  pusDataAggregation,
};
