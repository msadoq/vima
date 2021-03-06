// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Move documentManager in serverProcess .
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2913 : 06/04/2018 : Add path to page instead of oid
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { dirname } from 'path';
import { LOG_DOCUMENT_SAVE } from 'constants';

import { createFolder } from 'common/fs';
import { getPage, getPageAbsolutePath } from 'store/reducers/pages';
import { getView } from 'store/reducers/views';
import ipc from '../ipc';

import { writeDocument } from './io';
import validation from './validation';

const preparePage = (state, page) => ({
  type: 'Page',
  timebarHeight: page.timebarHeight,
  timebarCollapsed: page.timebarCollapsed,
  title: page.title,
  sessionName: page.sessionName,
  domainName: page.domainName,
  views: page.views.map((viewId) => {
    const { absolutePath } = getView(state, { viewId });
    const viewLocation = { path: absolutePath };
    const geometry = _.find(_.propEq('i', viewId), page.layout);
    return {
      ...viewLocation,
      geometry: _.unset('i', geometry),
      hideBorders: page.hideBorders ? page.hideBorders : false,
      windowState: page.windowState ? page.windowState : 'Normalized',
    };
  }),
});

/**
 * Save plot view from state to file
 *
 * @param state
 * @param pageId
 * @param path
 * @param callback
 */
const writePageAs = (state, pageId, path, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback(new Error('unknown page'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    const savedPage = preparePage(state, page);
    const validationError = validation('page', savedPage);
    if (validationError) {
      callback(validationError);
      return;
    }
    writeDocument(path, savedPage, (errfs, oid) => {
      if (errfs) {
        callback(errfs);
        return;
      }
      ipc.dc.sendProductLog(LOG_DOCUMENT_SAVE, 'page', path);
      callback(null, oid);
    });
  });
};
/**
 * Save page from state to file
 *
 * @param state
 * @param pageId
 * @param path
 * @param callback
 */
const writePage = (state, pageId, path, callback) => {
  const page = getPage(state, { pageId });
  if (!page) {
    callback(new Error('Unknown page'));
  }
  const absolutePath = path || getPageAbsolutePath(state, { pageId });
  if (!absolutePath) {
    return callback(new Error('Unknown path for saving the page'));
  }
  return writePageAs(state, pageId, absolutePath, callback);
};


export default {
  writePage,
  writePageAs,
};
