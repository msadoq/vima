const debug = require('../io/debug')('models:intervals.spec');
require('../utils/test');
const model = require('./connectedData');
const { getDataId } = require('../stubs/data');
const getLocalId = require('../models/getLocalId');

describe('models/connectedData', () => {
  beforeEach(() => {
    model.cleanup();
  });

  describe('addRequestedInterval', () => {
    const myDataId = getDataId({ parameterName: 'dataId' });
    const myDataId2 = getDataId({ parameterName: 'dataId2' });
    const myQueryId = 'queryId';
    const myInterval = [0, 2];
    const myQueryId2 = 'queryId2';
    const myInterval2 = [4, 8];

    it('one', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array').and.have.lengthOf(1);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals');
      connectedData[0].intervals.should.be.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object');
      connectedData[0].requested.should.have.an.property(myQueryId);
      connectedData[0].requested[myQueryId].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].requested[myQueryId][1].should.equal(myInterval[1]);
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(0);
    });

    it('one and multi intervals', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      model.addRequestedInterval(myDataId, myQueryId2, myInterval2);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object');
      connectedData[0].requested.should.have.an.property(myQueryId);
      connectedData[0].requested[myQueryId].should.be.an('array').that.have.lengthOf(2);
      connectedData[0].requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].requested[myQueryId][1].should.equal(myInterval[1]);
      connectedData[0].requested.should.have.an.property(myQueryId2);
      connectedData[0].requested[myQueryId2].should.be.an('array').that.have.lengthOf(2);
      connectedData[0].requested[myQueryId2][0].should.equal(myInterval2[0]);
      connectedData[0].requested[myQueryId2][1].should.equal(myInterval2[1]);
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(0);
    });

    it('multi', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      model.addRequestedInterval(myDataId2, myQueryId2, myInterval2);
      model.count().should.equal(2);
      const connectedData = model.find();
      connectedData.should.be.an('array').and.have.lengthOf(2);
      connectedData[0].should.be.an('object');
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array').that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.be.an('object');
      connectedData[0].requested.should.have.an.property(myQueryId);
      connectedData[0].requested[myQueryId].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].requested[myQueryId][0].should.equal(myInterval[0]);
      connectedData[0].requested[myQueryId][1].should.equal(myInterval[1]);
      connectedData[1].should.be.an('object');
      connectedData[1].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId2));
      connectedData[1].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId2);
      connectedData[1].should.have.an.property('intervals');
      connectedData[1].intervals.should.be.an('array')
        .that.have.lengthOf(0);
      connectedData[1].should.have.an.property('requested')
        .that.is.an('object');
      connectedData[1].requested.should.have.an.property(myQueryId2);
      connectedData[1].requested[myQueryId2].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[1].requested[myQueryId2][0].should.equal(myInterval2[0]);
      connectedData[1].requested[myQueryId2][1].should.equal(myInterval2[1]);
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(0);
    });
  });

  describe('setIntervalAsReceived', () => {
    const myDataId = getDataId();
    const myQueryId = 'queryId';
    const myInterval = [0, 2];

    it('one', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      model.setIntervalAsReceived(myDataId, myQueryId);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.have.an.property('intervals');
      connectedData[0].intervals.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].intervals[0].should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].intervals[0][0].should.equal(myInterval[0]);
      connectedData[0].intervals[0][1].should.equal(myInterval[1]);
      connectedData[0].should.have.an.property('requested');
      connectedData[0].requested.should.be.an('object')
        .and.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
    });
  });

  describe('isTimestampInKnownIntervals', () => {
    const timestamp = Date.now();
    const myDataId = getDataId();
    const myQueryId = 'queryId';
    const myInterval = [timestamp - 1, timestamp + 1];
    const myWrongInterval = [timestamp + 1, timestamp + 2];

    it('no intervals', () => {
      const result = model.isTimestampInKnownIntervals(myDataId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('no', () => {
      model.addRequestedInterval(myDataId, myQueryId, myWrongInterval);
      const result = model.isTimestampInKnownIntervals(myDataId, timestamp);
      result.should.be.an('boolean').and.be.equal(false);
    });
    it('yes', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      const result = model.isTimestampInKnownIntervals(myDataId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
    });
    it('yes in received', () => {
      model.addRequestedInterval(myDataId, myQueryId, myInterval);
      model.setIntervalAsReceived(myDataId, myQueryId);
      const result = model.isTimestampInKnownIntervals(myDataId, timestamp);
      result.should.be.an('boolean').and.be.equal(true);
    });
  });

  describe('retrieveMissingIntervals', () => {
    const myDataId = getDataId();
    const myInterval = [0, 10];

    it('noQuery', () => {
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('leftQuery', () => {
      const leftQueryId = 'left';
      const leftQueryInterval = [-5, 5];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('leftQuery in received', () => {
      const leftQueryId = 'left';
      const leftQueryInterval = [-5, 5];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.setIntervalAsReceived(myDataId, leftQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('rightQuery', () => {
      const rightQueryId = 'right';
      const rightQueryInterval = [5, 15];
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(rightQueryInterval[0]);
    });
    it('rightQuery in received', () => {
      const rightQueryId = 'right';
      const rightQueryInterval = [5, 15];
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      model.setIntervalAsReceived(myDataId, rightQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(rightQueryInterval[0]);
    });
    it('leftAndRightQueries', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, 2.5];
      const rightQueryInterval = [7.5, 15];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(rightQueryInterval[0]);
    });
    it('leftAndRightQueries in received', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, 2.5];
      const rightQueryInterval = [7.5, 15];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      model.setIntervalAsReceived(myDataId, leftQueryId);
      model.setIntervalAsReceived(myDataId, rightQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(rightQueryInterval[0]);
    });
    it('middleQuery', () => {
      const middleQueryId = 'middle';
      const middleQueryInterval = [2.5, 7.5];
      model.addRequestedInterval(myDataId, middleQueryId, middleQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(middleQueryInterval[0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(middleQueryInterval[1]);
      intervals[1][1].should.equal(myInterval[1]);
    });
    it('middleQuery in received', () => {
      const middleQueryId = 'middle';
      const middleQueryInterval = [2.5, 7.5];
      model.addRequestedInterval(myDataId, middleQueryId, middleQueryInterval);
      model.setIntervalAsReceived(myDataId, middleQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(middleQueryInterval[0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(middleQueryInterval[1]);
      intervals[1][1].should.equal(myInterval[1]);
    });
    it('threeQueries', () => {
      const leftQueryId = 'left';
      const middleQueryId = 'middle';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, 2];
      const middleQueryInterval = [4, 6];
      const rightQueryInterval = [8, 15];
      model.addRequestedInterval(myDataId, middleQueryId, middleQueryInterval);
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(middleQueryInterval[0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(middleQueryInterval[1]);
      intervals[1][1].should.equal(rightQueryInterval[0]);
    });
    it('threeQueries in received', () => {
      const leftQueryId = 'left';
      const middleQueryId = 'middle';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, 2];
      const middleQueryInterval = [4, 6];
      const rightQueryInterval = [8, 15];
      model.addRequestedInterval(myDataId, middleQueryId, middleQueryInterval);
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      model.setIntervalAsReceived(myDataId, middleQueryId);
      model.setIntervalAsReceived(myDataId, leftQueryId);
      model.setIntervalAsReceived(myDataId, rightQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(2);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(leftQueryInterval[1]);
      intervals[0][1].should.equal(middleQueryInterval[0]);
      intervals[1].should.be.an('array').that.has.lengthOf(2);
      intervals[1][0].should.equal(middleQueryInterval[1]);
      intervals[1][1].should.equal(rightQueryInterval[0]);
    });
    it('outsideLeftAndRightQueries', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, -2.5];
      const rightQueryInterval = [12.5, 15];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('outsideLeftAndRightQueries in received', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [-5, -2.5];
      const rightQueryInterval = [12.5, 15];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      model.setIntervalAsReceived(myDataId, leftQueryId);
      model.setIntervalAsReceived(myDataId, rightQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(1);
      intervals[0].should.be.an('array').that.has.lengthOf(2);
      intervals[0][0].should.equal(myInterval[0]);
      intervals[0][1].should.equal(myInterval[1]);
    });
    it('fullQuery', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [0, 5];
      const rightQueryInterval = [5, 10];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(0);
    });
    it('fullQuery in received', () => {
      const leftQueryId = 'left';
      const rightQueryId = 'right';
      const leftQueryInterval = [0, 5];
      const rightQueryInterval = [5, 10];
      model.addRequestedInterval(myDataId, leftQueryId, leftQueryInterval);
      model.addRequestedInterval(myDataId, rightQueryId, rightQueryInterval);
      model.setIntervalAsReceived(myDataId, leftQueryId);
      model.setIntervalAsReceived(myDataId, rightQueryId);
      const intervals = model.retrieveMissingIntervals(myDataId, myInterval);
      debug.debug('intervals', intervals);
      intervals.should.be.an('array').that.has.lengthOf(0);
    });
  });

  describe('addWindowId', () => {
    it('one', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(1);
      connectedData[0].windows[0].should.equal(myWindowId);
    });
    it('one with multiple ids', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      const myWindowId2 = 91;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId, myWindowId2);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(2);
      connectedData[0].windows[0].should.equal(myWindowId);
      connectedData[0].windows[1].should.equal(myWindowId2);
    });
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myWindowId = 42;
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      const myWindowId2 = 91;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId2, myWindowId2);
      model.count().should.equal(2);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(1);
      connectedData[0].windows[0].should.equal(myWindowId);
      connectedData[1].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId2));
      connectedData[1].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId2);
      connectedData[1].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[1].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[1].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(1);
      connectedData[1].windows[0].should.equal(myWindowId2);
    });
  });

  describe('removeWindowId', () => {
    it('does not exist', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.removeWindowId(myDataId, myWindowId);
      model.count().should.equal(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      model.removeWindowId(myDataId, myWindowId);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(0);
    });
    it('one amongst several', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      const myWindowId2 = 91;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId, myWindowId2);
      model.removeWindowId(myDataId, myWindowId);
      model.count().should.equal(1);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(1);
      connectedData[0].windows[0].should.equal(myWindowId2);
    });
  });

  describe('isConnectedDataInWindows', () => {
    it('does not exist', () => {
      const myDataId = getDataId();
      const res = model.isConnectedDataInWindows(myDataId);
      res.should.be.an('boolean')
        .that.equal(false);
    });
    it('no more', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      model.removeWindowId(myDataId, myWindowId);
      const res = model.isConnectedDataInWindows(myDataId);
      res.should.be.an('boolean')
        .that.equal(false);
    });
    it('yes', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      const res = model.isConnectedDataInWindows(myDataId);
      res.should.be.an('boolean')
        .that.equal(true);
    });
    it('yes multi', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      const myWindowId2 = 91;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId, myWindowId2);
      const res = model.isConnectedDataInWindows(myDataId);
      res.should.be.an('boolean')
        .that.equal(true);
    });
  });
  describe('retrieveByWindow', () => {
    it('none', () => {
      const myWindowId = 42;
      const connectedData = model.retrieveByWindow(myWindowId);
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId();
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      const connectedData = model.retrieveByWindow(myWindowId);
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.have.an.property('localId')
        .that.equal(getLocalId(myDataId));
      connectedData[0].should.have.an.property('dataId')
        .that.is.an('object')
        .that.has.properties(myDataId);
      connectedData[0].should.have.an.property('intervals')
        .that.is.an('array')
        .that.have.lengthOf(0);
      connectedData[0].should.have.an.property('requested')
        .that.is.an('object')
        .that.have.properties({});
      connectedData[0].should.have.an.property('windows')
        .that.is.an('array')
        .that.have.lengthOf(1);
      connectedData[0].windows[0].should.equal(myWindowId);
    });
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      const myDataId3 = getDataId({ parameterName: 'dataId3' });
      const myWindowId = 42;
      const myWindowId2 = 91;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId, myWindowId2);
      model.addWindowId(myDataId2, myWindowId2);
      model.addWindowId(myDataId3, myWindowId);
      const connectedData = model.retrieveByWindow(myWindowId);
      connectedData.should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[1].should.have.properties({
        localId: getLocalId(myDataId),
        dataId: myDataId,
        intervals: [],
        requested: {},
        windows: [myWindowId, myWindowId2],
      });
      connectedData[0].should.have.properties({
        localId: getLocalId(myDataId3),
        dataId: myDataId3,
        intervals: [],
        requested: {},
        windows: [myWindowId],
      });
    });
  });
  describe('exists', () => {

  });
  describe('removeByDataId', () => {
    it('not existing', () => {
      const myDataId = getDataId();
      model.removeByDataId(myDataId);
      const connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('', () => {
      const myDataId = getDataId();
      model.addWindowId(myDataId, 42);
      let connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      model.removeByDataId(myDataId);
      connectedData = model.find();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
  });
  describe('getAll', () => {
    it('none', () => {
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(0);
    });
    it('one', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(1);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          dataId: myDataId,
          intervals: [],
          requested: {},
          windows: [myWindowId],
        });
    });
    it('multi', () => {
      const myDataId = getDataId({ parameterName: 'dataId' });
      const myDataId2 = getDataId({ parameterName: 'dataId2' });
      const myDataId3 = getDataId({ parameterName: 'dataId3' });
      const myWindowId = 42;
      model.addWindowId(myDataId, myWindowId);
      model.addWindowId(myDataId2, myWindowId);
      model.addWindowId(myDataId3, myWindowId);
      model.removeByDataId(myDataId3);
      const connectedData = model.getAll();
      connectedData.should.be.an('array')
        .that.have.lengthOf(2);
      connectedData[0].should.be.an('object')
        .that.has.properties({
          dataId: myDataId,
          intervals: [],
          requested: {},
          windows: [myWindowId],
        });
      connectedData[1].should.be.an('object')
        .that.has.properties({
          dataId: myDataId2,
          intervals: [],
          requested: {},
          windows: [myWindowId],
        });
    });
  });
});
