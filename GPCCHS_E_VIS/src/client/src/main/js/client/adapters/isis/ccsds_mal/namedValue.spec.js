// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./namedValue');
const stub = require('./namedValue.stub')();



describe('protobuf/isis/ccsds_mal/NamedValue', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/NamedValue.proto`, { keepCase: true })
    .lookup('ccsds_mal.protobuf.NamedValue');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      name: { type: 'identifier', value: stub.name },
      value: { type: 'double', symbol: stub.value.toString() },
    });
    
  });
});
