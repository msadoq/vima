import { v4 } from 'node-uuid';
import _map from 'lodash/map';
import path from 'path';
import { getStore } from '../store/mainStore';
import { add, addAndMount as addAndMountPage } from '../store/actions/windows';
import { closeWorkspace } from '../store/actions/workspace';
import { isWorkspaceOpening } from '../store/actions/hsc';
import { addAndMount as addAndMountView } from '../store/actions/pages';
import { add as addView } from '../store/actions/views';
import { extractViews, readViews } from '../documentsManager/extractViews';
import { readPages } from '../documentsManager/extractPages';
import { openDefaultWorkspace, readWkFile } from './openWorkspace';
import getPathByFilePicker from './filePicker';

const { Menu, dialog } = require('electron');

const template = [{
  label: 'Edit',
  submenu: [{
    role: 'undo',
  }, {
    role: 'redo',
  }, {
    type: 'separator',
  }, {
    role: 'cut',
  }, {
    role: 'copy',
  }, {
    role: 'paste',
  }, {
    role: 'pasteandmatchstyle',
  }, {
    role: 'delete',
  }, {
    role: 'selectall',
  }]
}];
template.splice(0, 0,
  {
    label: 'Workspace',
    submenu: [{
      label: 'New ... ',
      accelerator: 'Ctrl+N',
      click() {
        // TODO save doc if needed
        // dialog.showMessageBox({
        //   type: 'info',
        //   title: 'Opening new workspace',
        //   message: 'A new workspace is being opened... valid please',
        //   buttons: ['ok', 'cancel']
        // });
        const folder = getStore().getState().workspace.folder;
        getStore().dispatch(closeWorkspace());
        openDefaultWorkspace(getStore().dispatch, folder);
      }
    }, {
      label: 'Open ... ',
      accelerator: 'Ctrl+O',
      click() {
        // TODO save doc if needed
        // dialog.showMessageBox({
        //   type: 'info',
        //   title: 'Opening new workspace',
        //   message: 'A new workspace is being opened... valid please',
        //   buttons: ['ok', 'cancel']
        // });
        const folder = getStore().getState().workspace.folder;
        // open the file picker
        const filePath = getPathByFilePicker(folder, 'workspace');
        if (filePath) {
          getStore().dispatch(isWorkspaceOpening(true));
          getStore().dispatch(closeWorkspace());
          readWkFile(
            getStore().dispatch,
            getStore().getState,
            path.dirname(filePath),
            path.basename(filePath),
            () => {
              getStore().dispatch(isWorkspaceOpening(false));
            }
          );
        }
      }
    }, {
      label: 'Save ...',
      accelerator: 'Ctrl+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          dialog.showMessageBox({
            type: 'warning',
            message: 'Do you confirm to save ?',
            buttons: ['ok', 'cancel'] });
          // TODO save workspace
        }
      }
    }, {
      label: 'Save as...',
      accelerator: 'Ctrl+Shift+S',
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          dialog.showMessageBox({
            type: 'warning',
            message: 'Do you confirm to save as?',
            buttons: ['ok', 'cancel'] });
          // TODO save workspace
        }
      }
    }, {
      label: 'Quit',
      role: 'quit'
    }]
  });
template.splice(1, 0,
  {
    label: 'Window',
    submenu: [
      {
        label: 'New',
        accelerator: '',
        click() { getStore().dispatch(add(v4(), 'New window')); }
      }, {
        label: 'Reload',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        }
      }, {
        type: 'separator'
      }, {
        label: 'Toggle Developer Tools',
        accelerator: '',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        }
      }, {
        label: 'Actual Size',
        role: 'resetzoom'
      }, {
        label: 'Zoom In',
        role: 'zoomin'
      }, {
        label: 'Zoom Out',
        role: 'zoomout'
      }, {
        type: 'separator'
      }, {
        label: 'Toggle Full Screen',
        role: 'togglefullscreen'
      }, {
        type: 'separator'
      }, {
        label: 'Minimize',
        role: 'minimize'
      }, {
        label: 'Close',
        role: 'close'
      }]
  });
template.splice(2, 0,
  {
    label: 'Page',
    submenu: [{
      label: 'Add',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          getStore().dispatch(addAndMountPage(focusedWindow.windowId, v4()));
        }
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const filepath = getPathByFilePicker(getStore().getState().workspace.folder, 'page');
          openPage(filepath, focusedWindow.windowId);
        }
      }
    }, {
      label: 'Save ...',
      accelerator: '',
      click() {
        // TODO save page
      }
    }]
  });

