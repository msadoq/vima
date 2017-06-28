// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus011SyncPoint');
const stub = require('./pus011SyncPoint.stub')();



describe('protobuf/isis/pusGroundModel/Pus011SyncPoint', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus011SyncPoint.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus011SyncPoint');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      apid: { type: 'uinteger', value: stub.apid },
      modelIsEmpty: { type: 'boolean', value: stub.modelIsEmpty },
      groundDate: { type: 'time', value: stub.groundDate },
    });
    
  });
});