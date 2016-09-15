app.commandLine.appendSwitch('no-proxy-server'); // TODO dbrugne : analysis
import debug from './app/utils/debug';
import { app } from 'electron';
import installExtensions from './app/main/installExtensions';
import { initStore, getStore } from './app/store/mainStore';
import { connect, disconnect } from './app/main/websocket';
import { sync as syncWindows } from './app/main/windows';
import loadWorkspace from './app/main/loadWorkspace';

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
}

const logger = debug('main');

let store = null;
let workspaceLoaded = 'not-started';
let storeSubscription = null;

app.on('ready', async () => {
  logger.info('app ready');

  await installExtensions();

  initStore();
  store = getStore();
  storeSubscription = store.subscribe(() => {
    syncWindows();

    if (store.getState().hss.status === 'connected' && workspaceLoaded === 'not-started') {
      workspaceLoaded = 'in-progress';
      loadWorkspace('dev.workspace.json', err => {
        if (err) {
          throw err;
        }

        workspaceLoaded = 'done'; // TODO : flag encapsulated in loadWorkspace
      });
    }
  });

  //connect();
  syncWindows();
});

app.on('window-all-closed', () => app.quit());

app.on('quit', () => {
  logger.info('app quit');

  disconnect();

  if (storeSubscription) {
    storeSubscription();
    storeSubscription = null;
  }
});
