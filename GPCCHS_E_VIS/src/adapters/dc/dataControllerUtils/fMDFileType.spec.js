const ProtoBuf = require('protobufjs');
const adapter = require('./fMDFileType');
const stub = require('./fMDFileType.stub');


describe('protobuf/utils/dataControllerUtils/fMDFileType', () => {
  let buffer;
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/FMDFileType.proto`, {keepCase: true })  
    .lookup('dataControllerUtils.protobuf.FMDFileType');
  const fixture = stub.getFMDFileType();
  
  test('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    expect(adapter.decode(builder.decode(buffer))).toMatchObject(fixture);
  });
});