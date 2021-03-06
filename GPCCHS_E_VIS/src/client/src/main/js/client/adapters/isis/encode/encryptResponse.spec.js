// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./encryptResponse');
const { getEncryptResponse } = require('../stubs');



describe('protobuf/isis/encode/EncryptResponse', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/EncryptResponse.proto`, { keepCase: true })
    .lookup('encode.protobuf.EncryptResponse');
  const fixture = getEncryptResponse();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      rawData: { type: 'blob', value: fixture.rawData },
      status: { type: 'boolean', value: fixture.status },
    });
    
    
  });
});
