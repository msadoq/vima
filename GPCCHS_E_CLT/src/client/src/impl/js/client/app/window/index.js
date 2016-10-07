import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import WindowContainer from './Window/WindowContainer';
import WebsocketContainer from './Websocket/WebsocketContainer';
import debug from '../utils/windowDebug';
import { initStore, getStore } from '../store/windowStore';
import { remove } from '../store/actions/hss';
import { disconnect } from '../websocket/windowWebsocket';
import './global.css';
import '../shortcuts.global.css';

const logger = debug('window:index');

const search = global.location.search;
const windowId = search.replace('?windowId=', '');

initStore();

// TODO : factorize in separate module, test to embed in WebsocketContainer
window.addEventListener('beforeunload', () => {
  logger.info('onbeforeunload called');
  disconnect();
  getStore().dispatch(remove(windowId));
});

render(
  <Provider store={getStore()}>
    <WebsocketContainer windowId={windowId}>
      <WindowContainer windowId={windowId} />
    </WebsocketContainer>
  </Provider>,
  document.getElementById('root')
);
