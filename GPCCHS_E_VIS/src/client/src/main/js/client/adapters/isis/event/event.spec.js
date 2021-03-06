// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./event');
const stub = require('./event.stub')();



describe('protobuf/isis/event/Event', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Event.proto`, { keepCase: true })
    .lookup('event.protobuf.Event');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      eventDate: { type: 'time', value: stub.eventDate },
      systemDate: { type: 'time', value: stub.systemDate },
      mission: { type: 'string', value: stub.mission },
      satellite: { type: 'ulong', symbol: `${stub.satellite}` },
      producer: {
        slotID: { type: 'ushort', value: stub.producer.slotID },
        factoryID: { type: 'ushort', value: stub.producer.factoryID },
        providerName: { type: 'string', value: stub.producer.providerName },
        network: { type: 'uoctet', value: stub.producer.network },
        session: { type: 'ulong', symbol: `${stub.producer.session}` },
        serviceProperties: { type: 'uinteger', value: stub.producer.serviceProperties },
        serviceAddress: {
          supportedCapabilities: { type: 'uinteger', value: stub.producer.serviceAddress.supportedCapabilities },
          supportedLevels: { type: 'uinteger', value: stub.producer.serviceAddress.supportedLevels },
          qoSproperties: { type: 'uinteger', value: stub.producer.serviceAddress.qoSproperties },
          priorityLevels: { type: 'uinteger', value: stub.producer.serviceAddress.priorityLevels },
          serviceURI: { type: 'uri', value: stub.producer.serviceAddress.serviceURI },
          dataURI: { type: 'uri', value: stub.producer.serviceAddress.dataURI },
          dataName: { type: 'string', value: stub.producer.serviceAddress.dataName },
        },
        providerProperties: { type: 'string', value: stub.producer.providerProperties },
        providerTime: { type: 'time', value: stub.producer.providerTime },
      },
    });
    
  });
});
