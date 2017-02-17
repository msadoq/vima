import {} from '../../common/test';
import reducer from './editor';
import * as actions from '../actions/editor';

describe.only('store:editor:reducer', () => {
  it('should returns initial state', () => {
    const state = reducer(undefined, {});
    state.should.have.a.property('textViewId', null);
  });
  it('should update viewId', () => {
    reducer(undefined, actions.openHtmlEditor('test'))
    .textViewId.should.equal('test');
  });
  it('should reset viewId', () => {
    const state = reducer(undefined, actions.closeHtmlEditor());
    state.should.have.a.property('textViewId', null);
  });
});