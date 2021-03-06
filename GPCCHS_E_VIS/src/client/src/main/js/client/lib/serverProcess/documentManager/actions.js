// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : FA : #7328 : 02/08/2017 : Fix closing vima when default workspace is unknown
//  or invalid
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess +
//  replace old IPC productLog
// VERSION : 1.1.2 : FA : #7774 : 19/09/2017 : Add some TODO test in documentManager
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8084 : 08/12/2017 : Timebar doesn't implement requirement 0790 as
//  specified // La largeur par defaut de la fenetre de visualisation est stockee dans le workspace
// VERSION : 2.0.0 : FA : ISIS-FT-2265 : 27/02/2018 : link presentational component to redux
// VERSION : 2.0.0 : FA : ISIS-FT-2265 : 27/02/2018 : fix a few regressions in tests
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import _get from 'lodash/get';
import jsonexport from 'jsonexport';

import { dirname, basename } from 'path';

import {
  LOG_DOCUMENT_OPEN,
  MIME_TYPES,
} from 'constants';
import getLogger from 'common/logManager';
import parameters from 'common/configurationManager';

import {
  updatePath as updateWorkspacePath,
  isWorkspaceOpening,
  closeWorkspace,
  setWorkspaceModified,
  sendProductLog,
} from 'store/actions/hsc';

import simple from 'store/helpers/simpleActionCreator';
import { add as addMessage } from 'store/actions/messages';
import * as types from 'store/types';

import { getView } from 'store/reducers/views';
import {
  setModified as setViewModified,
  setViewOid,
  updatePath as updateViewPath,
  updateAbsolutePath as updateViewAbsolutePath,
} from 'store/actions/views';
import { getViewWithConfiguration, getViewModule } from 'viewManager';
import {
  setModified as setPageModified,
  setPageOid,
  updatePath as updatePagePath,
  updateAbsolutePath as updatePageAbsolutePath,
} from 'store/actions/pages';

import { getSession } from 'store/reducers/sessions';
import { getFirstTimebarId } from 'store/reducers/timebars';
import { readWorkspacePagesAndViews } from './readWorkspace';

import { readPageAndViews } from './readPage';
import { writeWorkspace } from './writeWorkspace';
import { writePage } from './writePage';
import { writeView } from './writeView';
import { exportData } from './io';
import { parseIntoCsv } from './parseIntoCsv';

import readView from './readView';

const addGlobalError = msg => addMessage('global', 'danger', msg);

const reload = simple(types.WS_VIEW_RELOAD, 'viewId', 'view');

export const reloadView = viewId => (dispatch, getState) => {
  const { absolutePath } = getView(getState(), { viewId });
  readView.simpleReadView({ absolutePath }, (err, view) => {
    if (err || view.error) {
      return dispatch(addMessage(
        viewId,
        'danger',
        'Invalid View file selected'
      ));
    }

    dispatch(reload(viewId, _.set('uuid', viewId, view.value)));
    return dispatch(addMessage(
      viewId,
      'success',
      'View reloaded'
    ));
  });
};

// --- open a view ---------------------------------------------------------- //
export const openView = (viewInfo, pageId) => (dispatch) => {
  readView.simpleReadView(viewInfo, (ignoredErr, view) => {
    if (view.error) {
      dispatch(addGlobalError(view.error));
      return;
    }

    const updatedViewContent = view.value;

    if (updatedViewContent.isModified && updatedViewContent.absolutePath) {
      delete updatedViewContent.absolutePath;
    }

    dispatch({
      type: types.WS_VIEW_OPENED,
      payload: { view: updatedViewContent, pageId },
    });
    dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'view', view.value.absolutePath));
  });
};
// -------------------------------------------------------------------------- //

