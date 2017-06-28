const ProtoBuf = require('protobufjs');
const adapter = require('./timestamp');
const stub = require('./timestamp.stub');


describe('protobuf/utils/dataControllerUtils/timestamp', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Timestamp.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.Timestamp');
  const fixture = stub.getTimestamp();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});