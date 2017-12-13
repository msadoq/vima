import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import createReducerByViews from 'store/helpers/createReducerByViews';
import view from './view';

/* --- Reducer -------------------------------------------------------------- */
export default createReducerByViews(view);

/* --- Selectors ------------------------------------------------------------ */
export const getViews = _.get('views');
export const getView = (state, { viewId }) => _.get(viewId, getViews(state));

export const getViewIsModified = createSelector(
  getView,
  _.get('isModified')
);

export const getModifiedViewsIds = state =>
  Object
    .keys(getViews(state))
    .filter(vId => state.views[vId].isModified);

export const getViewTitle = createSelector(
  getView,
  _.prop('title')
);

export const getViewAbsolutePath = createSelector(
  getView,
  _.get('absolutePath')
);

export const getViewType = createSelector(
  getView,
  _.get('type')
);

export const getViewTitleStyle = createSelector(
  getView,
  _.get('titleStyle')
);

export const getViewDomainName = createSelector(
  getView,
  _.get('domainName')
);

export const getViewSessionName = createSelector(
  getView,
  _.get('sessionName')
);

export const getLinks = createSelector(
  getView,
  _.get('links')
);

export const getLink = createSelector(
  (state, { linkId }) => linkId,
  getLinks,
  _.get
);

export const areLinksShown = createSelector(
  getView,
  _.get('showLinks')
);

export const getProcedures = createSelector(
  getView,
  _.get('procedures')
);

export const getViewIsSaved = createSelector(
  getView,
  _.anyPass([_.has('oId'), _.has('absolutePath')])
);
