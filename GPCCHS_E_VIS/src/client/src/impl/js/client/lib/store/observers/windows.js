import _ from 'lodash';
import { BrowserWindow } from 'electron';

import * as constants from '../../constants';
import parameters from '../../common/parameters';
import debug from '../../common/debug/mainDebug';
import { remove } from '../actions/windows';
import { getStore } from '../mainStore';
import { getStatus as getAppStatus } from '../selectors/hsc';

const logger = debug('store:observers:windows');

const windows = {};

export function open(data, windowId) {
  logger.info(`opening window ${windowId}`);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.w,
    height: data.geometry.h,
    title: `${data.title} - VIMA`,
  });

  window.parameters = parameters;

  // persist windowId on BrowserWindow instance
  window.windowId = windowId; // eslint-disable-line no-param-reassign

  // prevent garbage collection
  windows[windowId] = window;

  if (process.env.NODE_ENV === 'production') {
    window.loadURL(`file://${__dirname}/lib/windowProcess/index.html?windowId=${windowId}`);
  } else {
    window.loadURL(`file://${__dirname}/../../windowProcess/index.html?windowId=${windowId}`);
  }


  window.webContents.on('did-finish-load', () => {
    window.show();
    window.focus();
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    getStore().dispatch(remove(windowId));
  });

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

export function close(windowId) {
  logger.info('closing window', windowId);
  windows[windowId].destroy();
}

export default function windowsObserver(state, dispatch, previousState) {
  if (getAppStatus(state) !== constants.LIFECYCLE_STARTED) {
    return undefined;
  }

  const list = state.windows;
  const inStore = Object.keys(list);
  const opened = Object.keys(windows);
  const toOpen = _.difference(inStore, opened);
  const toClose = _.difference(opened, inStore);
  toOpen.forEach(windowId => open(list[windowId], windowId));
  toClose.forEach(windowId => close(windowId));
}
