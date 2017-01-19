/* eslint no-underscore-dangle: 0 */
import { dirname } from 'path';
import _cloneDeep from 'lodash/cloneDeep';
import { checkPath } from '../common/fs';
import _omit from 'lodash/omit';
import _values from 'lodash/values';
import _each from 'lodash/each';
import { productLog } from 'common/log';
import {
  DATASTRUCTURETYPE_RANGE,
  LOG_DOCUMENT_SAVE
} from 'common/constants';
import { writeJson } from '../common/fmd';
import vivl from '../../VIVL/main';

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @param path
 * @param callback
 * @returns Error or undefined
 */
function saveViewAs(viewConfiguration, viewType, path, callback) {
  if (!viewConfiguration) {
    return callback('Unknown view');
  }
  // TODO add case with new FMD path -> createDocument par DC
  checkPath(dirname(path)).then(() => {
    let view = _cloneDeep(viewConfiguration);
    const structureType = vivl(viewType, 'structureType')();
    switch (structureType) { // eslint-disable-line default-case
      case DATASTRUCTURETYPE_RANGE: {
        view.axes = _values(view.axes);
        break;
      }
    }
    // Remove entry point id
    _each(view.entryPoints, (value, index, entryPoints) => {
      entryPoints[index] = _omit(value, 'id'); // eslint-disable-line no-param-reassign
    });

    // Case of DynamicView
    if (view.type === 'DynamicView' && view.entryPoints.length) {
      view.entryPoint = _omit(view.entryPoints[0], 'name');
      view = _omit(view, 'entryPoints');
    }

    writeJson(path, view, (errWrite) => {
      if (errWrite) {
        return callback(`Unable to save view ${view.title} in file ${path}`);
      }
      productLog(LOG_DOCUMENT_SAVE, 'view', path);
      return callback(null);
    });
  })
  .catch(err => callback(err));
}

/**
 * Save view from state to file
 *
 * @param state
 * @param viewId
 * @param callback
 * @returns Error or undefined
 */
function saveView(state, viewId, callback) {
  if (!state.views[viewId]) {
    return callback('Unknown view id');
  }
  if (!state.views[viewId].isModified) {
    return callback(null);
  }
  const absPath = state.views[viewId].absolutePath ? state.views[viewId].absolutePath
                                                   : state.views[viewId].oId;
  if (!absPath) {
    return callback('Unknown path for saving text view');
  }
  return saveViewAs(state.views[viewId].configuration, state.views[viewId].type, absPath, callback);
}

export default {
  saveViewAs,
  saveView
};