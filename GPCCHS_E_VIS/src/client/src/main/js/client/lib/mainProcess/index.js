import { app, ipcMain } from 'electron';
import { series } from 'async';
import path from 'path';
import { connect as createRtd } from 'rtd/catalogs';

import getLogger from '../common/logManager';
import parameters from '../common/configurationManager';
import {
  CHILD_PROCESS_SERVER,
  CHILD_PROCESS_DC,
  LOG_APPLICATION_STOP,
  LOG_APPLICATION_ERROR,
} from '../constants';
import { clear } from '../common/callbacks';
import { setRtd } from '../rtdManager';
import enableDebug from './debug';
import { fork, get, kill } from '../common/processManager';
import makeCreateStore, { getStore } from './store';
import rendererController from './controllers/renderer';
import serverController from './controllers/server';
import { server } from './ipc';
import { add as addMessage } from '../store/actions/messages';
import { getIsWorkspaceOpening, startInPlayMode } from '../store/actions/hsc';
import setMenu from './menuManager';
import { openWorkspace, openBlankWorkspace } from '../documentManager';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';
import { splashScreen, codeEditor, windows } from './windowsManager';

const logger = getLogger('main:index');

// function scheduleTimeout(message) { // TODO implement a timeout for 'ready' message from server
//   let timeout = setTimeout(() => {
//     logger.error(`Timeout while retrieving launching data: ${message}`);
//     timeout = null;
//     app.quit();
//   }, 2500);
//
//   return () => timeout !== null && clearTimeout(timeout);
// }

export function onStart() {
  // electron topbar menu initialization
  setMenu();

  // enable electron debug and DevTools
  // (not installable when bundled and doesn't needed when DEBUG is off)
  if (process.env.IS_BUNDLED !== 'on' && parameters.get('DEBUG') === 'on') {
    enableDebug();
  }

  // mount IPC controller with renderer processes
  ipcMain.on('windowRequest', rendererController);

  series([
    callback => splashScreen.open(callback),
    (callback) => {
      if (parameters.get('STUB_DC_ON') !== 'on') {
        callback(null);
        return;
      }

      splashScreen.setMessage('starting data simulator process...');
      logger.info('starting data simulator process...');
      fork(
        CHILD_PROCESS_DC,
        `${parameters.get('path')}/lib/stubProcess/dc.js`,
        {
          execPath: parameters.get('NODE_PATH'),
          env: parameters.getAll(),
        },
        null,
        callback
      );
    },
    (callback) => {
      if (parameters.get('RTD_ON') === 'on') {
        const socket = parameters.get('RTD_UNIX_SOCKET');
        let stub = false;
        if (parameters.get('STUB_RTD_ON') === 'on') {
          stub = true;
        }
        splashScreen.setMessage('starting data RTD client...');
        logger.info('starting RTD client...');
        createRtd({ socket, stub }, (err, rtd) => {
          if (err) {
            callback(err);
            return;
          }
          setRtd(rtd);
          callback(null);
        });
      } else {
        callback(null);
      }
    },
    (callback) => {
      // ipc with server
      const onMessage = data => serverController(get(CHILD_PROCESS_SERVER), data);

      if (process.env.IS_BUNDLED === 'on') {
        splashScreen.setMessage('starting data server process...');
        logger.info('starting data server process...');

        fork(
          CHILD_PROCESS_SERVER,
          `${parameters.get('path')}/server.js`,
          {
            execPath: parameters.get('NODE_PATH'),
            env: parameters.getAll(),
          },
          onMessage,
          callback
        );
      } else {
        splashScreen.setMessage('starting data server process... (dev)');
        logger.info('starting data server process... (dev)');

        fork(
          CHILD_PROCESS_SERVER,
          `${parameters.get('path')}/lib/serverProcess/index.js`,
          {
            execPath: parameters.get('NODE_PATH'),
            execArgv: ['-r', 'babel-register', '-r', 'babel-polyfill'],
            env: parameters.getAll(),
          },
          onMessage,
          callback
        );
      }
    },
    (callback) => {
      splashScreen.setMessage('loading data store...');
      logger.info('loading data store...');

      server.requestReduxCurrentState(({ state }) => {
        makeCreateStore('main', get('DEBUG') === 'on')(state);
        callback(null);
      });
    },
    (callback) => {
      splashScreen.setMessage('searching workspace...');
      logger.info('searching workspace...');

      const { dispatch } = getStore();
      const root = parameters.get('ISIS_DOCUMENTS_ROOT');

      if (!root) {
        logger.warn('No ISIS_DOCUMENTS_ROOT found');
        dispatch(addMessage('global', 'warning', 'No FMD support'));
        dispatch(openBlankWorkspace({ keepMessages: true }));
        callback(null);
        return;
      }

      const file = parameters.get('WORKSPACE');

      if (!file) {
        splashScreen.setMessage('loading default workspace...');
        logger.info('loading default workspace...');
        dispatch(addMessage('global', 'info', 'No WORKSPACE found'));
        dispatch(openBlankWorkspace({ keepMessages: true }));
        callback(null);
        return;
      }

      const absolutePath = path.join(root, file);

      splashScreen.setMessage(`loading ${file}`);
      logger.info(`loading ${file}`);

      dispatch(openWorkspace({ absolutePath }, (err) => {
        if (err) {
          splashScreen.setMessage('loading default workspace...');
          logger.info('loading default workspace...');
          dispatch(openBlankWorkspace({ keepMessages: true }));
        }
        callback(null);
      }));
    },
  ], (err) => {
    if (err) {
      throw err;
    }

    splashScreen.setMessage('ready!');
    logger.info('ready!');
    startOrchestration();
    // start on play
    if (parameters.get('REALTIME') === 'on') {
      logger.info('Start in playing mode');
      setTimeout(() => {
        getStore().dispatch(startInPlayMode());
      }, 2000);
    }
  });
}

export function onStop() {
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('stopping application');

  // stop orchestration
  stopOrchestration();

  // stop child processes
  kill(CHILD_PROCESS_SERVER);
  kill(CHILD_PROCESS_DC);

  // registered callbacks
  clear();

  // close static windows
  windows.closeAll();
  codeEditor.close();
  splashScreen.close();

  logger.info('application stopped');
}

export function onWindowsClose() {
  const state = getStore().getState();
  if (!getIsWorkspaceOpening(state)) {
    app.quit();
  }
}

export function onError(err) {
  server.sendProductLog(LOG_APPLICATION_ERROR, err.message);
  logger.error('Application error:', err);
  app.exit(1);
}
