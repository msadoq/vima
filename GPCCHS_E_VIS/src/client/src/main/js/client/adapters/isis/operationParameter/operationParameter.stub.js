// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');


const now = _now();

const operationParameter = {
  name: 'mySTRING',
  timestamp: now + 1,
  value: _random(1, 100, true),
};

module.exports = override => (override ? _defaultsDeep({}, override, operationParameter) : operationParameter);
