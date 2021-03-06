// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const { encodeRaw, decodeRaw } = require('./userConnection');
const { getUserConnection } = require('../stubs');



describe('protobuf/isis/accessControlModel/UserConnection', () => {
  const fixture = getUserConnection();
  let buffer;
  test('encode', () => {
    buffer = encodeRaw(fixture);
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const json = decodeRaw(buffer);
    expect(json).toMatchObject({
      userName: { type: 'string', value: fixture.userName },
      serverName: { type: 'string', value: fixture.serverName },
      terminalId: { type: 'string', value: fixture.terminalId },
      genericAccount: { type: 'string', value: fixture.genericAccount },
      loginTime: { type: 'time', value: fixture.loginTime },
      authID: { type: 'blob', value: fixture.authID },
    });
  });
});
