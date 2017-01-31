require('../../utils/test');
const { testHandler, getTestHandlerArgs, resetTestHandlerArgs } = require('../../utils/test');
const { add: addToDataQueue, reset: resetDataQueue, get: getDataQueue } = require('../../models/dataQueue');
const globalConstants = require('common/constants');
const { reset: resetDcStatus, set: setDcStatus } = require('../../models/dcStatus');
const { reset: resetLastPubSubTimestamp, set: setLastPubSubTimestamp } = require('../../models/lastPubSubTimestamp');
const onPull = require('./onPull');

describe('controllers/client/onPull', () => {
  beforeEach(() => {
    resetDataQueue();
    resetTestHandlerArgs();
    resetLastPubSubTimestamp();
  });
  it('empty queue', () => {
    const myQueryId = 'myQueryId';
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({
      dcStatus: globalConstants.DC_STATUS_HEALTHY,
      hssStatus: true,
      lastPubSubTimestamp: undefined,
      data: {},
    });
  });
  it('should push data', () => {
    setDcStatus(globalConstants.DC_STATUS_CONGESTION);
    setLastPubSubTimestamp(42);
    const myRemoteId = 'myRemoteId';
    const myQueryId = 'myQueryId';
    const myValue = 'myValue';
    addToDataQueue(myRemoteId, myQueryId, myValue);
    onPull(testHandler, myQueryId);
    // check data
    const wsArgs = getTestHandlerArgs();
    wsArgs.should.have.lengthOf(2);
    wsArgs[0].should.equal(myQueryId);
    wsArgs[1].should.be.an('object').that.deep.equals({
      dcStatus: globalConstants.DC_STATUS_CONGESTION,
      lastPubSubTimestamp: 42,
      hssStatus: globalConstants.DC_STATUS_HEALTHY,
      data: {
        [myRemoteId]: {
          [myQueryId]: myValue,
        },
      },
    });
    getDataQueue().should.eql({});
  });
});
