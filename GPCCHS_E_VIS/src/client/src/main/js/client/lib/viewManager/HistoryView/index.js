// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #5806 : 24/10/2017 : Fix DynamicView setEntryPointDefault and
//  prepareViewForStore
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';

import commonInput from '../commonInput';
import commonOutput from '../commonOutput';
import setEntryPointDefault from './setEntryPointDefault';
import prepareViewForFile from './prepareViewForFile';
import prepareViewForModel from './prepareViewForModel';
import prepareViewForStore from './prepareViewForStore';

const removeEntryPointsIds = _.update('configuration.entryPoints', _.map(_.omit('id')));
const setEntryPoints = _.update('configuration.entryPoints', _.map(setEntryPointDefault));

export default {
  setEntryPointDefault,
  prepareViewForModel,
  prepareViewForFile: _.pipe(
    removeEntryPointsIds,
    prepareViewForFile,
    commonOutput
  ),
  prepareViewForStore: _.pipe(
    commonInput,
    prepareViewForStore,
    setEntryPoints
  ),
};
