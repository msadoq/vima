const _isEmpty = require('lodash/isEmpty');
const _keys = require('lodash/keys');
const _pull = require('lodash/pull');
const _concat = require('lodash/concat');

const dataStub = require('common/stubs/data');

const { should } = require('../../utils/test');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');
const {
  cleanup: cleanRegisteredQueries,
  getAll: getAllRegisteredQueries,
} = require('../../models/registeredQueries');
const registeredCallbacks = require('common/callbacks');

const connectedDataModel = require('../../models/connectedData');
const { clearFactory, getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');

const onTimebasedQuery = require('./onTimebasedQuery');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

/**
 * onTimebasedPubSubData test
 *
 * - check registerQueries for the queryId
 * - check registerQueries for the queryId
 * - check zmq messages for both timebasedQuery and timebasedSubscription if needed
 * - check connectedDataModel for requested interval
 * - check subscriptionsModel for dataId and flatDataIds
 * - check ws messages for timebasedData
 *
 */

describe('controllers/client/onTimebasedQuery', () => {
  beforeEach(() => {
    cleanRegisteredQueries();
    registeredCallbacks.clear();
    connectedDataModel.cleanup();
    clearFactory();
    resetQueue();
    calls.length = 0;
  });

  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);
  const flatDataId = dataStub.getRemoteId(dataId);
  const interval = [1, 5];
  const intervalProto = dataStub.getTimeIntervalProtobuf({
    startTime: { ms: 1 },
    endTime: { ms: 5 },
  });

  const rp = dataStub.getReportingParameter();
  const t1 = 3;
  const t2 = 5;

  const payloads = [
    { timestamp: t1, payload: rp },
    { timestamp: t2, payload: rp },
  ];

  const query = {
    [flatDataId]: {
      dataId,
      intervals: [interval],
    },
  };


  it('should not crash when receiving an invalid payload', () => {
    onTimebasedQuery(zmqEmulator, {});
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
    onTimebasedQuery(zmqEmulator, { queries: {} });
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
    onTimebasedQuery(zmqEmulator, { queries: { string: 'text' } });
    _isEmpty(getAllRegisteredQueries()).should.equal(true);
    _isEmpty(registeredCallbacks.getAll()).should.equal(true);
    calls.length.should.equal(0);
    getQueue().should.eql({});
  });

  describe('query', () => {
    it('interval not missing', () => {
      // init test
      connectedDataModel.addRecord(dataId);
      connectedDataModel.addRequestedInterval(flatDataId, 'queryId', interval);
      const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: query });
      // check registeredQueries
      _isEmpty(getAllRegisteredQueries()).should.equal(true);
      // check registeredCallbacks
      _isEmpty(registeredCallbacks.getAll()).should.equal(true);
      // check zmq messages
      calls.length.should.equal(0);
      // check ws messages
      getQueue().should.have.properties({
        [flatDataId]: {
          [payloads[1].timestamp]: payloads[1].payload,
        },
      });
      Object.keys(getQueue()[flatDataId]).should.have.lengthOf(2);
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        intervals: {
          all: [interval],
          requested: { queryId: interval },
          received: [],
        },
      });
    });

    it('interval missing', () => {
      // init test
      const otherQueryId = 'otherId';
      const otherInterval = [5, 42];
      connectedDataModel.addRecord(dataId);
      connectedDataModel.addRequestedInterval(flatDataId, otherQueryId, otherInterval);
      const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: query });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      queryIds.length.should.equal(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      calls.length.should.equal(4);
      calls[0].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[1].should.have.properties(queryIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(intervalProto);
      // check ws messages
      getQueue().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        dataId,
        intervals: {
          all: [[1, 42]],
          requested: { [otherQueryId]: otherInterval, [queryId]: interval },
          received: [],
        },
      });
    });

    it('dataId not in subscriptions', () => {
      // init test
      const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
      timebasedDataModel.addRecords(payloads);
      // launch test
      onTimebasedQuery(zmqEmulator, { queries: query });
      // check registeredQueries
      const queryIds = getAllRegisteredQueries();
      queryIds.length.should.equal(1);
      const queryId = queryIds[0].queryId;
      // check registeredCallbacks
      should.exist(registeredCallbacks.get(queryId));
      const callbackIds = _keys(registeredCallbacks.getAll());
      callbackIds.length.should.equal(2);
      const subId = _pull(callbackIds, queryId)[0];
      // check zmq messages
      const queryIdProto = dataStub.getStringProtobuf(queryId);
      const subIdProto = dataStub.getStringProtobuf(subId);
      calls.length.should.equal(8);
      calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
      calls[1].should.have.properties(subIdProto);
      calls[2].should.have.properties(dataIdProto);
      calls[3].should.have.properties(dataStub.getAddActionProtobuf());
      calls[4].should.have.properties(dataStub.getTimebasedQueryHeaderProtobuf());
      calls[5].should.have.properties(queryIdProto);
      calls[6].should.have.properties(dataIdProto);
      calls[7].should.have.properties(intervalProto);
      // check ws messages
      getQueue().should.have.properties({});
      // check connectedDataModel
      connectedDataModel.count().should.equal(1);
      const connectedData = connectedDataModel.find();
      connectedData[0].should.have.properties({
        flatDataId,
        intervals: {
          all: [interval],
          requested: { [queryId]: interval },
          received: [],
        },
      });
    });
  });
});
