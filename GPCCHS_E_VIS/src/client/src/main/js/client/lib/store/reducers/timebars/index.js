import _ from 'lodash/fp';
import u from 'updeep';
import { createSelector } from 'reselect';

import * as types from '../../types';
import timebar from './timebar';

/* --- Reducer -------------------------------------------------------------- */
export default function timebarsReducer(stateTimebars = {}, action) {
  switch (action.type) {
    case types.HSC_CLOSE_WORKSPACE:
      return {};
    case types.WS_TIMEBAR_CREATE_NEW:
      return _.set(action.payload.timebarUuid, timebar(undefined, action), stateTimebars);
    case types.WS_WORKSPACE_OPEN: {
      const setPayloadTimebar = _.set('payload.timebar');
      const singleTimebarReducer = stateTb => (
        timebar(undefined, setPayloadTimebar(stateTb, action))
      );
      return _.compose(
        _.merge(stateTimebars),              // 4. merge with old stateTimebars
        _.mapValues(_.unset('timelines')),   // 3. remove all timelines, this is handled by timebarTimelines reducer
        _.indexBy('uuid'),                   // 2. index timebars array by uuid
        _.map(singleTimebarReducer)          // 1. apply single timebar reducer on all timebars
      )(action.payload.timebars);
    }
    default: {
      if (
        action.payload &&
        action.payload.timebarUuid &&
        stateTimebars[action.payload.timebarUuid]
      ) {
        const currentTimebar = stateTimebars[action.payload.timebarUuid];
        return u({
          [action.payload.timebarUuid]: timebar(currentTimebar, action),
        }, stateTimebars);
      }
      return stateTimebars;
    }
  }
}

/* --- Selectors ------------------------------------------------------------ */
export const getTimebars = state => state.timebars;
export const getTimebar = (state, { timebarUuid }) => state.timebars[timebarUuid];
export const getTimebarId = createSelector(
  getTimebar,
  _.get('id')
);
export const getFirstTimebarId = _.pipe(getTimebars, _.keys, _.get(0));
export const getTimebarMasterId = (state, { timebarUuid }) => _.get(['timebars', timebarUuid, 'masterId'], state);