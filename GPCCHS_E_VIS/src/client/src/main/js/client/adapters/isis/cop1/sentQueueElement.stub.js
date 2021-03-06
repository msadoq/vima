// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const sentQueueElement = {
  retransmit_flag: 100,
  internal_id: 100,
  num_farm: 100,
  date: 'mySTRING',
  frame_data: Buffer.alloc(4, 1),
  reemission_delay: 1.100000023841858,
};

module.exports = override => (override ? _defaultsDeep({}, override, sentQueueElement) : sentQueueElement);