// --- open a page ---------------------------------------------------------- //
export const openPage = pageInfo => (dispatch, getState) => {
  readPageAndViews(pageInfo, (err, documents) => {
    const keepErrors = _.pipe(_.filter(_.has('error')), _.map('error'));
    const keepValues = _.pipe(_.filter(_.has('value')), _.map('value'));
    const { views, pages } = documents;

    const errors = _.compact([err, ...keepErrors(views), ...keepErrors(pages)]);
    if (!_.isEmpty(errors)) {
      dispatch(addGlobalError(errors));
    }
    if (documents.pages[0].error) {
      return;
    }
    const page = documents.pages[0].value;
    const firstTimebarId = getFirstTimebarId(getState());
    const updatedPage = {
      ...page,
      timebarUuid: firstTimebarId,
    };

    if (updatedPage.isModified && updatedPage.absolutePath) {
      delete updatedPage.absolutePath;
    }

    dispatch({
      type: types.WS_PAGE_OPENED,
      payload: {
        windowId: page.windowId,
        views: keepValues(views),
        page: updatedPage,
      },
    });

    const path = page.absolutePath || page.path || page.oId;
    dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'page', path));
  });
};
// -------------------------------------------------------------------------- //

// --- open a workspace ----------------------------------------------------- //
const logger = getLogger('documentManager:openWorkspace');
const logLoadedDocumentsCount = (documents) => {
  const count = {
    w: _.size(documents.windows),
    p: _.size(documents.pages),
    v: _.size(documents.views),
  };
  logger.info(`${count.w} windows, ${count.p} pages, ${count.v} views`);
};

const prepareTimebar = (timelines, state) => (timebar) => {
  if (!timebar.masterId) {
    return timebar;
  }
  const masterTimeline = _.find(['id', timebar.masterId], timelines);
  if (!masterTimeline) {
    return timebar;
  }
  const session = getSession(state, { sessionName: masterTimeline.sessionName });
  if (!session) {
    return timebar;
  }
  const current = session.timestamp.ms;
  const lower = current - parameters.get('VISU_WINDOW_LOW_MS');
  const upper = current + parameters.get('VISU_WINDOW_UP_MS');
  return {
    ...timebar,
    visuWindow: {
      current: _get(timebar, 'visuWindow.current', current),
      lower: _get(timebar, 'visuWindow.lower', lower),
      upper: _get(timebar, 'visuWindow.upper', upper),
      defaultWidth: _get(
        timebar,
        'visuWindow.defaultWidth',
        parameters.get('VISU_WINDOW_DEFAULT_WIDTH')
      ),
      // if any of current, lower or upper is defined, then window was saved
      saved: _get(timebar, 'visuWindow.current', false) && true,
    },
    slideWindow: { lower, upper },
    rulerStart: Number(lower) - (5 * 60000),
  };
};

export const openWorkspace = (workspaceInfo, cb = _.noop) => (dispatch, getState) => {
  const path = workspaceInfo.absolutePath;
  dispatch(isWorkspaceOpening(true));
  readWorkspacePagesAndViews(workspaceInfo, (err, documents = {}) => {
    const keepErrors = _.pipe(_.filter(_.has('error')), _.map('error'));
    const keepValues = _.pipe(_.filter(_.has('value')), _.map('value'));
    const { views, pages } = documents;
    const errors = _.compact([err, ...keepErrors(views), ...keepErrors(pages)]);
    if (!_.isEmpty(errors)) {
      setImmediate(() => { // TODO : find why store is not synced at this point
        dispatch(addGlobalError(errors));
      });
    }
    if (err) {
      cb(errors);
      dispatch(isWorkspaceOpening(false));
      return;
    }

    dispatch(closeWorkspace());
    const payload = {
      ...documents,
      views: keepValues(documents.views),
      pages: keepValues(documents.pages),
      timebars: documents.timebars.map(prepareTimebar(documents.timelines, getState())),
    };
    dispatch({ type: types.WS_WORKSPACE_OPENED, payload });

    logLoadedDocumentsCount(documents);
    dispatch(sendProductLog(LOG_DOCUMENT_OPEN, 'workspace', path));

    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    cb(null);
    dispatch(isWorkspaceOpening(false));
  });
};
// -------------------------------------------------------------------------- //

