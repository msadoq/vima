// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');


const cOP1WaitQueue = {
  internal_id: -100,
  frame_data: Buffer.alloc(4, 1),
  reemission_delay: 1.100000023841858,
};

module.exports = override => (override ? _defaultsDeep({}, override, cOP1WaitQueue) : cOP1WaitQueue);
