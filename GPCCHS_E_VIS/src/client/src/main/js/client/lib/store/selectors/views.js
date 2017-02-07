import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import _ from 'lodash/fp';
import u from 'updeep';

// import parseFormula from '../../dataManager/structures/common/formula';
import { getViewData } from './viewData';
import { compile } from '../../common/operators';
import { getDomains } from './domains';
import { getTimebars } from './timebars';
import { getTimelines } from './timelines';
import { getWindowsVisibleViews } from './windows';
import { getViewData as viewData } from '../../dataManager/map';
import { getMasterSessionId } from './masterSession';
// import { createLoggingSelector } from '../../common/utils';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

export const getViews =
  _.prop('views');

export const getView =
  (state, viewId) =>
    _.prop(viewId, getViews(state));

export const getEntryPointOnAxis = (state, viewId, axisId) => {
  const epOnAxis = [];
  if (!state.views[viewId] || !state.views[viewId].configuration.axes[axisId]) {
    return epOnAxis;
  }
  state.views[viewId].configuration.entryPoints.forEach((ep) => {
    if (ep.connectedDataX.axisId === axisId || ep.connectedDataY.axisId === axisId) {
      epOnAxis.push(ep.name);
    }
  });
  return epOnAxis;
};

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewConfiguration = createSelector(
  getView,
  _.prop('configuration')
);

export const getViewContent = createSelector(
  getViewConfiguration,
  _.prop('content')
);

export const _getViewEntryPoints = createSelector(
  [
    getView,
    getMasterSessionId,
    getWindowsVisibleViews,
    getDomains,
    getTimebars,
    getTimelines,
    (state, viewId) => viewId,
  ],
    (view, masterSessionId, visibleViews, domains, timebars, timelines, viewId) => {
      const visibleView = visibleViews.find(v => v.viewId === viewId);
      const data = viewData({
        domains,
        timebars,
        timelines,
        view: _.get('viewData', visibleView),
        timebarUuid: _.get('timebarUuid', visibleView),
        masterSessionId,
      });
      return _.pipe(
        _.pathOr([], ['configuration', 'entryPoints']),
        entryPoints => entryPoints.map(
          (ep, i) => {
            const error = _.get(['epsData', i, 'error'], data);
            return error ?
              _.assoc('error', error, ep) :
              ep;
          }
        )
      )(view);
    }
  );

export const makeGetViewEntryPoints = () => createDeepEqualSelector(
  _getViewEntryPoints,
  _.identity
);

export const getViewEntryPoints = makeGetViewEntryPoints();

export const getViewEntryPoint = (state, viewId, epName) =>
  getViewEntryPoints(state, viewId)
    .find(ep => ep.name === epName);

export const getViewEntryPointStateColors = createSelector(
  getViewEntryPoint,
  _.propOr([], 'stateColors')
);

const getEntryPoint = (epName, entryPoints) => entryPoints.find(ep => ep.name === epName);

export const getEntryPointColorObj = ({ entryPoints, epName, value, dataProp }) => {
  const stateColor = _.propOr([], 'stateColors', getEntryPoint(epName, entryPoints))
    .filter(c =>
      (new RegExp(`${_.pathOr('', ['condition', 'field'], c)}$`, 'g'))
        .test(_.pathOr('', [dataProp, 'formula'], getEntryPoint(epName, entryPoints))))
    .find(c => compile(c.condition)(value));
  if (_.prop('color', stateColor)) {
    return {
      color: _.prop('color', stateColor),
    };
  }
  return undefined;
};

// Return value obj for TextView with color and check if entryPoint is valid
const getTextValueFn = (entryPoints, epName) => ({ value, ...args }) => ({
  value,
  ...args,
  ...getEntryPointColorObj({
    entryPoints,
    epName,
    value,
    dataProp: 'connectedData',
  }),
});

// Apply state colors on entry points value and return view data with state colors
export const getTextViewData = createSelector(
    getViewEntryPoints,
    getViewData,
    (entryPoints, data) => u({
      values: {
        ...Object.keys(_.getOr({}, ['values'], data)).reduce((acc, epName) => ({
          ...acc,
          [epName]: getTextValueFn(entryPoints, epName),
        }), {}),
      },
    }, data)
);
