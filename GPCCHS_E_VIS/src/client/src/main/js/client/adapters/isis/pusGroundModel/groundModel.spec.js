// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./groundModel');
const { getGroundModel } = require('../stubs');



describe('protobuf/isis/pusGroundModel/GroundModel', () => {
  const fixture = getGroundModel();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      apid: { type: 'uinteger', value: fixture.apid },
      pusServiceType: { type: 'uinteger', value: fixture.pusServiceType },
    });
  });
});
