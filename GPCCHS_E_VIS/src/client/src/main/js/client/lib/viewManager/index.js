// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Move VIVL files in lib/viewManager and fix plenty of
//  inline view/structure type specific code
// VERSION : 1.1.2 : DM : #3622 : 24/02/2017 : MenuManager use now viewManager to generate view
//  menu
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : add view manager constants .
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Split viewManager/index.js in several files
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Write first configurationReducer (TextView) .
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Add PlotView and DynamicView configurationReducer in
//  viewManager
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Refacto viewManager/index.js configuration reducers
//  .
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 06/04/2017 : Change prepareViewFor* behaviors . .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Implement automation for data reducers in
//  viewManager
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getEditorComponent . . .
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView using SkeletonView
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Restore viewManager . . .
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix manageRTD.sh . . .
// VERSION : 1.1.2 : DM : #5828 : 04/05/2017 : Fix 'npm run build' .
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : Merge branch 'dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #6129 : 09/05/2017 : apply viewManager modifications to mimicView
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add Misc/links in view editor
// VERSION : 1.1.2 : DM : #5828 : 13/06/2017 : Move common/constants/ in client/ folder
// VERSION : 1.1.2 : DM : #5822 : 21/06/2017 : add context menu in mimiv view to open entry points
//  in inspector
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Separate perTdbId by structure type in dataMap
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : remove lastFrom0 from datamap add a test to keep the
//  good interval in datamap
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : remove lower bound type from viewManager
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update viewManager with alarm parameters
// VERSION : 2.0.0 : DM : #5806 : 11/10/2017 : Add GroundAlarmView schema (HistoryView fork)
// VERSION : 2.0.0 : DM : #5806 : 17/10/2017 : Refacto PubSub Alarm + tbd Alarm queries
// VERSION : 2.0.0 : FA : ISIS-FT-2229 : 18/10/2017 : Resolve merge conflict . .
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Fork GMA to OBA (viewManager)
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-1937 : 30/01/2018 : Unit convertion, add python fork and
//  convertion call mechanism
// END-HISTORY
// ====================================================================

/* eslint-disable global-require, "DV6 TBC_CNES Because mainProcess can't statically resolve react components" */

import plotViewSchema from 'common/viewConfigurationFiles/schemas/PlotView.schema.json';
import textViewSchema from 'common/viewConfigurationFiles/schemas/TextView.schema.json';
import mimicViewSchema from 'common/viewConfigurationFiles/schemas/MimicView.schema.json';
import dynamicViewSchema from 'common/viewConfigurationFiles/schemas/DynamicView.schema.json';
import historyViewSchema from 'common/viewConfigurationFiles/schemas/HistoryView.schema.json';
import packetViewSchema from 'common/viewConfigurationFiles/schemas/PacketView.schema.json';
import groundAlarmViewSchema from 'common/viewConfigurationFiles/schemas/GroundAlarmView.schema.json';
import onboardAlarmViewSchema from 'common/viewConfigurationFiles/schemas/OnboardAlarmView.schema.json';
import PUS11ViewSchema from 'common/viewConfigurationFiles/schemas/PUS11View.schema.json';
import decommutedPacketViewSchema from '../common/viewConfigurationFiles/schemas/DecommutedPacketView.schema.json';

import {
  DATASTRUCTURETYPE_PUS,
  DATASTRUCTURETYPE_LAST,
  DATASTRUCTURETYPE_RANGE,
} from '../constants';

import textViewData from './TextView/data';
import dynamicViewData from './DynamicView/data';
import decommutedPacketViewData from './DecommutedPacketView/data';
import mimicViewData from './MimicView/data';
import historyViewData from './HistoryView/data';
import packetViewData from './PacketView/data';
import groundAlarmViewData from './GroundAlarmView/data';
import onboardAlarmViewData from './OnboardAlarmView/data';
import plotViewData from './PlotView/data';
import PUS11ViewData from '../viewManager/PUS11View/data';

