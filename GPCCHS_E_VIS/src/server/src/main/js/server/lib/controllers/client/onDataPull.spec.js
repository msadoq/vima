const onDataPull = require('./onDataPull');
const dataStub = require('common/stubs/data');
const { getOrCreateTimebasedDataModel } = require('../../models/timebasedDataFactory');
const { get: getQueue, reset: resetQueue } = require('../../models/dataQueue');

describe('controllers/client/onDataPull', () => {
  beforeEach(() => {
    resetQueue();
  });

  const rp = dataStub.getReportingParameter();
  const t1 = 3;
  const t2 = 5;
  const dataId = dataStub.getDataId();
  const flatDataId = dataStub.getRemoteId(dataId);
  const intervalRange = [1, 5];
  const intervalLast = [1, 10];

  const payloads = [
    { timestamp: t1, payload: rp },
    { timestamp: t2, payload: rp },
  ];
  const queryRange = {
    [flatDataId]: {
      dataId,
      last: [],
      range: [intervalRange],
    },
  };
  const queryLast = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [],
    },
  };
  const query = {
    [flatDataId]: {
      dataId,
      last: [intervalLast],
      range: [intervalRange],
    },
  };
  const noQuery = {
    noDataId: {
      dataId,
      last: [intervalLast],
      range: [intervalRange],
    },
  };
  const noIntervalQuery = {
    noDataId: {
      dataId,
      last: [[100, 105]],
      range: [[100, 105]],
    },
  };

  it('invalid query', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: noQuery });
    // check ws messages
    getQueue().should.have.properties({});
  });
  it('invalid interval', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: noIntervalQuery });
    getQueue().should.have.properties({});
  });
  it('query last', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: queryLast });
    getQueue().should.have.properties({
      [flatDataId]: {
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
  it('query range', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: queryRange });
    getQueue().should.have.properties({
      [flatDataId]: {
        [payloads[0].timestamp]: payloads[0].payload,
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
  it('query range and last', () => {
    const timebasedDataModel = getOrCreateTimebasedDataModel(flatDataId);
    timebasedDataModel.addRecords(payloads);
    onDataPull({ queries: query });
    getQueue().should.have.properties({
      [flatDataId]: {
        [payloads[0].timestamp]: payloads[0].payload,
        [payloads[1].timestamp]: payloads[1].payload,
      },
    });
  });
});