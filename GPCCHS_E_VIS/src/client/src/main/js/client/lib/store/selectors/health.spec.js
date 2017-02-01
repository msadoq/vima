import globalConstants from 'common/constants';
import { should, getStore } from '../../common/test';
import {
  getLastPubSubTimestamp,
  getDcStatus,
  getHssStatus,
} from './health';

describe('store:health:selectors', () => {
  describe('getLastPubSubTimestamp', () => {
    it('should return status', () => {
      const { getState } = getStore({ health: { lastPubSubTimestamp: 42 } });
      getLastPubSubTimestamp(getState()).should.eql(42);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getLastPubSubTimestamp(getState()));
    });
  });
  describe('getDcStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        health: {
          dcStatus: globalConstants.DC_STATUS_CONGESTION
        },
      });
      getDcStatus(getState()).should.eql(globalConstants.DC_STATUS_CONGESTION);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getDcStatus(getState()));
    });
  });
  describe('getHssStatus', () => {
    it('should return status', () => {
      const { getState } = getStore({
        health: {
          hssStatus: globalConstants.HSS_STATUS_WARNING
        },
      });
      getHssStatus(getState()).should.eql(globalConstants.HSS_STATUS_WARNING);
    });
    it('should support empty state', () => {
      const { getState } = getStore({ health: {} });
      should.not.exist(getHssStatus(getState()));
    });
  });
});