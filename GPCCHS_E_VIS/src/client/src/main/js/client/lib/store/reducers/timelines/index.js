// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 17/03/2017 : Cleanup store/reducers structures, add folder for
//  each reducer
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Move all timelines simple selectors in
//  store/reducers/timelines
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import u from 'updeep';
import { createSelector } from 'reselect';
import _ from 'lodash/fp';
import _find from 'lodash/find';
import * as types from 'store/types';
import timeline from './timeline';

/* --- Reducer -------------------------------------------------------------- */
export default function timelines(stateTimelines = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMELINE_CREATE_NEW:
      return _.set(action.payload.timeline.uuid, timeline(undefined, action), stateTimelines);
    case types.WS_TIMELINE_REMOVE:
      return _.omit(action.payload.timelineUuid, stateTimelines);
    case types.WS_WORKSPACE_OPENED: {
      const setPayloadTimeline = _.set('payload.timeline');
      const singleTimelineReducer = stateTl => (
        timeline(undefined, setPayloadTimeline(stateTl, action))
      );
      return _.compose(
        _.defaults(stateTimelines),          // 3. merge with old stateTimelines
        _.indexBy('uuid'),                   // 2. index timelines array by uuid
        _.map(singleTimelineReducer)         // 1. apply single timeline reducer on all timelines
      )(action.payload.timelines);
    }
    default: {
      if (
        action.payload &&
        action.payload.timelineUuid &&
        stateTimelines[action.payload.timelineUuid]
      ) {
        const currentTimeline = stateTimelines[action.payload.timelineUuid];
        return u({
          [action.payload.timelineUuid]: timeline(currentTimeline, action),
        }, stateTimelines);
      }
      return stateTimelines;
    }
  }
}

/* --- Selectors ------------------------------------------------------------ */
export const getTimelines = state => state.timelines;
export const getTimeline = (state, { timelineUuid }) => state.timelines[timelineUuid];
export const getTimelineUuidById = (state, { timelineId }) =>
  Object.keys(state.timelines).find(uuid => state.timelines[uuid].id === timelineId);

export const getTimelineById = createSelector(
  (state, { timelineId }) => timelineId,
  getTimelines,
  (timelineId, _timelines) => _find(_timelines, t => t.id === timelineId)
  )
;
