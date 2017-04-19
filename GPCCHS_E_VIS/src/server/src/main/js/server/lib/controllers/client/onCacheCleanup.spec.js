const _concat = require('lodash/concat');
const dataStub = require('common/stubs/data');
const { decode } = require('common/protobuf');
const registeredCallbacks = require('common/callbacks');

const { should } = require('../../utils/test');
const {
  addRecord: registerQuery,
  getAll: getRegisteredQueries,
  cleanup: cleanRegisteredQueries,
} = require('../../models/registeredQueries');


const {
  clearFactory,
  getTimebasedDataModel,
  getOrCreateTimebasedDataModel,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');

const onCacheCleanup = require('./onCacheCleanup');

let calls = [];
const zmqEmulator = (payload) => {
  calls = _concat(calls, payload);
};

/* onCacheCleanup Test
 *
 * - check connectedData model for removed intervals and/or removed remoteIds
 * - check subscriptions model for removed remoteIds and/or removed dataId
 * - check timebasedData factory for removed records and/or removed model
 * - check zmq messages for timebasedSubscription if needed
 */

describe('controllers/client/onCacheCleanup', () => {
  // Declaring test data
  const dataId1 = dataStub.getDataId({ parameterName: 'data1' });
  const dataId2 = dataStub.getDataId({ parameterName: 'data2' });
  const remoteId1 = dataStub.getRemoteId(Object.assign({}, dataId1));
  const remoteId2 = dataStub.getRemoteId(Object.assign({}, dataId2));
  const queryId11 = 'queryId11';
  const interval11 = [0, 4];
  const queryId12 = 'queryId12';
  const interval12 = [6, 10];
  const queryId21 = 'queryId21';
  const interval21 = [0, 4];
  const queryId22 = 'queryId22';
  const interval22 = [6, 10];


  const ts1 = 1;
  const ts2 = 3;
  const ts3 = 7;
  const ts4 = 9;
  const rp = dataStub.getReportingParameter();
  const tbds = [
    { timestamp: ts1, payload: rp },
    { timestamp: ts2, payload: rp },
    { timestamp: ts3, payload: rp },
    { timestamp: ts4, payload: rp },
  ];

  beforeEach(() => {
    // Clear models and singletons
    connectedDataModel.cleanup();
    clearFactory();
    cleanRegisteredQueries();
    registeredCallbacks.clear();
    // Init models and singletons
    connectedDataModel.addRecord(dataId1);
    connectedDataModel.addRecord(dataId2);
    connectedDataModel.addRequestedInterval(remoteId1, queryId11, interval11);
    connectedDataModel.addRequestedInterval(remoteId1, queryId12, interval12);
    connectedDataModel.addRequestedInterval(remoteId2, queryId21, interval21);
    connectedDataModel.addRequestedInterval(remoteId2, queryId22, interval22);
    registerQuery(queryId11, remoteId1);
    registerQuery(queryId12, remoteId1);
    registerQuery(queryId21, remoteId2);
    registerQuery(queryId22, remoteId2);
    const timebasedDataModel11 = getOrCreateTimebasedDataModel(remoteId1);
    const timebasedDataModel21 = getOrCreateTimebasedDataModel(remoteId2);

    timebasedDataModel11.addRecords(tbds);
    timebasedDataModel21.addRecords(tbds);
  });

  it('not all intervals expired', () => {
    // init test
    const dataMap = {
      perRemoteId: {
        [remoteId1]: { localIds: { localId: { } } },
        [remoteId2]: {
          localIds: {
            localId: { },
            localId2: { },
          },
        },
      },
      expectedIntervals: {
        [remoteId1]: { localId: { expectedInterval: interval12 } },
        [remoteId2]: {
          localId: { expectedInterval: interval21 },
          localId2: { expectedInterval: interval22 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(2);
    connectedData[0].should.have.properties(
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      });
    connectedData[1].should.have.properties(
      {
        flatDataId: remoteId2,
        dataId: dataId2,
        intervals: {
          all: [interval21, interval22],
          received: [],
          requested: {
            [queryId21]: interval21,
            [queryId22]: interval22,
          },
        },
      });
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(3);
    queries.should.have.properties([
      { queryId: queryId12, flatDataId: remoteId1 },
      { queryId: queryId21, flatDataId: remoteId2 },
      { queryId: queryId22, flatDataId: remoteId2 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    const tbdModel2 = getTimebasedDataModel(remoteId2);
    tbdModel1.count().should.equal(2);
    tbdModel2.count().should.equal(4);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    tbdModel2.find().should.have.properties([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    calls.should.have.lengthOf(0);
    // check registered callbacks
    Object.keys(registeredCallbacks.getAll()).should.have.lengthOf(0);
  });

  it('all intervals expired', () => {
    // init test
    const dataMap = {
      perRemoteId: {
        [remoteId1]: { localIds: { localId: {} } },
        [remoteId2]: {
          localIds: {
            localId: { },
            localId2: { },
          },
        },
      },
      expectedIntervals: {
        [remoteId1]: {
          localId: { expectedInterval: interval12 },
        },
        [remoteId2]: {
          localId: { expectedInterval: interval21 },
          localId2: { expectedInterval: interval22 },
        },
      },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(2);
    connectedData.should.have.properties([
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      }, {
        flatDataId: remoteId2,
        dataId: dataId2,
        intervals: {
          all: [interval21, interval22],
          received: [],
          requested: { [queryId21]: interval21, [queryId22]: interval22 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(3);
    queries.should.have.properties([
      { queryId: queryId12, flatDataId: remoteId1 },
      { queryId: queryId21, flatDataId: remoteId2 },
      { queryId: queryId22, flatDataId: remoteId2 },
    ]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    const tbdModel2 = getTimebasedDataModel(remoteId2);
    tbdModel1.count().should.equal(2);
    tbdModel2.count().should.equal(4);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    tbdModel2.find().should.have.properties([
      { timestamp: ts1, payload: rp },
      { timestamp: ts2, payload: rp },
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    calls.should.have.lengthOf(0);
    // check registered callbacks
    Object.keys(registeredCallbacks.getAll()).should.have.lengthOf(0);
  });

  it('subscription no longer needed', () => {
    // init test
    const dataMap = {
      perRemoteId: { [remoteId1]: { localIds: { localId: { } } } },
      expectedIntervals: { [remoteId1]: { localId: { expectedInterval: interval12 } } },
    };
    // launch test
    onCacheCleanup(zmqEmulator, dataMap);
    // check connectedData model
    const connectedData = connectedDataModel.find();
    connectedData.should.have.lengthOf(1);
    connectedData.should.have.properties([
      {
        flatDataId: remoteId1,
        dataId: dataId1,
        intervals: {
          all: [interval12],
          received: [],
          requested: { [queryId12]: interval12 },
        },
      },
    ]);
    // check registered queries
    const queries = getRegisteredQueries();
    queries.should.have.lengthOf(1);
    queries.should.have.properties([{ queryId: queryId12, flatDataId: remoteId1 }]);
    // check timebasedData model
    const tbdModel1 = getTimebasedDataModel(remoteId1);
    should.not.exist(getTimebasedDataModel(remoteId2));
    tbdModel1.count().should.equal(2);
    tbdModel1.find().should.have.properties([
      { timestamp: ts3, payload: rp },
      { timestamp: ts4, payload: rp },
    ]);
    // check zmq message
    calls.should.have.lengthOf(4);
    calls[0].should.have.properties(dataStub.getTimebasedSubscriptionHeaderProtobuf());
    const subId = decode('dc.dataControllerUtils.String', calls[1]).string;
    calls[2].should.have.properties(dataStub.getDataIdProtobuf(dataId2));
    calls[3].should.have.properties(dataStub.getDeleteActionProtobuf());
    // check registered callbacks
    const ids = Object.keys(registeredCallbacks.getAll());
    ids.should.have.lengthOf(1);
    ids[0].should.equal(subId);
  });
});
