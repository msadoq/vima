const { testPayloads, testHandler } = require('../../utils/test');
const { message } = require('./onMessage');
const dataStub = require('../../stubs/data');

describe('onMessage', () => {
  beforeEach(() => {
    testPayloads.length = 0;
  });
  it('Response', () => {
    const header = dataStub.getResponseHeaderProtobuf();
    const queryId = dataStub.getStringProtobuf();
    const status = dataStub.getSuccessStatusProtobuf();
    message(
      testHandler,
      undefined,
      undefined,
      undefined,
      header,
      queryId,
      status
    );
    testPayloads.should.have.lengthOf(3);
    testPayloads.should.have.properties([
      queryId,
      status,
    ]);
  });
  it('Archive Data', () => {
    const header = dataStub.getTimebasedArchiveDataHeaderProtobuf();
    const queryId = dataStub.getStringProtobuf();
    const dataId = dataStub.getDataIdProtobuf();
    const isLast = dataStub.getBooleanProtobuf();
    const timestamp = dataStub.getTimestampProtobuf();
    const payload = dataStub.getReportingParameterProtobuf();
    message(
      undefined,
      undefined,
      testHandler,
      undefined,
      header,
      queryId,
      dataId,
      isLast,
      timestamp,
      payload,
      timestamp,
      payload
    );
    testPayloads.should.have.lengthOf(7);
    testPayloads.should.have.properties([
      queryId,
      dataId,
      isLast,
      timestamp,
      payload,
      timestamp,
      payload,
    ]);
  });
  it('PubSub Data', () => {
    const header = dataStub.getTimebasedPubSubDataHeaderProtobuf();
    const dataId = dataStub.getDataIdProtobuf();
    const timestamp = dataStub.getTimestampProtobuf();
    const payload = dataStub.getReportingParameterProtobuf();
    message(
      undefined,
      undefined,
      undefined,
      testHandler,
      header,
      dataId,
      timestamp,
      payload,
      timestamp,
      payload
    );
    testPayloads.should.have.lengthOf(5);
    testPayloads.should.have.properties([
      dataId,
      timestamp,
      payload,
      timestamp,
      payload,
    ]);
  });
  it('Domain Data', () => {
    const header = dataStub.getDomainDataHeaderProtobuf();
    const queryId = dataStub.getDataIdProtobuf();
    const domain = dataStub.getDomainProtobuf();
    message(
      undefined,
      testHandler,
      undefined,
      undefined,
      header,
      queryId,
      domain,
      domain,
      domain
    );
    testPayloads.should.have.lengthOf(4);
    testPayloads.should.have.properties([
      queryId,
      domain,
      domain,
      domain,
    ]);
  });
});
