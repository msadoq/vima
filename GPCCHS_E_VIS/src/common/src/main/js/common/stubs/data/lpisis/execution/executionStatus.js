// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  status: -100,
  statusTime: now,
}, override);
