// Generated file
const _now = require('lodash/now');
const applyOverride = require('../../applyOverride');


const now = _now();

module.exports = override => applyOverride({
  TCID: Buffer('myIDENTIFIER'),
  receivedDate: now,
  mnemo: 1,
  segment_id: [100, 100],
  rawtc_data: Buffer.alloc(10, 1),
}, override);
