import path from 'path';
import { getModifiedPagesIds } from '../../store/reducers/pages';
import { getModifiedViewsIds } from '../../store/reducers/views';
import { getWorkspaceFile, getWorkspaceFolder, getWorkspaceIsModified } from '../../store/reducers/hsc';
import { getStore } from '../store';
import { updatePath, setWorkspaceModified } from '../../store/actions/hsc';
import { add as addMessage } from '../../store/actions/messages';
import { getPathByFilePicker } from '../dialog';
import { saveWorkspace } from '../../documentManager';

module.exports = { workspaceSave, workspaceSaveAs };
const addGlobalError = msg => addMessage('global', 'danger', msg);

const hasNoWindowsFocused = (focusedWindow) => {
  const { dispatch } = getStore();
  if (!focusedWindow) {
    dispatch(addGlobalError('Saving failed : no window focused'));
    return true;
  }
  return false;
};

const hasAlreadySaved = () => {
  const { dispatch, getState } = getStore();
  const state = getState();
  if (!getWorkspaceIsModified(state)) {
    dispatch(addMessage('global', 'info', 'The workspace is already saved'));
    return true;
  }
  return false;
};

const hasUnsavedPages = () => {
  const { dispatch, getState } = getStore();
  const state = getState();
  if (getModifiedPagesIds(state).length > 0 || getModifiedViewsIds(state).length > 0) {
    dispatch(addGlobalError('Please, save the pages and views of this workspace'));
    return true;
  }
  return false;
};

const saveWorkspaceByFilePicker = () => {
  const { dispatch, getState } = getStore();
  const state = getState();
  const oldFolder = getWorkspaceFolder(state);
  const file = getWorkspaceFile(state);
  getPathByFilePicker(oldFolder, 'Workspace', 'save', (err, newWsPath) => {
    dispatch(updatePath(path.dirname(newWsPath), path.basename(newWsPath)));
    saveFile((errSaving) => {
      if (errSaving) {
        dispatch(updatePath(oldFolder, file));
        return dispatch(addGlobalError(errSaving));
      }
      return dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
    });
  });
};

function workspaceSave(focusedWindow) {
  if (hasNoWindowsFocused(focusedWindow) || hasAlreadySaved() || hasUnsavedPages()) {
    return;
  }
  const { dispatch, getState } = getStore();
  const file = getWorkspaceFile(getState());
  if (!file) {
    saveWorkspaceByFilePicker();
  } else {
    saveFile((errSaving) => {
      if (errSaving) {
        return dispatch(addGlobalError(errSaving));
      }
      return dispatch(addMessage('global', 'success', 'Workspace successfully saved'));
    });
  }
}

function workspaceSaveAs(focusedWindow) {
  if (hasNoWindowsFocused(focusedWindow) || hasUnsavedPages()) {
    return;
  }
  saveWorkspaceByFilePicker();
}

function saveFile(callback) {
  saveWorkspace(getStore().getState(), (errWin) => {
    if (errWin) {
      callback(errWin);
      return;
    }
    getStore().dispatch(setWorkspaceModified(false));
    callback(null);
  });
}
