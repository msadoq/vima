import { createSelector } from 'reselect';
import moment from 'moment';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';
import _ from 'lodash/fp';

import { getMimicViewData, getData } from './dataReducer';

const getEntryPointsByViewId = (state, { viewId }) => (
  _.get(`MimicViewConfiguration.${viewId}.entryPoints`, state)
);

const getCount = createSelector(
  getMimicViewData,
  (dataState) => {
    if (!dataState || !Object.keys(dataState).length) {
      return { all: 0 };
    }
    const viewIds = Object.keys(dataState || {});
    const count = {};
    let countAll = 0;
    // Loop on views
    for (let i = 0; i < viewIds.length; i += 1) {
      const viewId = viewIds[i];
      const viewState = dataState[viewId];
      count[viewId] = Object.keys(viewState.index || {}).length;
      countAll += count[viewId];
    }
    // Add all
    count.all = countAll;
    return count;
  }
);

const getLastValue = createSelector(
  (state, { viewId }) => getData(state, { viewId }),
  (state, { epName }) => epName,
  (viewData, epName) => {
    const lastTimestamp = _get(viewData, ['index', epName]);
    const value = _get(viewData, ['values', epName, 'value']);
    if (_isNil(lastTimestamp) || _isNil(value)) {
      return null;
    }
    const timestamp = moment(lastTimestamp).utc().toISOString();
    return { timestamp, value };
  }
);

export default {
  getCount,
  getLastValue,
  getEntryPointsByViewId,
};
