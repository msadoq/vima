/* eslint no-unused-expressions: 0 */
import { should, getStore } from '../../common/test';
import { getView, getEntryPointOnAxis } from './views';

describe('store:views', () => {
  describe('selectors', () => {
    it('getView', () => {
      const { getState } = getStore({
        views: {
          myViewId: { title: 'Title 1' },
        },
      });
      getView(getState(), 'myViewId').should.have.property('title', 'Title 1');
      should.not.exist(getView(getState(), 'unknownId'));
    });
    it('getEntryPointOnAxis', () => {
      const state = {
        views: {
          myViewId: {
            configuration: {
              title: 'Title 1',
              entryPoints: [{
                name: 'ep1',
                connectedDataX: { axisId: 'axis1' },
                connectedDataY: { axisId: 'axis2' },
              }, {
                name: 'ep2',
                connectedDataX: { axisId: 'axis1' },
                connectedDataY: { axisId: 'axis3' },
              }],
              axes: {
                axis1: {},
                axis2: {},
                axis3: {},
              },
            }
          },
        },
      };
      getEntryPointOnAxis(state, 'myViewId', 'axis1').should.be.an('array').with.length(2);
      getEntryPointOnAxis(state, 'myViewId', 'axis2').should.be.an('array').with.length(1);
      getEntryPointOnAxis(state, 'myViewId', 'invalidAxis').should.be.an('array').with.length(0);
      getEntryPointOnAxis(state, 'unknown', 'axis1').should.be.an('array').with.length(0);
    });
  });
});
