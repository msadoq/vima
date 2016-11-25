require('../../../../utils/test');
const protobuf = require('../../../index');
const stubData = require('../../../../stubs/data');

describe('protobuf/dc/dataControllerUtils/dataId', () => {
  const fixture = stubData.getDataId();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('dc.dataControllerUtils.DataId', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('dc.dataControllerUtils.DataId', buffer);
    json.should.be.an('object').that.have.properties(fixture);
  });
});