// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus014ForwardedPacket');
const stub = require('./pus014ForwardedPacket.stub')();



describe('protobuf/isis/pusModelEditorMessages/Pus014ForwardedPacket', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus014ForwardedPacket.proto`, { keepCase: true })
    .lookup('pusModelEditorMessages.protobuf.Pus014ForwardedPacket');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      packetApid: { type: 'uinteger', value: stub.packetApid },
      forwardingStatusTypeSubtype: { type: 'uinteger', value: stub.forwardingStatusTypeSubtype },
      lastUpdateModeFwdStatusTypeSubtype: { type: 'uinteger', value: stub.lastUpdateModeFwdStatusTypeSubtype },
      lastUpdateTimeFwdStatusTypeSubtype: { type: 'string', value: stub.lastUpdateTimeFwdStatusTypeSubtype },
      packetApidName: { type: 'string', value: stub.packetApidName },
      serviceApid: { type: 'uinteger', value: stub.serviceApid },
      packetName: { type: 'string', value: stub.packetName },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      rid: { type: 'uinteger', value: stub.rid },
      lastUpdateModeRid: { type: 'uinteger', value: stub.lastUpdateModeRid },
      lastUpdateTimeRid: { type: 'string', value: stub.lastUpdateTimeRid },
      ridLabel: { type: 'string', value: stub.ridLabel },
      sid: { type: 'uinteger', value: stub.sid },
      lastUpdateModeSid: { type: 'uinteger', value: stub.lastUpdateModeSid },
      lastUpdateTimeSid: { type: 'string', value: stub.lastUpdateTimeSid },
      subsamplingRatio: { type: 'uinteger', value: stub.subsamplingRatio },
      lastUpdateModeSubSamplingRatio: { type: 'uinteger', value: stub.lastUpdateModeSubSamplingRatio },
      lastUpdateTimeSubSamplingRatio: { type: 'string', value: stub.lastUpdateTimeSubSamplingRatio },
      sidLabel: { type: 'string', value: stub.sidLabel },
      serviceType: { type: 'uinteger', value: stub.serviceType },
      serviceSubType: { type: 'uinteger', value: stub.serviceSubType },
      lastUpdateModeTypeSubType: { type: 'uinteger', value: stub.lastUpdateModeTypeSubType },
      lastUpdateTimeTypeSubType: { type: 'string', value: stub.lastUpdateTimeTypeSubType },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      status: { type: 'uinteger', value: stub.status },
      packetType: { type: 'string', value: stub.packetType },
      forwardingStatusRidSid: { type: 'uinteger', value: stub.forwardingStatusRidSid },
      lastUpdateModeFwdStatusTypeRidSid: { type: 'uinteger', value: stub.lastUpdateModeFwdStatusTypeRidSid },
      lastUpdateTimeFwdStatusTypeRidSid: { type: 'string', value: stub.lastUpdateTimeFwdStatusTypeRidSid },
    });
    
  });
});
