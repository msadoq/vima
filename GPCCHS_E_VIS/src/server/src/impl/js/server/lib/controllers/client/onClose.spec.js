require('../../utils/test');
const { decode } = require('../../protobuf');
const { close } = require('./onClose');
const connectedDataModel = require('../../models/connectedData');
const subscriptionsModel = require('../../models/subscriptions');
const { clearFactory, addTimebasedDataModel } = require('../../models/timebasedDataFactory');
const registeredQueries = require('../../utils/registeredQueries');
const { add, get } = require('../../utils/dataQueue');
const { setDomains, getDomains } = require('../../utils/domains');
const constants = require('../../constants');
const {
  getDataId,
  getRemoteId,
  getReportingParameter,
  getReportingParameterProtobuf,
} = require('../../stubs/data');
const {
  concat: _concat,
  now: _now,
} = require('lodash');

let calls = [];
const zmqEmulator = (key, payload) => {
  key.should.be.a('string')
    .that.equal('dcPush');
  calls = _concat(calls, payload);
};

describe('controllers/client/onClose', () => {
  beforeEach(() => {
    registeredQueries.clear();
    subscriptionsModel.cleanup();
    clearFactory();
    connectedDataModel.cleanup();
    calls = [];
    add('myRemoteId', { myKey: 'value' });
  });
  it('should cleanup HSS state', () => {
    const myDataId = getDataId();
    const myRemoteId = getRemoteId(myDataId);
    const myRp = getReportingParameter();
    const proto = getReportingParameterProtobuf(myRp);

    subscriptionsModel.addRecord(myDataId);
    const timebasedDataModel = addTimebasedDataModel(myRemoteId);
    timebasedDataModel.addRecord(_now(), proto);
    connectedDataModel.addRequestedInterval(myRemoteId, 'queryId', [42, 42]);
    setDomains([1]);
    registeredQueries.set('queryId', myRemoteId);

    // call it
    close(zmqEmulator);

    get().should.eql({});

    calls.should.be.an('array')
      .that.has.lengthOf(4);
    calls[0].constructor.should.equal(Buffer);
    const messageType = decode('dc.dataControllerUtils.Header', calls[0]).messageType;
    messageType.should.equal(constants.MESSAGETYPE_TIMEBASED_SUBSCRIPTION);
    const dataId = decode('dc.dataControllerUtils.DataId', calls[2]);
    dataId.should.have.properties(myDataId);
    const action = decode('dc.dataControllerUtils.Action', calls[3]).action;
    action.should.equal(constants.SUBSCRIPTIONACTION_DELETE);

    const connectedData = connectedDataModel.find();
    connectedData.should.be.an('array')
      .that.have.lengthOf(0);
    const subscriptions = subscriptionsModel.find();
    subscriptions.should.be.an('array')
      .that.have.lengthOf(0);
    const timebasedData = timebasedDataModel.find();
    timebasedData.should.be.an('array')
      .that.have.lengthOf(0);
    getDomains().should.be.an('array')
      .that.has.lengthOf(0);
    Object.keys(registeredQueries.getAll()).should.have.lengthOf(0);
  });
});
