// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8084 : 08/12/2017 : Timebar doesn't implement requirement 0790 as
//  specified // La largeur par defaut de la fenetre de visualisation est stockee dans le workspace
// VERSION : 2.0.0 : FA : ISIS-FT-2265 : 27/02/2018 : link presentational component to redux
// VERSION : 2.0.0 : FA : ISIS-FT-2913 : 06/04/2018 : Remove oid for workspace .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { join, dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from 'constants';

import { getWindows } from 'store/reducers/windows';
import { getPage } from 'store/reducers/pages';
import { getTimebars, getTimebarId } from 'store/reducers/timebars';
import { getTimebarTimelines } from 'store/reducers/timebarTimelines';
import { getTimeline } from 'store/reducers/timelines';
import {
  getWorkspaceFile,
  getWorkspaceFolder,
  getDomainName,
  getSessionName,
} from 'store/reducers/hsc';

import { createFolder } from 'common/fs';
import ipc from '../ipc';
import validation from './validation';
import { writeDocument } from './io';

const getPageLocation = ({ path, absolutePath }) => ({ path: absolutePath || path });

const prepareWindows = state => _.map(win => ({
  type: 'documentWindow',
  title: win.title,
  geometry: win.geometry,
  pages: win.pages.map((pageId) => {
    const page = getPage(state, { pageId });
    const pageLocation = getPageLocation(page);
    const { timebarUuid } = page;
    return {
      ...pageLocation,
      timebarId: getTimebarId(state, { timebarUuid }),
    };
  }),
}), getWindows(state));

const prepareTimebars = state => _.map((timebar) => {
  const cursors = !timebar.visuWindow.saved ? {} : {
    current: timebar.visuWindow.current,
    lower: timebar.visuWindow.lower,
    upper: timebar.visuWindow.upper,
  };
  return {
    id: timebar.id,
    type: 'timeBarConfiguration',
    rulerResolution: timebar.rulerResolution,
    speed: timebar.speed,
    masterId: timebar.masterId,
    mode: timebar.mode,
    visuWindow: {
      defaultWidth: timebar.visuWindow.defaultWidth,
      ...cursors,
    },
    timelines: _.map((timelineUuid) => {
      const timeline = getTimeline(state, { timelineUuid });
      return _.omit('uuid', timeline);
    }, getTimebarTimelines(state, { timebarUuid: timebar.uuid })),
  };
}, getTimebars(state));

const prepareWorkspace = state => ({
  type: 'WorkSpace',
  windows: prepareWindows(state),
  timebars: prepareTimebars(state),
  sessionName: getSessionName(state),
  domainName: getDomainName(state),
});

const writeWorkspaceAs = (state, path, callback) => {
  createFolder(dirname(path), (errFolderCreation) => {
    if (errFolderCreation) {
      return callback(errFolderCreation);
    }

    const workspace = prepareWorkspace(state, path);
    // validation
    const validationError = validation('workspace', workspace);
    if (validationError) {
      return callback(validationError);
    }
    // save file
    return writeDocument(path, workspace, (err) => {
      if (err) {
        return callback(err);
      }
      ipc.dc.sendProductLog(LOG_DOCUMENT_SAVE, 'workspace', path);
      return callback(null);
    });
  });
};

const writeWorkspace = (state, filePath, callback) => {
  let path;
  if (!filePath || filePath === '') {
    const file = getWorkspaceFile(state);
    const folder = getWorkspaceFolder(state);
    if (!file || !folder) {
      return callback(new Error('Unable to get path for saving workspace'));
    }
    path = join(folder, file);
  } else {
    path = filePath;
  }
  return writeWorkspaceAs(state, path, callback);
};

export default {
  writeWorkspace,
  writeWorkspaceAs,
};