template.splice(3, 0,
  {
    label: 'View',
    submenu: [{
      label: 'Add PlotView...',
      accelerator: '',
      click(item, focusedWindow) {
        const view = {
          type: 'PlotView',
          configuration: {
            type: 'PlotView',
            axes: [],
            grids: [],
            legend: {},
            markers: [],
            plotBackgroundColour: '3FFFFFF',
            defaultRatio: { length: 5, width: 5 },
            entryPoints: [],
            links: [],
            title: 'New Plot View',
          } };
        addNewView(focusedWindow, view);
      }
    }, {
      label: 'Add TextView...',
      accelerator: '',
      click(item, focusedWindow) {
        const view = {
          type: 'TextView',
          configuration: {
            type: 'TextView',
            content: [],
            defaultRatio: { length: 5, width: 5 },
            entryPoints: [],
            links: [],
            title: 'New Text View',
          } };
        addNewView(focusedWindow, view);
      }
    }, {
      label: 'Open ...',
      accelerator: '',
      click(item, focusedWindow) {
        if (focusedWindow) {
          const state = getStore().getState();
          const filepath = getPathByFilePicker(state.workspace.folder, 'view');
          openView(filepath, state.windows[focusedWindow.windowId].focusedPage);
        }
      }
    }]
  });

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

function openPage(absolutePath, windowId) {
  if (!absolutePath) {
    return;
  }
  const uuid = v4();
  const pageToRead = [{ absolutePath }];
  readPages(undefined, pageToRead, (pageErr, pages) => {
    if (pageErr) {
      // logger.error(pageErr);
      dialog.showMessageBox({
        type: 'error',
        title: 'Error on selected page',
        message: 'Invalid Page\'s file selected',
        buttons: ['ok']
      });
      const filepath = getPathByFilePicker(path.dirname(absolutePath), 'page');
      if (filepath) {
        return openPage(filepath, windowId);
      }
      return;
    }

    const content = { pages: {} };
    content.pages[uuid] = pages[0];
    extractViews(content, (viewErr, pageAndViews) => {
      if (viewErr) {
        // logger.error(viewErr);
        dialog.showMessageBox({
          type: 'error',
          title: 'Error on selected page',
          message: `Invalid views on selected Page ${viewErr}`,
          buttons: ['ok']
        });
        const filepath = getPathByFilePicker(path.dirname(absolutePath), 'page');
        if (filepath) {
          return openPage(filepath, windowId);
        }
        return;
      }
      showSelectedPage(pageAndViews, uuid, windowId);
    });
  });
}


function openView(absolutePath, pageId) {
  if (!absolutePath) {
    return;
  }
  const viewPath = [{ absolutePath }];

  readViews(viewPath, (err, view) => {
    if (err) {
      dialog.showMessageBox({
        type: 'error',
        title: 'Error on selected view',
        message: `Invalid view. ${err}`,
        buttons: ['ok']
      });
      return;
    }
    const current = view[0];
    current.absolutePath = viewPath;
    showSelectedView(current, pageId);
  });
}

function showSelectedPage(pageAndViews, pageId, windowId) {
  const store = getStore();
  const layout = _map(pageAndViews.views, v => ({
    i: v.uuid,
    kind: v.geometry.kind,
    x: v.geometry.x,
    y: v.geometry.y,
    w: v.geometry.w,
    h: v.geometry.h,
  }));
  const viewIds = Object.keys(pageAndViews.views);
  viewIds.forEach((index) => {
    const view = pageAndViews.views[index];
    store.dispatch(addView(index, view.type, view.configuration, view.path, view.oId,
      view.absolutePath, false));
  });
  const page = pageAndViews.pages[pageId];
  page.layout = layout;
  page.views = viewIds;
  store.dispatch(addAndMountPage(windowId, pageId, page));
}


function showSelectedView(view, pageId) {
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
}

function addNewView(focusedWindow, view) {
  const pageId = getStore().getState().windows[focusedWindow.windowId].focusedPage;
  const viewId = v4();
  getStore().dispatch(addAndMountView(pageId, viewId, view, addViewInLayout(pageId, viewId)));
}

function addViewInLayout(pageId, viewId) {
  if (!viewId) {
    return;
  }
  if (!getStore().getState().pages[pageId]) {
    return [{ i: viewId, w: 5, h: 5, x: 0, y: Infinity }];
  }
  return getStore().getState().pages[pageId].layout.concat({
    i: viewId, w: 5, h: 5, x: 0, y: Infinity
  });
}
