// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : FA : #5316 : 08/02/2017 : Add viewData points count in right bar explorer
// VERSION : 1.1.2 : DM : #3622 : 16/02/2017 : fix reselect signature linting errors
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Remove useless selectors for state colors
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Add getentrypointsname in view selector
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : Refactoring of dataMap generation using reselect
// VERSION : 1.1.2 : DM : #3622 : 27/02/2017 : merge dev into abesson-html-editor and resolve
//  conflicts
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse bugs
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 06/03/2017 : Fix bug remount all views
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Move getPage and getPages selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Add comments on all selectors
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Remove unused getEntryPointOnAxis selector .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Creation of data store for plotView
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Cleanup in selectors . .
// VERSION : 1.1.2 : DM : #5828 : 20/03/2017 : Rename comments about simple/derived selectors
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Rename '__' in '_' (lodash/fp)
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move simple selectors from selectors/views to
//  reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getPageIdByViewId simple selector in
//  reducers/pages
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move getView/getViews simple selectors in
//  store/reducers/views
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Add some comments . .
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Remove useless line in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 27/03/2017 : Add getWindowAllViewsIds selector in selectors/views
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console
//  and spaced-comment.
// VERSION : 1.1.2 : DM : #6700 : 29/08/2017 : fix unnecessary datamap generation .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix display in every view
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA test end
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : correction bug domain colors algo
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA . .
// END-HISTORY
// ====================================================================

import { createSelector, createSelectorCreator, defaultMemoize } from 'reselect';
import _ from 'lodash/fp';
import _getOr from 'lodash/fp/getOr';
import _isEqual from 'lodash/isEqual';
import makeGetPerViewData from 'dataManager/perViewData';
import { getConfigurationByViewId } from 'viewManager/selectors';
import { getConfigurationReducers } from 'viewManager/reducers';
import { getPage, getPages, getPageIdByViewId, getPageTimebarId } from '../reducers/pages';
import { getWindowPageIds } from '../reducers/windows';
import { getTimebarVisuWindow } from '../reducers/timebars';

export const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  _.isEqual
);

const configurationReducers = getConfigurationReducers();

/* ********************************************************
* Comparison function to omit timebars in comparison
* Useful to compute perView and perRemoteId which are independent of visuWinow
******************************************************* */
function arePagesEqual(currentPages, previousPages) {
  const currentIds = Object.keys(currentPages);
  const previousIds = Object.keys(previousPages);
  if (!_isEqual(currentIds, previousIds)) {
    return false;
  }
  for (let i = 0; i < currentIds.length; i += 1) {
    const currentPage = currentPages[currentIds[i]];
    const previousPage = previousPages[currentIds[i]];
    if (currentPage.layout !== previousPage.layout
      || currentPage.views !== previousPage.views) {
      return false;
    }
  }
  return true;
}

function perViewDataEqualityCheck(current, previous) {
  if (current.timelines !== previous.timelines
    || current.windows !== previous.windows
    || current.views !== previous.views
    || current.domains !== previous.domains
    || current.sessions !== previous.sessions
    || current.masterSession !== previous.masterSession
    || current.timebarTimelines !== previous.timebarTimelines
    || current.timebars !== previous.timebars
  ) {
    return false;
  }
  if (current.pages !== previous.pages) {
    if (!arePagesEqual(current.pages, previous.pages)) {
      return false;
    }
  }
  const confs = Object.keys(configurationReducers);
  for (let i = 0; i < confs.length; i += 1) {
    if (current[confs[i]] !== previous[confs[i]]) {
      return false;
    }
  }
  // ViewId
  if (typeof previous === 'string' && previous !== current) {
    return false;
  }
  return true;
}

/**
 *   /!\ CAUTION: createDeepEqualSelectorPerViewData makes a deep equal on some fields only, not on the whole state.
 *   If you expect some data re-fetching that does not happen
 */
export const createDeepEqualSelectorPerViewData = createSelectorCreator(
  defaultMemoize,
  perViewDataEqualityCheck
);
const perViewDataSelectors = {};
// composed
export const getPerViewData = createDeepEqualSelectorPerViewData(
  state => state,
  (state, { viewId }) => viewId,
  (state, { viewId }) => getPage(state, { pageId: getPageIdByViewId(state, { viewId }) }),
  (state, viewId, page) => {
    if (!perViewDataSelectors[viewId]) {
      perViewDataSelectors[viewId] = makeGetPerViewData();
    }
    const { timebarUuid } = page;
    return perViewDataSelectors[viewId](state, { viewId, timebarUuid, pageId: page.uuid });
  });

// composed / to rename ?
export const getViewEntryPoints = (state, { viewId }) => (
  _.get('entryPoints',
    getPerViewData(state, { viewId })));

// composed
export const getViewEntryPointsName = createSelector(getViewEntryPoints, entryPoints =>
  _.map(ep => ep.name, entryPoints)
);

// composed
export const getViewEntryPoint = (state, { viewId, epName }) => (
  {
    ..._.getOr({}, epName, getViewEntryPoints(state, { viewId })),
    name: epName,
  }
);

export const getWindowAllViewsIds = createSelector(
  getWindowPageIds,
  getPages,
  (ids, pages) => _.pipe(
    _.pick(ids),
    _.flatMap('views'),
    _.compact
  )(pages)
);

/**
 * TODO: refactor cols into columns and deprecate this function
 *
 * @param viewId string
 * @param state object
 * @param {viewId, tableId} object
 * @return cols array
 */
export const getViewConfigurationTableCols = createSelector(
  (state, { tableId }) => tableId,
  getConfigurationByViewId,
  (tableId, viewConfiguration) => _getOr([], `tables.${tableId}.cols`, viewConfiguration)
);

/**
 * @param viewId string
 * @param state object
 * @return tables configurations array
 */
export const getViewConfigurationTables = createSelector(
  getConfigurationByViewId,
  viewConfiguration => _getOr([], 'tables', viewConfiguration)
);

export const getViewConfigurationTableColumns = createSelector(
  (state, { tableId }) => tableId,
  getConfigurationByViewId,
  (tableId, viewConfiguration) => _getOr([], `tables.${tableId}.cols`, viewConfiguration)
);

export const getVisuWindowByViewId = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const timebarUuid = getPageTimebarId(state, { pageId });
  const visuWindow = getTimebarVisuWindow(state, { timebarUuid });

  return visuWindow;
};
