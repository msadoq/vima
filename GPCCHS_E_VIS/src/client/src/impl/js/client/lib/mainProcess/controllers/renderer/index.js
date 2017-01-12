import handle from 'common/ipc/handle';
import globalConstants from 'common/constants';

import onGetSessionTime from './onGetSessionTime';
import onReloadSessions from './onReloadSessions';
import onReloadView from './onReloadView';
import onSaveView from './onSaveView';
import onServerDebug from './onServerDebug';

const controller = {
  [globalConstants.IPC_METHOD_GET_SESSION_TIME]: onGetSessionTime,
  [globalConstants.IPC_METHOD_RELOAD_SESSIONS]: onReloadSessions,
  [globalConstants.IPC_METHOD_RELOAD_VIEW]: onReloadView,
  [globalConstants.IPC_METHOD_SAVE_VIEW]: onSaveView,
  [globalConstants.IPC_METHOD_SERVER_DEBUG]: onServerDebug,
};

export default (electronEvent, data) => handle(
  controller,
  data,
  response => electronEvent.sender.send('global', response),
);
