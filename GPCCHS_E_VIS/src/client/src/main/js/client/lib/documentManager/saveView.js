import { dirname } from 'path';
import _omit from 'lodash/fp/omit';
import _isArray from 'lodash/fp/isArray';
import _cloneDeep from 'lodash/cloneDeep';
import { LOG_DOCUMENT_SAVE } from 'common/constants';

import { server } from '../mainProcess/ipc';
import validation from './validation';
import { createFolder } from '../common/fs';
import { writeDocument } from './io';
import { isViewTypeSupported, getSchema, getViewModule } from '../viewManager';
import { getView, getViewAbsolutePath, getViewConfiguration, getViewType } from '../store/reducers/views';

const saveViewAs = (viewConfiguration, viewType, path, callback) => {
  if (!viewConfiguration) {
    callback(new Error('Empty view configuration'));
    return;
  }
  createFolder(dirname(path), (err) => {
    if (err) {
      callback(err);
      return;
    }
    if (!isViewTypeSupported(viewType)) {
      callback(new Error(`Invalid view type '${viewType}'`), viewConfiguration);
      return;
    }

    const configurationToSave = _cloneDeep(viewConfiguration);

    // Remove entry point id
    if (_isArray(configurationToSave.entryPoints)) {
      configurationToSave.entryPoints = configurationToSave.entryPoints.map(_omit('id'));
    }

    const configuration = getViewModule(viewType)
      .prepareConfigurationForFile(
        _cloneDeep(configurationToSave)
      );

    const schema = getSchema(viewType);
    const validationError = validation(viewType, configuration, schema);
    if (validationError) {
      callback(validationError);
      return;
    }

    writeDocument(path, configuration, (errWrite, oId) => {
      if (errWrite) {
        callback(errWrite);
        return;
      }
      server.sendProductLog(LOG_DOCUMENT_SAVE, 'view', path);
      callback(null, oId);
    });
  });
};

const saveView = (state, viewId, callback) => {
  const view = getView(state, { viewId });
  if (!view) {
    callback(new Error('Unknown view'));
    return;
  }
  const absolutePath = getViewAbsolutePath(state, { viewId });
  const configuration = getViewConfiguration(state, { viewId });
  const type = getViewType(state, { viewId });
  if (!absolutePath) {
    callback(new Error('Unknown path for saving text view'));
    return;
  }
  saveViewAs(
    configuration, type, absolutePath, callback
  );
};

export default {
  saveViewAs,
  saveView,
};
