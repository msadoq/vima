const { should } = require('../../utils/test');

const onTimebasedPubSubData = require('./onTimebasedPubSubData');
const {
  clearFactory,
  getTimebasedDataModel,
  getAllTimebasedDataModelRemoteIds,
} = require('../../models/timebasedDataFactory');
const connectedDataModel = require('../../models/connectedData');
const dataStub = require('common/stubs/data');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');
const {
  get: getLastPubSubTimestamp,
  reset: resetLastPubSubTimestamp,
} = require('../../models/lastPubSubTimestamp');

/* onTimebasedPubSubData Test
 *
 * - check payloads are stored in timebasedData model
 * - check ws messages for timebasedData
 *
 */

describe('controllers/utils/onTimebasedPubSubData', () => {
  beforeEach(() => {
    connectedDataModel.cleanup();
    clearFactory();
    resetQueue();
    resetLastPubSubTimestamp();
  });

  const queryId = 'queryId';
  const queryIdProto = dataStub.getStringProtobuf(queryId);
  const dataId = dataStub.getDataId();
  const dataIdProto = dataStub.getDataIdProtobuf(dataId);

  const t1 = 5;
  const t2 = 10;
  const halfInterval = [-15, 5];
  const timestamp1 = dataStub.getTimestampProtobuf({ ms: t1 });
  const timestamp2 = dataStub.getTimestampProtobuf({ ms: t2 });

  const rp = dataStub.getReportingParameter({ onboardDate: t1 });
  const rp2 = dataStub.getReportingParameter({ onboardDate: t2 });
  const protoRp = dataStub.getReportingParameterProtobuf(rp);
  const protoRp2 = dataStub.getReportingParameterProtobuf(rp2);
  const deprotoRp = dataStub.getReportingParameterDeProtobuf(protoRp);

  const remoteId = dataStub.getRemoteId(Object.assign({}, dataId));
  const remoteId2 = dataStub.getRemoteId(Object.assign({}, dataId, { domainId: 201 }));

  it('no dataId in subscriptions', () => {
    // init test
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    getAllTimebasedDataModelRemoteIds().should.have.lengthOf(0);
    getQueue().should.have.properties({});
    should.not.exist(getLastPubSubTimestamp());
  });

  it('no query for this dataId', () => {
    // init test
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    getAllTimebasedDataModelRemoteIds().should.have.lengthOf(0);
    getQueue().should.have.properties({});
    should.not.exist(getLastPubSubTimestamp());
  });

  it('one in interval', () => {
    // init test
    connectedDataModel.addRecord(dataId);
    connectedDataModel.addRequestedInterval(remoteId, queryId, halfInterval);
    // launch test
    onTimebasedPubSubData(
      queryIdProto,
      dataIdProto,
      timestamp1,
      protoRp,
      timestamp2,
      protoRp2
    );
    // check data
    should.not.exist(getTimebasedDataModel(remoteId2));
    const timebasedDataModel = getTimebasedDataModel(remoteId);
    should.exist(timebasedDataModel);
    timebasedDataModel.count().should.equal(1);
    const tbd = timebasedDataModel.find();
    tbd[0].should.have.properties({
      timestamp: t1,
      payload: deprotoRp,
    });
    getQueue().should.have.properties({
      [remoteId]: {
        [t1]: deprotoRp,
      },
    });
    getLastPubSubTimestamp().should.equal(t2);
  });
});
