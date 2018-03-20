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
const adapter = require('./processIdentifier');
const { getProcessIdentifier } = require('../stubs');



describe('protobuf/isis/connection/ProcessIdentifier', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessIdentifier.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessIdentifier');
  const fixture = getProcessIdentifier();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      processId: { type: 'long', symbol: `${fixture.processId}` },
      functionOId: { type: 'string', value: fixture.functionOId },
      processInfo: (typeof fixture.processInfo === 'undefined')
        ? null
        : {
          name: { type: 'string', value: fixture.processInfo.name },
        },
    });
    
    
  });
});
