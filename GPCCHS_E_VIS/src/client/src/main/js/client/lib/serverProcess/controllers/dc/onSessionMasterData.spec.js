const dataStub = require('common/protobuf/stubs');
const protobuf = require('common/protobuf');

const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');


const onSessionMasterData = require('./onSessionMasterData');


describe('controllers/client/onSessionMasterData', () => {
  beforeEach(() => {
    resetTestHandlerArgs();
  });
  it('works', () => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myUinteger = 42;
    const myUintegerProto = protobuf.encode(protobuf.getType('UINTEGER'), { value: myUinteger });
    // launch test
    onSessionMasterData(testHandler, myQueryIdProto, myUintegerProto);
    // check data
    const message = getTestHandlerArgs();
    expect(message).toHaveLength(2);
    expect(message[0]).toBe(myQueryId);
    expect(message[1]).toMatchObject({
      masterSessionId: myUinteger,
    });
  });
});
