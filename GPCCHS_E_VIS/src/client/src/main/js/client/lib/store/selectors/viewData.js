import { createSelector } from 'reselect';
import _reduce from 'lodash/reduce';
import __ from 'lodash/fp';

export const getViewData = state => state.viewData;

export const getData = createSelector(
  (state, { viewId }) => viewId,
  getViewData,
  __.get
);

// TODO test + factorize in structure type + reselect
export const getCount = state => _reduce(getViewData(state), (c, view) => {
  if (typeof view.columns === 'object') {
    // PlotView
    return _reduce(view.columns, (c2, column) => c2 + (Object.keys(column).length - 1), c);
  } else if (typeof view.values === 'object') {
    // TextView
    return c + Object.keys(view.values).length;
  }
  // other view type
  return c + 1;
}, 0);
