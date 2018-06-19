// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : FA : #7185 : 06/07/2017 : Fix lint errors and warnings
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Plug mimic view to data consumption
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Remove view data clean action on mimic reducer
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : Fix cleaning data in last type views
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8801 : 19/12/2017 : Do not clean data when reload a view
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix display in every view
// END-HISTORY
// ====================================================================

import _isEqual from 'lodash/isEqual';
import _omit from 'lodash/omit';

import * as types from 'store/types';
import * as constants from 'viewManager/constants';
import { selectDataPerView, viewDataUpdate, viewObsoleteEventAdd } from 'viewManager/common/store/viewDataUpdate';
import _forEach from 'lodash/forEach';
import cleanCurrentViewData from './cleanViewData';
import { getVisuWindowByViewId } from '../../../store/selectors/views';

const initialState = {
  index: {},
  values: {},
};

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
export default function mimicViewData(state = {}, action) {
  switch (action.type) {
    case types.DATA_REMOVE_ALL_VIEWDATA:
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_VIEW_OPENED:
    case types.WS_VIEW_ADD_BLANK:
      if (action.payload.view.type !== constants.VM_VIEW_MIMIC) {
        return state;
      }
      return { ...state, [action.payload.view.uuid]: initialState };
    case types.WS_PAGE_OPENED:
    case types.WS_WORKSPACE_OPENED: {
      const { views } = action.payload;
      if (!views) {
        return state;
      }
      const newState = {};
      views.forEach((view) => {
        if (view.type !== constants.VM_VIEW_MIMIC) {
          return;
        }
        newState[view.uuid] = initialState;
      });
      return { ...state, ...newState };
    }
    case types.WS_VIEW_CLOSE: {
      const { viewId } = action.payload;
      if (state[viewId]) {
        return _omit(state, viewId);
      }
      return state;
    }
    case types.WS_PAGE_CLOSE: {
      const { viewIds } = action.payload;
      if (!viewIds.length) {
        return state;
      }
      let newState = state;
      viewIds.forEach((viewId) => {
        if (state[viewId]) {
          newState = _omit(newState, viewId);
        }
      });
      return newState;
    }
    case types.INJECT_DATA_LAST: {
      const oldIntervals = action.payload.oldExpectedLastIntervals;
      const newIntervals = action.payload.newExpectedLastIntervals;
      const { dataToInject, newViewMap, oldViewMap } = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      const viewMapIsEqual = _isEqual(newViewMap, oldViewMap);
      const intervalsAreEqual = _isEqual(newIntervals, oldIntervals);
      if (viewMapIsEqual && intervalsAreEqual && !dataKeys.length) {
        return state;
      }
      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        if (dataKeys.length) {
          // Data Selection
          const epSubState = selectDataPerView(
            newViewMap[viewId],
            newIntervals,
            dataToInject,
            newState[viewId]);
          if (Object.keys(epSubState).length !== 0) {
            const viewState = viewDataUpdate(newState[viewId], epSubState);
            if (viewState !== newState[viewId]) {
              newState = { ...newState, [viewId]: viewState };
            }
          }
        }
      }
      return newState;
    }
    case types.INJECT_DATA_OBSOLETE_EVENT: {
      const {
        dataToInject,
        newViewMap,
        globalState,
      } = action.payload;
      const dataKeys = Object.keys(dataToInject);
      // If nothing changed and no data to import, return state
      if (!dataKeys.length) {
        return state;
      }

      let newState = state;
      const viewIds = Object.keys(state);
      _forEach(viewIds, (viewId) => {
        if (newViewMap[viewId] && newViewMap[viewId].entryPoints) {
          const visuWindow = getVisuWindowByViewId(globalState, { viewId });
          const viewState = viewObsoleteEventAdd(
            newState[viewId],
            dataToInject,
            newViewMap[viewId].entryPoints,
            visuWindow.current
          );
          if (viewState !== newState[viewId]) {
            newState = { ...newState, [viewId]: viewState };
          }
        }
      });
      return newState;
    }
    case types.WS_VIEWDATA_CLEAN: {
      const { previousDataMap, dataMap } = action.payload;

      // since now, state will changed
      let newState = state;
      const viewIds = Object.keys(state);
      for (let i = 0; i < viewIds.length; i += 1) {
        const viewId = viewIds[i];
        const viewData = state[viewId];
        // Cleaning
        const subState = cleanCurrentViewData(
          viewData,
          previousDataMap.perView[viewId],
          dataMap.perView[viewId],
          previousDataMap.expectedLastIntervals,
          dataMap.expectedLastIntervals);
        if (subState !== viewData) {
          newState = { ...newState, [viewId]: subState };
        }
      }
      return newState;
    }
    default:
      return state;
  }
}

export const getMimicViewData = state => state.MimicViewData;

export const getData = (state, { viewId }) => state.MimicViewData[viewId];

// TODO: use createSelector(getData, getEntryPoints, () => {...})
export const getDataFilteredByEP = (state, { viewId }, entryPoints = {}) => {
  const data = getData(state, { viewId });
  const epKeys = Object.keys(entryPoints);
  return {
    index: epKeys.reduce((aggregator, key) => ({ ...aggregator, [key]: data.index[key] }), {}),
    values: epKeys.reduce((aggregator, key) => ({
      ...aggregator,
      [key]: data.values[key],
    }), {}),
  };
};

