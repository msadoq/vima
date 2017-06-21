// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./executionStatus');
const { getExecutionStatus } = require('../stubs');



describe('protobuf/isis/execution/ExecutionStatus', () => {
  const fixture = getExecutionStatus();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      status: { type: 'integer', value: fixture.status },
      statusTime: { type: 'time', value: fixture.statusTime },
    });
    
  });
});
