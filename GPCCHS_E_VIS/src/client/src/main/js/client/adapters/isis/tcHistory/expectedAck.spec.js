// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./expectedAck');
const stub = require('./expectedAck.stub')();



describe('protobuf/isis/tcHistory/ExpectedAck', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ExpectedAck.proto`, { keepCase: true })
    .lookup('tcHistory.protobuf.ExpectedAck');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      acceptance: { type: 'boolean', value: stub.acceptance },
      executionComplete: { type: 'boolean', value: stub.executionComplete },
      executionStart: { type: 'boolean', value: stub.executionStart },
    });
    
  });
});
