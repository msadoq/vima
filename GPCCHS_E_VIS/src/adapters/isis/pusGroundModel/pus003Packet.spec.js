// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus003Packet');
const stub = require('./pus003Packet.stub')();



describe('protobuf/isis/pusGroundModel/Pus003Packet', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus003Packet.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus003Packet');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      sid: { type: 'uinteger', value: stub.sid },
      validityParameterId: { type: 'uinteger', value: stub.validityParameterId },
      validityParameterMask: { type: 'string', value: stub.validityParameterMask },
      validityParameterExpectedValue: { type: 'double', symbol: stub.validityParameterExpectedValue.toString() },
      collectionInterval: { type: 'duration', value: stub.collectionInterval },
      status: { type: 'uinteger', value: stub.status },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: stub.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: stub.pusElement.lastUpdateTime },
      },
      sidLabel: { type: 'string', value: stub.sidLabel },
    });
    
  });
});