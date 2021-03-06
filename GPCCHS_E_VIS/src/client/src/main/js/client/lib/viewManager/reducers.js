// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in
//  viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6700 : 16/06/2017 : Add store enhancers helpers code coverage and merge
//  with dev
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Add empty ui reducers (gma and oba)
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement uiReducer for GMA and OBA and compute
//  selected alarms in redux store
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 31/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism bis
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import * as constants from './constants';

import packetViewConfigurationReducer from './PacketView/store/configurationReducer';
import createReducerByViews from '../store/helpers/createReducerByViews';
import commonConfigurationReducer from './commonConfiguration/reducer';
import commonDataReducer from './commonData/reducer';

import textViewConfigurationReducer from './TextView/store/configurationReducer';
import plotViewConfigurationReducer from './PlotView/store/configurationReducer';
import dynamicViewConfigurationReducer from './DynamicView/store/configurationReducer';
import decommutedPacketViewConfigurationReducer
  from './DecommutedPacketView/store/configurationReducer';
import mimicViewConfigurationReducer from './MimicView/store/configurationReducer';
import historyViewConfigurationReducer from './HistoryView/store/configurationReducer';
import groundAlarmViewConfigurationReducer from './GroundAlarmView/store/configurationReducer';
import onboardAlarmViewConfigurationReducer from './OnboardAlarmView/store/configurationReducer';
import pus05ViewConfigurationReducer from './PUS05View/store/configurationReducer';
import pus11ViewConfigurationReducer from './PUS11View/store/configurationReducer';
import pus12ViewConfigurationReducer from './PUS12View/store/configurationReducer';
import pus13ViewConfigurationReducer from './PUS13View/store/configurationReducer';
import pus14ViewConfigurationReducer from './PUS14View/store/configurationReducer';
import pus15ViewConfigurationReducer from './PUS15View/store/configurationReducer';
import pus18ViewConfigurationReducer from './PUS18View/store/configurationReducer';
import pus19ViewConfigurationReducer from './PUS19View/store/configurationReducer';
import pus140ViewConfigurationReducer from './PUS140View/store/configurationReducer';
import pus142ViewConfigurationReducer from './PUS142View/store/configurationReducer';
import pus144ViewConfigurationReducer from './PUS144View/store/configurationReducer';
import pusMmeViewConfigurationReducer from './PUSMMEView/store/configurationReducer';

import textViewDataReducer from './TextView/store/dataReducer';
import plotViewDataReducer from './PlotView/store/dataReducer';
import dynamicViewDataReducer from './DynamicView/store/dataReducer';
import decommutedPacketViewDataReducer from './DecommutedPacketView/store/dataReducer';
import mimicViewDataReducer from './MimicView/store/dataReducer';
import historyViewDataReducer from './HistoryView/store/dataReducer';
import groundAlarmViewDataReducer from './GroundAlarmView/store/dataReducer';
import onboardAlarmViewDataReducer from './OnboardAlarmView/store/dataReducer';
import packetViewDataReducer from './PacketView/store/dataReducer';
import pus05ViewDataReducer from './PUS05View/store/dataReducer';
import pus13ViewDataReducer from './PUS13View/store/dataReducer';
import pus18ViewDataReducer from './PUS18View/store/dataReducer';
import pus140ViewDataReducer from './PUS140View/store/dataReducer';
import pus142ViewDataReducer from './PUS142View/store/dataReducer';
import pus144ViewDataReducer from './PUS144View/store/dataReducer';
import pusMmeViewDataReducer from './PUSMMEView/store/dataReducer';

import alarmViewUiReducer from './GroundAlarmView/store/uiReducer';

import composeReducers from '../store/helpers/composeReducers';

/* --- Utils ---------------------------------------------------------------- */
const appendString = _.curry((x, str) => str.concat(x));

const createViewConfigurationReducer = ([type, reducer]) => ([
  type,
  createReducerByViews(
    composeReducers(reducer, commonConfigurationReducer),
    type
  ),
]);

const createViewDataReducer = ([type, reducer]) => ([
  type,
  composeReducers(reducer, commonDataReducer),
]);

const createReducers = (createCommonReducer, suffix) => _.pipe(
  _.toPairs,
  _.map(createCommonReducer),
  _.fromPairs,
  _.mapKeys(appendString(suffix))
);

const createConfigurationReducers =
  createReducers(createViewConfigurationReducer, 'Configuration');

const createDataReducers =
  createReducers(createViewDataReducer, 'Data');

/* --- Reducers ------------------------------------------------------------- */

export const getConfigurationReducers = () => createConfigurationReducers({
  [constants.VM_VIEW_TEXT]: textViewConfigurationReducer,
  [constants.VM_VIEW_PLOT]: plotViewConfigurationReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewConfigurationReducer,
  [constants.VM_VIEW_DECOMMUTEDPACKET]: decommutedPacketViewConfigurationReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewConfigurationReducer,
  [constants.VM_VIEW_HISTORY]: historyViewConfigurationReducer,
  [constants.VM_VIEW_PACKET]: packetViewConfigurationReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewConfigurationReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewConfigurationReducer,
  [constants.VM_VIEW_PUS05]: pus05ViewConfigurationReducer,
  [constants.VM_VIEW_PUS11]: pus11ViewConfigurationReducer,
  [constants.VM_VIEW_PUS12]: pus12ViewConfigurationReducer,
  [constants.VM_VIEW_PUS13]: pus13ViewConfigurationReducer,
  [constants.VM_VIEW_PUS14]: pus14ViewConfigurationReducer,
  [constants.VM_VIEW_PUS15]: pus15ViewConfigurationReducer,
  [constants.VM_VIEW_PUS18]: pus18ViewConfigurationReducer,
  [constants.VM_VIEW_PUS19]: pus19ViewConfigurationReducer,
  [constants.VM_VIEW_PUS140]: pus140ViewConfigurationReducer,
  [constants.VM_VIEW_PUS142]: pus142ViewConfigurationReducer,
  [constants.VM_VIEW_PUS144]: pus144ViewConfigurationReducer,
  [constants.VM_VIEW_PUSMME]: pusMmeViewConfigurationReducer,
});

export const getDataReducers = () => createDataReducers({
  [constants.VM_VIEW_TEXT]: textViewDataReducer,
  [constants.VM_VIEW_PLOT]: plotViewDataReducer,
  [constants.VM_VIEW_DYNAMIC]: dynamicViewDataReducer,
  [constants.VM_VIEW_DECOMMUTEDPACKET]: decommutedPacketViewDataReducer,
  [constants.VM_VIEW_MIMIC]: mimicViewDataReducer,
  [constants.VM_VIEW_HISTORY]: historyViewDataReducer,
  [constants.VM_VIEW_PACKET]: packetViewDataReducer,
  [constants.VM_VIEW_GROUNDALARM]: groundAlarmViewDataReducer,
  [constants.VM_VIEW_ONBOARDALARM]: onboardAlarmViewDataReducer,
  [constants.VM_VIEW_PUS05]: pus05ViewDataReducer,
  [constants.VM_VIEW_PUS13]: pus13ViewDataReducer,
  [constants.VM_VIEW_PUS18]: pus18ViewDataReducer,
  [constants.VM_VIEW_PUS140]: pus140ViewDataReducer,
  [constants.VM_VIEW_PUS142]: pus142ViewDataReducer,
  [constants.VM_VIEW_PUS144]: pus144ViewDataReducer,
  [constants.VM_VIEW_PUSMME]: pusMmeViewDataReducer,
});
export const getUiReducers = () => ({
  AlarmViewUi: alarmViewUiReducer,
});
