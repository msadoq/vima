const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const onSessionsData = require('./onSessionsData');
const dataStub = require('common/protobuf/stubs');

describe('controllers/utils/onSessionData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });

  it('works', () => {
    // init test
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySessions = dataStub.getSessions();
    const mySessionsProto = dataStub.getSessionsProtobuf(mySessions);
    // launch test
    onSessionsData(testHandler, myQueryIdProto, mySessionsProto);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object')
      .that.have.properties({
        sessions: mySessions.sessions,
      });
  });
});