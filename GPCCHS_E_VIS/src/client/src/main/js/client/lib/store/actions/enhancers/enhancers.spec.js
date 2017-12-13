import __ from 'lodash/fp';
import { freezeArgs } from 'common/jest';
import addUuidsToEntryPoints from './addUuidsToEntryPoints';
import ifPathChanged from './ifPathChanged';

const createDummyAction = freezeArgs((payload = {}) => ({
  type: 'DUMMY_ACTION',
  payload,
  meta: { },
}));

describe('store:actions:enhancers', () => {
  describe('addUuidsToEntryPoints', () => {
    test('should does nothing', () => {
      const action = createDummyAction();
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      expect(enhancedAction).toEqual(action);
    });
    test('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoint: {} } });
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      expect(typeof enhancedAction.payload.configuration.entryPoint.id).toBe('string');
      expect(enhancedAction).not.toEqual(action);
    });
    test('should generate uuid in entryPoint', () => {
      const action = createDummyAction({ configuration: { entryPoints: [{}, {}, {}] } });
      const enhancedAction = addUuidsToEntryPoints(__.constant(action))();
      enhancedAction.payload.configuration.entryPoints.forEach((ep) => {
        expect(typeof ep.id).toBe('string');
      });
      expect(enhancedAction).not.toEqual(action);
    });
  });
  describe('ifPathChanged', () => {
    const dispatch = __.identity;
    const getState = __.constant({
      views: {
        v1: {
          path: '/',
        },
      },
    });
    test('dispatches with null newPath', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: null });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeDefined();
      expect(result).toMatchObject({
        type: 'DUMMY_ACTION',
        payload: { viewId: 'v1', newPath: null },
      });
    });
    test('does nothing if unknown view', () => {
      const action = createDummyAction({ viewId: 'unknown' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeFalsy();
    });
    test('does nothing if resolved path are not different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '/..' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result).toBeFalsy();
    });
    test('dispatches action if resolved path are different', () => {
      const action = createDummyAction({ viewId: 'v1', newPath: '.' });
      const thunk = ifPathChanged(__.constant(action));
      const result = thunk()(dispatch, getState);
      expect(result.payload.newPath).toEqual('.');
      expect(result).toBeDefined();
    });
  });
});
