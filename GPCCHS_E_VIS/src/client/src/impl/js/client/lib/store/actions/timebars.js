import { v4 } from 'node-uuid';
import globalConstants from 'common/constants';
import _get from 'lodash/get';
import simple from '../simpleActionCreator';
import * as types from '../types';
import {
  addOnce as addMessage,
  reset as resetMessages
} from './messages';
import { getMessages } from '../selectors/messages';
import {
  add as addTimeline,
  remove as removeTimeline,
  update as updateTL,
} from './timelines';
import { pause } from './hsc';
import {
  getTimebar,
  getMasterTimelineById,
  getTimebarTimelinesSelector,
} from '../selectors/timebars';
import {
  getSession,
} from '../selectors/sessions';

const currentUpperMargin = 1 / 100;

/**
 * Simple actions
 */
export const add = simple(types.WS_TIMEBAR_ADD, 'timebarId', 'configuration');
export const remove = simple(types.WS_TIMEBAR_REMOVE, 'timebarId');
export const updateId = simple(types.WS_TIMEBAR_ID_UPDATE, 'timebarId', 'id');
export const updateCursors = (timebarId, visuWindow, slideWindow) =>
  (dispatch, getState) => {
    const state = getState();
    const timebar = getTimebar(state, timebarId);
    const messages = [];
    const lower = _get(visuWindow, 'lower') || timebar.visuWindow.lower;
    const upper = _get(visuWindow, 'upper') || timebar.visuWindow.upper;
    const current = _get(visuWindow, 'current') || timebar.visuWindow.current;
    const slideLower = _get(slideWindow, 'lower') || timebar.slideWindow.lower;
    const slideUpper = _get(slideWindow, 'upper') || timebar.slideWindow.upper;
    if (lower > current) {
      messages.push('Lower cursor must be before current cursor');
    }
    if (current > upper) {
      messages.push('Current cursor must be before upper cursor');
    }
    if (slideLower < lower || slideLower > current) {
      messages.push('Ext lower cursor must be between lower and current cursors');
    }
    if (timebar.mode === 'Extensible') {
      if (slideUpper < upper) {
        messages.push('Ext upper cursor must be after upper cursor in Extensible mode');
      }
    } else if (timebar.mode === 'Fixed' || timebar.mode === 'Normal') {
      if (slideUpper > upper || slideUpper < current) {
        messages.push('Ext upper cursor must be between current and upper cursor in Fixed and Normal mode');
      }
    }

    if (messages.length) {
      dispatch(pause());
      messages.forEach((v) => {
        dispatch(addMessage(`timeSetter-${timebarId}`, 'error', v));
      });
    } else {
      const timeSetterMessages = getMessages(state, `timeSetter-${timebarId}`);
      if (timeSetterMessages && timeSetterMessages.length) {
        dispatch(resetMessages(`timeSetter-${timebarId}`));
      }
      dispatch({
        type: types.WS_TIMEBAR_UPDATE_CURSORS,
        payload: {
          visuWindow,
          slideWindow,
          timebarId,
        }
      });
    }
  };

export const updateViewport = simple(
  types.WS_TIMEBAR_UPDATE_VIEWPORT,
  'timebarId',
  'rulerStart',
  'rulerResolution'
);
export const updateSpeed = simple(types.WS_TIMEBAR_SPEED_UPDATE, 'timebarId', 'speed');
export function updateMode(timebarId, mode) {
  return (dispatch, getState) => {
    dispatch({
      type: types.WS_TIMEBAR_MODE_UPDATE,
      payload: {
        timebarId,
        mode: mode === 'Realtime' ? 'Normal' : mode,
      }
    });
    const state = getState();
    const timebar = getTimebar(state, timebarId);
    const { visuWindow, slideWindow } = timebar;

    if (mode === 'Realtime') {
      const timelines = getTimebarTimelinesSelector(state, timebarId);
      const masterTimeline = getMasterTimelineById(state.timebars, timelines, timebarId);
      const currentSession = getSession(state.sessions, masterTimeline.sessionId);
      const sessionOffset = currentSession ? currentSession.offsetWithmachineTime : 0;

      const msWidth = visuWindow.upper - visuWindow.lower;
      const realTimeMs = Date.now() + sessionOffset;
      const newLower = realTimeMs - ((1 - currentUpperMargin) * msWidth);
      const newUpper = realTimeMs + (currentUpperMargin * msWidth);
      dispatch(
        updateCursors(
          timebarId,
          {
            lower: newLower,
            upper: newUpper,
            current: realTimeMs,
          },
          {
            lower: newLower,
            upper: newUpper,
          },
        )
      );
    } else if (mode === 'Normal' && slideWindow.upper > visuWindow.upper) {
      dispatch(
        updateCursors(
          timebarId,
          null,
          {
            lower: slideWindow.lower,
            upper: visuWindow.upper - ((visuWindow.upper - visuWindow.current) / 2),
          }
        )
      );
    } else if (mode === 'Extensible' && slideWindow.upper < visuWindow.upper) {
      let newSlideUpper = visuWindow.upper + ((visuWindow.upper - visuWindow.lower) / 4);
      if (newSlideUpper - visuWindow.lower > globalConstants.HSC_VISUWINDOW_MAX_LENGTH) {
        newSlideUpper = visuWindow.lower + globalConstants.HSC_VISUWINDOW_MAX_LENGTH;
      }
      dispatch(
        updateCursors(
          timebarId,
          null,
          {
            lower: slideWindow.lower,
            upper: newSlideUpper,
          }
        )
      );
    } else if (mode === 'Fixed' && slideWindow.upper > visuWindow.upper) {
      dispatch(
        updateCursors(
          timebarId,
          null,
          {
            lower: slideWindow.lower,
            upper: visuWindow.upper - ((visuWindow.upper - visuWindow.current) / 2),
          }
        )
      );
    }
  };
}

export const updateDefaultWidth = simple(types.WS_TIMEBAR_DEFAULTWIDTH_UPDATE, 'timebarId', 'defaultWidth');
export const updateMasterId = simple(types.WS_TIMEBAR_MASTERID_UPDATE, 'timebarId', 'masterId');
export const mountTimeline = simple(types.WS_TIMEBAR_MOUNT_TIMELINE, 'timebarId', 'timelineId');
export const unmountTimeline = simple(types.WS_TIMEBAR_UNMOUNT_TIMELINE, 'timebarId', 'timelineId');

/**
 * Compound actions
 */
export function addAndMountTimeline(timebarId, configuration) {
  return (dispatch) => {
    const timelineId = v4();
    dispatch(addTimeline(timelineId, configuration));
    dispatch(mountTimeline(timebarId, timelineId));
  };
}

export function unmountAndRemoveTimeline(timebarId, timelineId) {
  return (dispatch) => {
    dispatch(unmountTimeline(timebarId, timelineId));
    dispatch(removeTimeline(timelineId));
  };
}

export function updateTimeline(timelineId, configuration) {
  return (dispatch) => {
    dispatch(updateTL(timelineId, configuration));
  };
}
