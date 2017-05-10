/* eslint no-underscore-dangle: 0 */
import _ from 'lodash/fp';
import _each from 'lodash/each';
import _cloneDeep from 'lodash/cloneDeep';
import { join, dirname, relative } from 'path';
import { LOG_DOCUMENT_SAVE } from 'common/constants';

import { getWindows } from '../store/reducers/windows';
import { getPage } from '../store/reducers/pages';
import { getTimebars, getTimebarId } from '../store/reducers/timebars';
import { getTimebarTimelines } from '../store/reducers/timebarTimelines';
import { getTimeline } from '../store/reducers/timelines';
import {
  getWorkspaceFile,
  getWorkspaceFolder,
  getDomainName,
  getSessionName,
} from '../store/reducers/hsc';

import validation from './validation';
import { server } from '../mainProcess/ipc';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';

const saveWorkspaceAs = (state, path, callback) => {
  createFolder(dirname(path), (errFolderCreation) => {
    if (errFolderCreation) {
      callback(errFolderCreation);
      return;
    }
    const workspace = {
      type: 'WorkSpace',
      windows: [],
      timebars: [],
      sessionName: getSessionName(state),
      domainName: getDomainName(state),
    };

    // windows
    const windows = getWindows(state);
    _each(windows, (win) => {
      const current = {
        type: 'documentWindow',
        pages: [],
        title: win.title,
        geometry: win.geometry,
      };
      // pages
      win.pages.forEach((pageId) => {
        const currentPage = getPage(state, { pageId });
        if (!currentPage) {
          callback('Page Id is missing');
          return;
        }
        const page = {};
        if (currentPage.oId) {
          page.oId = currentPage.oId;
        } else if (currentPage.path) {
          page.path = currentPage.path;
        } else if (currentPage.absolutePath) {
          page.path = relative(dirname(path), currentPage.absolutePath);
        } else {
          callback(new Error('Unsaved page: no path or oId'));
          return;
        }
        const { timebarUuid } = currentPage;
        page.timebarId = getTimebarId(state, { timebarUuid });
        current.pages.push(page);
      });
      workspace.windows.push(current);
    });
    // timebars
    _each(getTimebars(state), (timebar, timebarUuid) => {
      const tb = {
        id: timebar.id,
        rulerResolution: timebar.rulerResolution,
        speed: timebar.speed,
        masterId: timebar.masterId,
        mode: timebar.mode,
        type: 'timeBarConfiguration',
        timelines: [],
      };
      const timebarTimelines = getTimebarTimelines(state, { timebarUuid });
      _each(timebarTimelines, (timelineUuid) => {
        const timeline = getTimeline(state, { timelineUuid });
        if (!timeline) {
          callback(new Error('timelines missing'));
          return;
        }
        tb.timelines.push(_cloneDeep(_.omit('uuid', timeline)));
      });
      if (tb.masterId === null) {
        delete tb.masterId;
      }
      workspace.timebars.push(_.omit('uuid', tb));
    });
    // validation
    const validationError = validation('workspace', workspace);
    if (validationError) {
      callback(validationError);
      return;
    }
    // save file
    writeDocument(path, workspace, (err) => {
      if (err) {
        callback(err);
        return;
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'workspace', path);
      callback(null);
    });
  });
};

const saveWorkspace = (state, callback) => {
  const file = getWorkspaceFile(state);
  const folder = getWorkspaceFolder(state);
  if (!file || !folder) {
    return new Error('Unable to get path for saving workspace');
  }
  return saveWorkspaceAs(
    state,
    join(folder, file),
    callback
  );
};

export default {
  saveWorkspace,
  saveWorkspaceAs,
};
