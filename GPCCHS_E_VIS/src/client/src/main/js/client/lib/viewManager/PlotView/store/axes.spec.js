/* eslint no-unused-expressions: 0 */
import { freezeMe, should } from '../../../common/test';
import { updateAxis, addAxis, removeAxis, getAxes } from './axes';

describe('store:views:axes', () => {
  const state = freezeMe({
    axes: {
      axis_1: { label: 'AXIS1', id: 'axis_1', unit: 'volts' },
      axis_2: { label: 'AXIS2', id: 'axis_2', unit: 'seconds' },
      axis_1_1: {},
    },
  });
  describe('updateAxis', () => {
    it('does nothing when received an unknown viewId', () => {
      const newState = updateAxis(state, freezeMe({ payload: {} }));
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { } }));
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axisId', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axis: true } }));
      newState.should.be.eql(state);
    });
    it('updates axis', () => {
      const newState = updateAxis(state, freezeMe({ payload: { axisId: 'axis_1', axis: { someValues: true } } }));
      newState.should.not.be.eql(state);
      newState.axes.axis_1.someValues.should.be.true;
      newState.axes.axis_1.id.should.be.eql('axis_1');
    });
  });

  describe('addAxis', () => {
    it('does nothing when received an unknown axis', () => {
      const newState = addAxis(state, { payload: { } });
      newState.should.be.eql(state);
    });
    it('does nothing when received an axis without label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: {} } });
      newState.should.be.eql(state);
    });
    it('adds axis with given id', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'yolo', id: 'axis42' } } });
      newState.should.not.be.eql(state);
      newState.axes.axis42.should.eql({ label: 'yolo', id: 'axis42' });
      newState.axes.axis_1.should.eql(state.axes.axis_1);
    });
    it('adds axis generating new id from label', () => {
      const newState = addAxis(state, { payload: { viewId: 'view1', axis: { label: 'axis_1' } } });
      newState.should.not.be.eql(state);
      newState.axes.axis_1_2.should.eql({ label: 'axis_1', id: 'axis_1_2' });
      newState.axes.axis_1.should.eql(state.axes.axis_1);
    });
  });

  describe('removeAxis', () => {
    it('does nothing when no axisId', () => {
      const newState = removeAxis(state, { payload: { } });
      newState.should.be.eql(state);
    });
    it('does nothing when received an unknown axisId', () => {
      const newState = removeAxis(state, { payload: { axisId: 'unknown' } });
      newState.should.be.eql(state);
    });
    it('removes axis', () => {
      const newState = removeAxis(state, { payload: { viewId: 'view1', axisId: 'axis_1' } });
      should.not.exist(newState.axes.axis_1);
    });
  });

  describe('getAxes', () => {
    it('returns 2 generated axes (x/y)', () => {
      const entryPoint = {
        name: 'time',
        connectedData: { unit: 'useless' },
      };
      const axisY = getAxes(state, { payload: { entryPoint } });
      axisY.should.be.eql({ label: 'time', unit: 'useless', id: 'Y:time' });
    });
    it('returns 2 axes (x/y)', () => {
      const entryPoint = {
        name: 'ep2',
        connectedData: { unit: 'volts' },
      };
      const axisY = getAxes(state, { payload: { entryPoint } });
      axisY.should.be.eql({ label: 'AXIS1', unit: 'volts', id: 'axis_1' });
    });
    it('returns 1 axis (x) and 1 generated axis (y)', () => {
      const entryPoint = {
        name: 'ep2',
        connectedData: { unit: 'unknown' },
      };
      const axisY = getAxes(state, { payload: { entryPoint } });
      axisY.should.be.eql({ label: 'ep2', unit: 'unknown', id: 'ep_2' });
    });
    it('returns 1 axis (y) and 1 generated axis (x)', () => {
      const entryPoint = {
        name: 'ep2',
        connectedData: { unit: 'volts' },
      };
      const axisY = getAxes(state, { payload: { entryPoint } });
      axisY.should.be.eql({ label: 'AXIS1', unit: 'volts', id: 'axis_1' });
    });
  });
});