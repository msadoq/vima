import _ from 'lodash/fp';
import { createSelector } from 'reselect';
import { getPages, getPageViewsIds } from '../reducers/pages';
import { getViews } from '../reducers/views';
import { getWindowFocusedPageId } from '../reducers/windows';

export const getPageViews = createSelector(
  getPageViewsIds,
  getViews,
  (viewIds, views) => _.map(viewId => ({ ...views[viewId], viewId }), viewIds)
);

export const getFocusedPage = createSelector(
  getWindowFocusedPageId,
  getPages,
  _.get
);

export const getFocusedPageId = createSelector(
  getFocusedPage,
  _.get('uuid')
);

export const getPageHasUnsavedViews = createSelector(
  getPageViews,
  _.pipe(
    _.find('isModified'),
    Boolean
  )
);

export const isAnyEditorOpened = createSelector(
  getPages,
  pages => _.reduce((checksum, page) => checksum || (!page.panels.editorIsMinimized), false, pages)
);

export const isAnyInspectorOpened = createSelector(
  getPages,
  pages =>
    _.reduce((checksum, page) => checksum || (!page.panels.explorerIsMinimized && page.panels.explorerTab === 'inspector'), false, pages)
);
