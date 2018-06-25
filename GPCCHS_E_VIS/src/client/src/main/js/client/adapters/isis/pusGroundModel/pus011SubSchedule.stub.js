// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus011SubSchedule = {
  ssId: 100,
  status: 1,
  executionTimeFirstTc: now,
  apid: 100,
  pusElement: getPusElement(),
  groundDate: now,
  ssIdLabel: 'mySTRING',
  lastUpdateModeStatus: 1,
  lastUpdateTimeStatus: now,
  lastUpdateModeExecTimeFirstTc: 1,
  lastUpdateTimeExecTimeFirstTc: now,
  lastUpdateModeSsId: 1,
  lastUpdateTimeSsId: now,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011SubSchedule) : pus011SubSchedule);
