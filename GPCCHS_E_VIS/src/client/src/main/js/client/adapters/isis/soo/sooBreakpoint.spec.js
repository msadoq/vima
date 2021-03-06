// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./sooBreakpoint');
const stub = require('./sooBreakpoint.stub')();



describe('protobuf/isis/soo/SooBreakpoint', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/SooBreakpoint.proto`, { keepCase: true })
    .lookup('soo.protobuf.SooBreakpoint');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      data: { type: 'string', value: stub.data },
      sooState: { type: 'blob', value: stub.sooState },
      sooOperation: { type: 'blob', value: stub.sooOperation },
      sooFunctionalChain: { type: 'blob', value: stub.sooFunctionalChain },
    });
    
  });
});
