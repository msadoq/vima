import constants from '../../../constants';

import handle from '../../../common/ipc/handle';
import reply from '../../../common/ipc/reply';

import onReduxCurrentState from './onReduxCurrentState';
import onReduxDispatch from './onReduxDispatch';
import onGetSessionTime from './onGetSessionTime';
import onReloadSessions from './onReloadSessions';
import onReloadView from './onReloadView';
import onSaveView from './onSaveView';
import onSavePage from './onSavePage';
import onCreateModel from './onCreateModel';
import onServerDebug from './onServerDebug';
import onOpenView from './onOpenView';
import onOpenPage from './onOpenPage';
import onOpenWorkspace from './onOpenWorkspace';
import onOpenInspector from './onOpenInspector';
import onResolveLink from './onResolveLink';
import onOpenWikiHelper from './onOpenWikiHelper';
import onGetRteDomains from './onGetRteDomains';
import onGetRteCatalogs from './onGetRteCatalogs';
import onGetRteItemNames from './onGetRteItemNames';
import onOpenRteItem from './onOpenRteItem';

const controller = {
  [constants.IPC_METHOD_REDUX_CURRENT_STATE]: (...args) => onReduxCurrentState(reply, ...args),
  [constants.IPC_METHOD_REDUX_DISPATCH]: onReduxDispatch,
  [constants.IPC_METHOD_SESSION_TIME]: onGetSessionTime,
  [constants.IPC_METHOD_RELOAD_SESSIONS]: onReloadSessions,
  [constants.IPC_METHOD_RELOAD_VIEW]: onReloadView,
  [constants.IPC_METHOD_SAVE_VIEW]: onSaveView,
  [constants.IPC_METHOD_SAVE_PAGE]: onSavePage,
  [constants.IPC_METHOD_CREATE_MODEL]: onCreateModel,
  [constants.IPC_METHOD_SERVER_DEBUG]: onServerDebug,
  [constants.IPC_METHOD_OPEN_VIEW]: onOpenView,
  [constants.IPC_METHOD_OPEN_PAGE]: onOpenPage,
  [constants.IPC_METHOD_OPEN_WORKSPACE]: onOpenWorkspace,
  [constants.IPC_METHOD_OPEN_INSPECTOR]: onOpenInspector,
  [constants.IPC_METHOD_RESOLVE_LINK]: onResolveLink,
  [constants.IPC_METHOD_WIKI_HELPER]: onOpenWikiHelper,
  [constants.IPC_METHOD_GET_RTE_DOMAINS]: onGetRteDomains,
  [constants.IPC_METHOD_GET_RTE_CATALOGS]: onGetRteCatalogs,
  [constants.IPC_METHOD_GET_RTE_ITEM_NAMES]: onGetRteItemNames,
  [constants.IPC_METHOD_OPEN_RTE_ITEM]: onOpenRteItem,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response)
);
