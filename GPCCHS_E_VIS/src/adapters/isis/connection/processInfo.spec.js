// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./processInfo');
const { getProcessInfo } = require('../stubs');



describe('protobuf/isis/connection/ProcessInfo', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/ProcessInfo.proto`, { keepCase: true })
    .lookup('connection.protobuf.ProcessInfo');
  const fixture = getProcessInfo();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      name: { type: 'string', value: fixture.name },
    });
    
    
  });
});
