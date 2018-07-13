// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Update of history view data store
// END-HISTORY
// ====================================================================

/* eslint-disable complexity, "DV6 TBC_CNES Redux reducers should be implemented as switch case" */
import _ from 'lodash/fp';
import parameters from 'common/configurationManager';

import { VM_VIEW_PUS11 } from '../../constants';
import createScopedDataReducer from '../../commonData/createScopedDataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';
import { injectTabularData } from '../../commonData/reducer';

// eslint-disable-next-line no-unused-vars
function pus11DataReducer(state = {}, action) {
  switch (action.type) {
    case INJECT_PUS_DATA: {
      /**
       * action.payload: {
       *  timestamp: number,
       *  data: {
       *    PUS11View: {
       *      pus011Model: {
       *        pus011Apid: [],
       *        pus011SubSchedule: [],
       *        pus011Command: [],
       *        ...rest
       *      },
       *    },
       *  },
       * },
       */
      const data = _.getOr([], ['payload', 'data', VM_VIEW_PUS11], action);
      if (!data) {
        return state;
      }
      let updatedState = state;

      const statuses = parameters.get('PUS_CONSTANTS').STATUS;
      const updateTypes = parameters.get('PUS_CONSTANTS').UPDATE_TYPE;

      // keep all except tabular data
      updatedState = {
        ...updatedState,
        ..._.omit(
          ['pus011SubSchedule', 'pus011Apid', 'pus011Command'],
          _.getOr(null, ['pus011Model'], data)
        ),
      };

      // injectTabularData: add data tables to dedicated injectTabularData (VirtualizedTableView)
      updatedState = injectTabularData(updatedState, 'subSchedules',
        _.getOr([], ['pus011Model', 'pus011SubSchedule'], data)
          .map(subSchedule => ({
            ...subSchedule,
            status: statuses[_.getOr(200, 'status', subSchedule)], // map schedule status constant
            lastUpdateModeSubScheduleId: updateTypes[_.getOr(200, 'lastUpdateModeSubScheduleId', subSchedule)], // map schedule lastUpdateModeSubScheduleId constant
            lastUpdateModeStatus: updateTypes[_.getOr(200, 'lastUpdateModeStatus', subSchedule)], // map schedule lastUpdateModeStatus constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'enabledApids',
        _.getOr([], ['pus011Model', 'pus011Apid'], data)
          .filter(enabledApid => enabledApid.status !== 1) // filter disabled apids
          .map(enabledApid => ({
            ...enabledApid,
            status: statuses[_.getOr(200, 'status', enabledApid)], // map schedule status constant
            lastUpdateModeApid: updateTypes[_.getOr(200, 'lastUpdateModeApid', enabledApid)], // map schedule lastUpdateModeApid constant
          }))
      );
      updatedState = injectTabularData(updatedState, 'commands',
        _.getOr([], ['pus011Model', 'pus011Command'], data)
        .map(command => ({
          ...command,
          lastUpdateModeCommandId: updateTypes[_.getOr(200, 'lastUpdateModeCommandId', command)], // map schedule lastUpdateModeCommandId constant
          lastUpdateModeBinProf: updateTypes[_.getOr(200, 'lastUpdateModeBinProf', command)], // map schedule lastUpdateModeBinProf constant
          commandStatus: statuses[_.getOr(200, 'commandStatus', command)], // map schedule commandStatus constant
          lastUpdateModeGroundStatus: updateTypes[_.getOr(200, 'lastUpdateModeGroundStatus', command)], // map schedule lastUpdateModeGroundStatus constant
          commandGroundStatus: statuses[_.getOr(200, 'commandGroundStatus', command)], // map schedule commandGroundStatus constant
          lastUpdateModeStatus: updateTypes[_.getOr(200, 'lastUpdateModeStatus', command)], // map schedule lastUpdateModeStatus constant
          lastUpdateModeCurrentExecTime: updateTypes[_.getOr(200, 'lastUpdateModeCurrentExecTime', command)], // map schedule lastUpdateModeCurrentExecTime constant
          lastUpdateModeInitialExecTime: updateTypes[_.getOr(200, 'lastUpdateModeInitialExecTime', command)], // map schedule lastUpdateModeInitialExecTime constant
          lastUpdateModeTotalTimeShiftOffset: updateTypes[_.getOr(200, 'lastUpdateModeTotalTimeShiftOffset', command)], // map schedule lastUpdateModeTotalTimeShiftOffset constant
          pus011CommandParameters: command.pus011CommandParameters.map(commandParameter => ({
            ...commandParameter,
            lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', commandParameter)], // map pus011CommandParameters lastUpdateMode constant
          })),
          pus011TimeShift: command.pus011TimeShift.map(timeShift => ({
            ...timeShift,
            lastUpdateMode: updateTypes[_.getOr(200, 'lastUpdateMode', timeShift)], // map pus011TimeShift lastUpdateMode constant
          })),
        }))
      );

      return updatedState;
    }
    default:
      return state;
  }
}

export default createScopedDataReducer(pus11DataReducer, {}, VM_VIEW_PUS11);

export const getPUS11ViewData = state => state[`${VM_VIEW_PUS11}Data`];
export const getData = (state, { viewId }) => state[`${VM_VIEW_PUS11}Data`][viewId];
export const getConfiguration = (state, { viewId }) => state[`${VM_VIEW_PUS11}Configuration`][viewId];
