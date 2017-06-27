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
  SERVER_PROCESS_LAUNCHING_TIMEOUT,
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
import { getIsWorkspaceOpening } from '../store/actions/hsc';
import setMenu from './menuManager';
import { openWorkspace, openBlankWorkspace } from '../documentManager';
import { start as startOrchestration, stop as stopOrchestration } from './orchestration';
import { splashScreen, codeEditor, windows } from './windowsManager';
import makeWindowsObserver from './windowsManager/observer';

const logger = getLogger('main:index');

function scheduleTimeout(delay, message) {
  let timeout = setTimeout(() => {
    logger.error(`Timeout during application launching (task: ${message})`);
    timeout = null;
    app.quit();
  }, delay);

  return () => timeout !== null && clearTimeout(timeout);
}

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
    function openSplashScreen(callback) {
      splashScreen.open(callback);
    },
    function launchDcStub(callback) {
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
          env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()) }),
        },
        null,
        callback
      );
    },
    function launchServer(callback) {
      // ipc with server
      const onMessage = data => serverController(get(CHILD_PROCESS_SERVER), data);

      // on server is ready callback
      const cancelTimeout = scheduleTimeout(SERVER_PROCESS_LAUNCHING_TIMEOUT, 'server');
      const onServerReady = (err, { initialState }) => {
        cancelTimeout();

        if (err) {
          callback(err);
          return;
        }

        splashScreen.setMessage('loading application state...');
        logger.info('loading application state...');

        // init Redux store in main process
        const store = makeCreateStore('main', get('DEBUG') === 'on')(initialState);
        store.subscribe(makeWindowsObserver(store));

        callback(null);
      };

      if (process.env.IS_BUNDLED === 'on') {
        splashScreen.setMessage('starting data server process...');
        logger.info('starting data server process...');

        fork(
          CHILD_PROCESS_SERVER,
          `${parameters.get('path')}/server.js`,
          {
            execPath: parameters.get('NODE_PATH'),
            env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()) }),
          },
          onMessage,
          onServerReady
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
            env: ({ mainProcessConfig: JSON.stringify(parameters.getAll()) }),
          },
          onMessage,
          onServerReady
        );
      }
    },
    function initRtdClient(callback) {
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
    function openInitialWorkspace(callback) {
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
    // TODO dbrugne move in server lifecycle ========================================
    startOrchestration();
    // TODO dbrugne move in server lifecycle ========================================
  });
}

export function onStop() {
  server.sendProductLog(LOG_APPLICATION_STOP);
  logger.info('stopping application');

  // TODO dbrugne move in server lifecycle ========================================
  // stop orchestration
  stopOrchestration();
  // TODO dbrugne move in server lifecycle ========================================

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
