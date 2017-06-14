import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/windows';
import windowsReducer from './index';
import * as types from '../../types';

const reducer = freezeArgs(windowsReducer);

describe('store:windows:reducer:window', () => {
  describe('update title', () => {
    it('updates title', () => {
      const state = reducer(
        { myWindowId: { title: 'window 1' } },
        actions.updateTitle('myWindowId', 'window 2')
      );
      expect(state.myWindowId.title).toEqual('window 2');
    });
  });
  describe('update geometry', () => {
    it('update only one', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120)
      );
      expect(state.myWindowId).toEqual({
        geometry: {
          x: 120,
          y: 100,
          w: 100,
          h: 100,
        },
      });
    });
    it('update all', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 100, y: 100, w: 100, h: 100 } } },
        actions.updateGeometry('myWindowId', 120, 130, 140, 150)
      );
      expect(state.myWindowId).toEqual({
        geometry: { x: 120, y: 130, w: 140, h: 150 },
      });
    });
    it('update nothing', () => {
      const state = reducer(
        { myWindowId: { geometry: { x: 120, y: 130, w: 140, h: 150 } } },
        actions.updateGeometry('myWindowId')
      );
      expect(state.myWindowId).toEqual({
        geometry: { x: 120, y: 130, w: 140, h: 150 },
      });
    });
  });
  describe('focus page', () => {
    it('should focus page corresponding to arg', () => {
      const state = { myWindowId: { focusedPage: null } };
      const action = {
        type: types.WS_WINDOW_PAGE_FOCUS,
        payload: {
          windowId: 'myWindowId',
          pageId: 'myFocusedPageId',
        },
      };
      const nextState = reducer(state, action);
      expect(nextState.myWindowId.focusedPage).toEqual('myFocusedPageId');
    });
  });
  describe('reorder pages', () => {
    it('reorder', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '3', '1']);
    });
    it('doesn\'t remove key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2', '3'] } },
        actions.reorderPages('myWindowId', ['2', '3'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '3', '1']);
    });
    it('doesn\'t add key', () => {
      const state = reducer(
        { myWindowId: { pages: ['1', '2'] } },
        actions.reorderPages('myWindowId', ['2', '3', '1'])
      );
      expect(state.myWindowId.pages).toEqual(['2', '1']);
    });
  });
  describe('minimize/restore window', () => {
    it('should minimize window', () => {
      const state = {
        myWindowId: { minimized: false },
      };
      const action = actions.minimize('myWindowId');
      expect(reducer(state, action).myWindowId.minimized).toBe(true);
    });
    it('should restore window', () => {
      const state = {
        myWindowId: { minimized: true },
      };
      const action = actions.restore('myWindowId');
      expect(reducer(state, action).myWindowId.minimized).not.toBe(true);
    });
  });
  describe('setIsLoaded', () => {
    it('should set is loaded', () => {
      expect(reducer({ myWindowId: { title: 'Title', isLoaded: false } },
        actions.setIsLoaded('myWindowId'))).toEqual({ myWindowId: { title: 'Title', isLoaded: true } });
    });
  });
  it('displayHelp', () => {
    const state = { myId: { title: 'Title', displayHelp: false } };
    const nextState = reducer(state, actions.displayHelp('myId', true));
    expect(nextState.myId.displayHelp).toBe(true);
    expect(reducer(nextState, actions.displayHelp('myId', false))
      .myId.displayHelp).toBe(false);
  });
});
