// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pusServiceApid');
const stub = require('./pusServiceApid.stub')();



describe('protobuf/isis/pusModelEditorMessages/PusServiceApid', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/PusServiceApid.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.PusServiceApid');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      value: { type: 'uinteger', value: stub.value },
    });
    
  });
});
