import simple from '../../../store/helpers/simpleActionCreator';
import * as types from '../../../store/types';
import { getCurrentVisuWindow } from '../../../store/selectors/timebars';

export const updateAlarmDomain = simple(types.WS_VIEW_UPDATE_ALARMDOMAIN, 'viewId', 'domainName');
export const updateAlarmTimeline = simple(types.WS_VIEW_UPDATE_ALARMTIMELINE, 'viewId', 'timelineName');
export const updateAlarmMode = (viewId, mode) => (dispatch, getState) => {
  const visuWindow = getCurrentVisuWindow(getState());
  dispatch({ type: types.WS_VIEW_UPDATE_ALARMMODE, payload: { viewId, mode, visuWindow } });
};