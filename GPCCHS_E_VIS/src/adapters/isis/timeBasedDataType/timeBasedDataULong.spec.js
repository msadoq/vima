// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
require('../../../utils/test');
const { encodeRaw, decodeRaw } = require('./timeBasedDataULong');
const { getTimeBasedDataULong } = require('../stubs');



describe('protobuf/isis/timeBasedDataType/TimeBasedDataULong', () => {
  const fixture = getTimeBasedDataULong();
  let buffer;
  it('encode', () => {
    buffer = encodeRaw(fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = decodeRaw(buffer);
    json.should.be.an('object').that.have.properties({
      timeStamp: { type: 'finetime', value: fixture.timeStamp },
      name: { type: 'string', value: fixture.name },
      value: { type: 'ulong', symbol: `${fixture.value}` },
    });
    
  });
});
