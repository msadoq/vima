import _debounce from 'lodash/debounce';
import _difference from 'lodash/difference';
import _each from 'lodash/each';
import { each, series } from 'async';
import { BrowserWindow } from 'electron';
import getLogger from 'common/log';
import parameters from 'common/parameters';

import {
  remove,
  updateGeometry,
  minimize,
  restore,
} from '../store/actions/windows';
import {
  focusWindow,
  blurWindow,
} from '../store/actions/hsc';
import {
  getWindows,
  getWindowsTitle,
} from '../store/selectors/windows';
import { getStore } from '../store/mainStore';

const logger = getLogger('main:windows');

const windows = {};

function getWindowHtmlPath() {
  return `file://${parameters.get('path')}/index.html`;
}

export function open(windowId, title, data, cb) {
  logger.info(`opening window ${windowId}`);
  const window = new BrowserWindow({
    show: false,
    x: data.geometry.x,
    y: data.geometry.y,
    width: data.geometry.w,
    height: data.geometry.h,
    title: `${data.title} - VIMA`,
  });

  // mount module(s) to allow access from renderer process
  window.parameters = parameters;

  // persist windowId on BrowserWindow instance
  window.windowId = windowId; // eslint-disable-line no-param-reassign

  // prevent garbage collection
  windows[windowId] = window;

  const htmlPath = getWindowHtmlPath();
  logger.debug('opening', htmlPath);
  window.loadURL(`${htmlPath}?windowId=${windowId}`);

  // ready-to-show is the right element to subscribe to trigger logic only once by window
  window.on('ready-to-show', () => {
    window.show();
    window.focus();
    return cb(null);
  });

  window.on('closed', () => {
    // trigger garbage collection
    window[windowId] = null;

    // update redux store
    getStore().dispatch(remove(windowId));
  });

  window.on('focus', () => {
    getStore().dispatch(focusWindow(windowId));
  });

  window.on('blur', () => {
    getStore().dispatch(blurWindow(windowId));
  });

  window.on('minimize', () => {
    getStore().dispatch(minimize(windowId));
  });
  window.on('restore', () => {
    getStore().dispatch(restore(windowId));
  });

  const saveGeometry = _debounce((ev) => {
    const b = ev.sender.getBounds();
    getStore().dispatch(updateGeometry(windowId, b.x, b.y, b.width, b.height));
  }, 500);

  window.on('move', saveGeometry);
  window.on('resize', saveGeometry);

  if (process.env.NODE_ENV === 'development') {
    window.openDevTools();
  }
}

export function close(windowId) {
  logger.info('closing window', windowId);
  if (windows[windowId] && !windows[windowId].isDestroyed()) {
    const window = windows[windowId];
    delete windows[windowId];
    setImmediate(() => window.close());
  }
}

export default function windowsObserver(state, callback) {
  const list = getWindows(state);
  const inStore = Object.keys(list);
  const opened = Object.keys(windows);
  const toOpen = _difference(inStore, opened);
  const toClose = _difference(opened, inStore);
  const titles = getWindowsTitle(state);

  series([
    // close
    fn => fn(toClose.forEach(windowId => close(windowId))),
    // open
    fn => each(toOpen, (windowId, cb) => open(windowId, titles[windowId], list[windowId], cb), fn),
    // update titles
    (fn) => {
      _each(windows, (w, windowId) => {
        if (w.isDestroyed() || w.getTitle() === titles[windowId]) {
          return;
        }

        w.setTitle(titles[windowId]);
      });

      return fn(null);
    },
  ], callback);
}
