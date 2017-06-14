import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/ui';
import uiReducer from '.';

const reducer = freezeArgs(uiReducer);

describe('store:ui:reducer', () => {
  describe('update tab', () => {
    it('should update tab', () => {
      expect(reducer(undefined, actions.updateViewTab('myId', 1))).toEqual({
        editor: {
          myId: {
            tab: 1,
          },
        },
      });
    });
  });

  describe('update panels', () => {
    it('should update panels', () => {
      expect(
        reducer(undefined, actions.updateViewPanels('myId', 'panels', ['panelOne', 'panelTwo']))
      ).toEqual({
        editor: {
          myId: {
            panels: { panelOne: true, panelTwo: true },
          },
        },
      });
    });
  });

  describe('update subpanels', () => {
    it('should update subpanels', () => {
      expect(
        reducer(undefined, actions.updateViewSubPanels('myId', 'panels', 'panelOne', ['subpanelOne', 'subpanelTwo']))
      ).toEqual({
        editor: {
          myId: {
            panels: { panelOne: ['subpanelOne', 'subpanelTwo'] },
          },
        },
      });
    });
  });
});
