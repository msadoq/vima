import _ from 'lodash/fp';
import * as types from '../types';

// corresponding between timebars and timelines
export default function timebarTimelines(stateTbTl = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_LOAD_DOCUMENTS: {
      return _.compose(
        _.merge(stateTbTl),         // 3. merge with old stateTbTl
        _.mapValues('timelines'),   // 2. map timelines
        _.indexBy('uuid')           // 1. index timebars array by uuid
      )(action.payload.documents.timebars);
    }
    case types.WS_TIMEBAR_CREATE_NEW:
      return { ...stateTbTl, [action.payload.timebarUuid]: [] };
    case types.WS_TIMELINE_ADD_NEW: {
      const { timeline, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.concat(_, timeline.uuid), stateTbTl);
    }
    case types.WS_TIMELINE_REMOVE: {
      const { timelineUuid, timebarUuid } = action.payload;
      return _.update(timebarUuid, _.remove(_.equals(timelineUuid)), stateTbTl);
    }
    default:
      return stateTbTl;
  }
}