// --- save a page ---------------------------------------------------------- //
export const savePage = (pageId, path) => (dispatch, getState) => { // TODO test this function
  writePage(getState(), pageId, path, (err, oid) => {
    if (err) {
      dispatch(addMessage(pageId, 'danger', err));
      return;
    }
    if (oid) {
      dispatch(setPageOid(pageId, oid));
    }
    dispatch(updatePagePath(pageId, path));
    dispatch(updatePageAbsolutePath(pageId, path));
    dispatch(setPageModified(pageId, false));
    dispatch(addMessage('global', 'success', 'Page saved'));
  });
};
// -------------------------------------------------------------------------- //

// --- save a view ---------------------------------------------------------- //
export const saveView = (viewId, path, cb = _.noop) => (dispatch, getState) => { // TODO test this function
  const view = getViewWithConfiguration(getState(), { viewId });
  writeView(view, path, (err, oid) => {
    if (err) {
      dispatch(addMessage(viewId, 'danger', err));
      cb(err);
      return;
    }
    if (oid) {
      dispatch(setViewOid(viewId, oid));
    }
    dispatch(updateViewPath(viewId, path));
    dispatch(updateViewAbsolutePath(viewId, path));
    dispatch(setViewModified(viewId, false));
    dispatch(addMessage(viewId, 'success', 'View saved'));
    cb(null, 'saved');
  });
};

export const saveViewAsModel = (viewId, path) => (dispatch, getState) => { // TODO test this function
  const view = getViewWithConfiguration(getState(), { viewId });
  const viewToSave = getViewModule(view.type).prepareViewForModel(view);
  writeView(viewToSave, path, (errSaving) => {
    if (errSaving) {
      dispatch(addMessage(viewId, 'danger', `Model unsaved ${errSaving}`));
    } else {
      dispatch(addMessage(viewId, 'success', 'Model saved'));
    }
  });
};

export const exportAsCsv = (viewId, path) => (dispatch, getState) => {
  const state = getState();
  const content = parseIntoCsv(state, viewId);

  const exportCsv = (c) => {
    exportData(c, MIME_TYPES.CommaSeparatedValues, path, (errSaving) => {
      if (errSaving) {
        dispatch(addMessage(viewId, 'danger', `Data unsaved ${errSaving}`));
      } else {
        dispatch(addMessage(viewId, 'success', 'Data saved'));
      }
    });
  };

  if (typeof content === 'string') {
    exportCsv(content);
  } else {
    // provides a generic json to csv parser in case the returned value is not a csv string
    jsonexport(content, (err, csv) => {
      if (err) {
        dispatch(addMessage(viewId, 'danger', `Data unsaved ${err}`));
        return;
      }

      exportCsv(csv);
    });
  }
};

export const exportAsImage = (viewId, path, imagedata) => (dispatch) => {
  const content = imagedata.replace(/^data:image\/\w+;base64,/, '');
  exportData(content, MIME_TYPES.PortableNetworkGraphics, path, (errSaving) => {
    if (errSaving) {
      dispatch(addMessage(viewId, 'danger', `Image unsaved: ${errSaving}`));
    } else {
      dispatch(addMessage(viewId, 'success', 'Image saved'));
    }
  });
};

export const exportAsImageHasFailed = (viewId, errorMessage) => (dispatch) => {
  dispatch(addMessage(viewId, 'danger', `Image unsaved: ${errorMessage}`));
};

// --- save a workspace ----------------------------------------------------------//
export const saveWorkspace = path => (dispatch, getState) => { // TODO test this function
  writeWorkspace(getState(), path, (err) => {
    if (err) {
      dispatch(addMessage('global', 'danger', err));
      return;
    }
    dispatch(updateWorkspacePath(dirname(path), basename(path)));
    dispatch(setWorkspaceModified(false));
    dispatch(addMessage('global', 'success', 'Workspace saved'));
  });
};
// -------------------------------------------------------------------------------//