import plotViewDataSelectors from './PlotView/store/dataSelectors';
import textViewDataSelectors from './TextView/store/dataSelectors';
import dynamicViewDataSelectors from './DynamicView/store/dataSelectors';
import decommutedPacketViewDataSelectors from './DecommutedPacketView/store/dataSelectors';
import mimicViewDataSelectors from './MimicView/store/dataSelector';
import groundAlarmViewDataSelectors from './GroundAlarmView/store/dataSelectors';
import onboardAlarmViewDataSelectors from './OnboardAlarmView/store/dataSelectors';
import historyViewDataSelectors from './HistoryView/store/dataSelectors';
import packetViewDataSelectors from './PacketView/store/dataSelectors';
import PUS11ViewDataSelectors from '../viewManager/PUS11View/store/dataSelectors';

import * as constants from './constants';

import plotViewModule from './PlotView';
import textViewModule from './TextView';
import mimicViewModule from './MimicView';
import dynamicViewModule from './DynamicView';
import decommutedPacketViewModule from './DecommutedPacketView';
import historyViewModule from './HistoryView';
import packetViewModule from './PacketView';
import groundAlarmViewModule from './GroundAlarmView';
import onboardAlarmViewModule from './OnboardAlarmView';
import PUS11ViewModule from '../viewManager/PUS11View';

const list = {
  [constants.VM_VIEW_PLOT]: {
    schema: plotViewSchema,
    viewModule: plotViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: plotViewData,
    dataSelectors: plotViewDataSelectors,
  },
  [constants.VM_VIEW_TEXT]: {
    schema: textViewSchema,
    viewModule: textViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: textViewData,
    dataSelectors: textViewDataSelectors,
  },
  [constants.VM_VIEW_DYNAMIC]: {
    schema: dynamicViewSchema,
    viewModule: dynamicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: dynamicViewData,
    dataSelectors: dynamicViewDataSelectors,
  },
  [constants.VM_VIEW_DECOMMUTEDPACKET]: {
    schema: decommutedPacketViewSchema,
    viewModule: decommutedPacketViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: decommutedPacketViewData,
    dataSelectors: decommutedPacketViewDataSelectors,
  },
  [constants.VM_VIEW_HISTORY]: {
    schema: historyViewSchema,
    viewModule: historyViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: historyViewData,
    dataSelectors: historyViewDataSelectors,
  },
  [constants.VM_VIEW_PACKET]: {
    schema: packetViewSchema,
    viewModule: packetViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: packetViewData,
    dataSelectors: packetViewDataSelectors,
  },
  [constants.VM_VIEW_MIMIC]: {
    schema: mimicViewSchema,
    viewModule: mimicViewModule,
    structureType: DATASTRUCTURETYPE_LAST,
    structureModule: mimicViewData,
    dataSelectors: mimicViewDataSelectors,
  },
  [constants.VM_VIEW_GROUNDALARM]: {
    schema: groundAlarmViewSchema,
    viewModule: groundAlarmViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: groundAlarmViewData,
    dataSelectors: groundAlarmViewDataSelectors,
  },
  [constants.VM_VIEW_ONBOARDALARM]: {
    schema: onboardAlarmViewSchema,
    viewModule: onboardAlarmViewModule,
    structureType: DATASTRUCTURETYPE_RANGE,
    structureModule: onboardAlarmViewData,
    dataSelectors: onboardAlarmViewDataSelectors,
  },
  [constants.VM_VIEW_PUS11]: {
    schema: PUS11ViewSchema,
    viewModule: PUS11ViewModule,
    structureType: DATASTRUCTURETYPE_PUS,
    structureModule: PUS11ViewData,
    dataSelectors: PUS11ViewDataSelectors,
  },
};

export default list;
export * from './selectors';

export function getAvailableViews() {
  return Object.keys(list);
}

export function isViewTypeSupported(type) {
  return !!list[type];
}

function isViewTypeExists(type) {
  if (!list[type]) {
    // important! throwing helps error detection during development
    throw new Error(`Invalid viewManager call for type ${type}`);
  }
}

export function getSchema(type) {
  isViewTypeExists(type);
  return list[type].schema;
}

export function getViewModule(type) {
  isViewTypeExists(type);
  return list[type].viewModule;
}

export function getStructureType(type) {
  isViewTypeExists(type);
  return list[type].structureType;
}

export function getStructureModule(type) {
  isViewTypeExists(type);
  return list[type].structureModule;
}

export function getDataSelectors(type) {
  isViewTypeExists(type);
  return list[type].dataSelectors;
}
