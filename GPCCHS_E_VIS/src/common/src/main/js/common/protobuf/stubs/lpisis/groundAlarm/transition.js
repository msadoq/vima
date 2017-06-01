// Produced by Acceleo JavaScript Generator 1.1.0
const _random = require('lodash/random');
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  onboardDate: now,
  groundDate: now,
  convertedValue: _random(1, 100, true),
  extractedValue: _random(1, 100, true),
  rawValue: _random(1, 100, true),
  monitoringState: 'mySTRING',
}, override);
