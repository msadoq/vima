// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _random = require('lodash/random');
const _defaultsDeep = require('lodash/defaultsDeep');


const statValue = {
  related: -1000,
  attrValue: _random(1, 100, true),
};

module.exports = override => (override ? _defaultsDeep({}, override, statValue) : statValue);
