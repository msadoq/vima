// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const now = _now();

const pus011SubSchedule = {
  ssId: 100,
  status: 100,
  executionTimeFirstTc: 1000,
  apid: 100,
  pusElement: getPusElement(),
  groundDate: now,
  ssIdLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011SubSchedule) : pus011SubSchedule);
