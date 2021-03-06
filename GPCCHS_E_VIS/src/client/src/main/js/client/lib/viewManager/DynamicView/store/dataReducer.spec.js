// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 22/03/2017 : Update viewData organization for last structure +
//  cleaning
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : converts long to string to ensure precision
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : update viewData when closing a page
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for chai-should + repair lots of
//  tests
// VERSION : 1.1.2 : FA : #6670 : 12/06/2017 : Apply jest-codemods for mocha .
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Refactor Jest test to replace it() with test() calls
// VERSION : 1.1.2 : FA : #6670 : 16/06/2017 : Move and rename jest.js in jest/setup.js + test.js
//  in jest/index.js
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update DynamicView : plug it to data consumption
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json
//  patch
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : #8801 : 19/12/2017 : Do not clean data when reload a view
// END-HISTORY
// ====================================================================

import * as types from 'store/types';
import { freezeMe } from 'common/jest';
import dynamicViewData from './dataReducer';

describe('viewManager/DynamicView/store/dataReducer', () => {
  const payload = { rId1: {}, rId2: {} };
  for (let j = 10; j < 21; j += 1) {
    payload.rId1[j] = {
      val1: (j * 10) + 1,
      val2: (j * 10) + 2,
      val3: (j * 10) + 3,
      referenceTimestamp: j,
      time: j + 0.2,
    };

    payload.rId2[j] = payload.rId1[j];
  }

  test('DATA_REMOVE_ALL_VIEWDATA', () => {
    const state = freezeMe({
      myViewId: {
        index: 10,
        value: { myEntryPoint: 150 },
      },
    });
    const action = { type: types.DATA_REMOVE_ALL_VIEWDATA };
    expect(dynamicViewData(state, action)).toEqual({});
  });
  test('HSC_CLOSE_WORKSPACE', () => {
    const state = freezeMe({
      myViewId: {
        index: 10,
        value: { myEntryPoint: 150 },
      },
    });
    expect(dynamicViewData(state, { type: types.HSC_CLOSE_WORKSPACE })).toEqual({});
  });
  test('WS_VIEW_OPENED', () => {
    const action = { type: types.WS_VIEW_OPENED,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'DynamicView', uuid: 'myDyn' };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({ myDyn: {} });
  });
  test('WS_VIEW_ADD_BLANK', () => {
    const action = { type: types.WS_VIEW_ADD_BLANK,
      payload: { view: { type: 'PlotView', uuid: 'myPlot' } } };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({});
    action.payload.view = { type: 'DynamicView', uuid: 'myDyn' };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({ myDyn: {} });
  });
  test('WS_PAGE_OPENED', () => {
    const action = { type: types.WS_PAGE_OPENED,
      payload: { views:
          [{ type: 'PlotView', uuid: 'myPlot' }, { type: 'DynamicView', uuid: 'myDyn' }] } };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({ myDyn: {} });
  });
  test('WS_WORKSPACE_OPENED', () => {
    const action = { type: types.WS_WORKSPACE_OPENED,
      payload: { views:
          [{ type: 'TextView', uuid: 'myText' }, { type: 'DynamicView', uuid: 'myDyn' }] } };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({ myDyn: {} });
  });
  test('WS_VIEW_CLOSE', () => {
    const action = { type: types.WS_VIEW_CLOSE, payload: { viewId: 'myPlot' } };
    expect(dynamicViewData(freezeMe({}), action)).toEqual({});
    const frozen = freezeMe({ myDyn: {} });
    expect(dynamicViewData(freezeMe(frozen), action)).toBe(frozen);
    action.payload.viewId = 'myDyn';
    expect(dynamicViewData(frozen, action)).toEqual({});
  });
  test('WS_PAGE_CLOSE', () => {
    const action = { type: types.WS_PAGE_CLOSE, payload: { viewIds: ['myDyn', 'myText'] } };
    expect(dynamicViewData(freezeMe({ myDyn: {}, myOtherDyn: {} }), action))
      .toEqual({ myOtherDyn: {} });
  });
  test('Unknown action', () => {
    const action = { type: types.UNKNOWN, payload: { viewId: 'myDyn' } };
    const frozen = freezeMe({ myDyn: {} });
    expect(dynamicViewData(freezeMe(frozen), action)).toBe(frozen);
  });
  describe('INJECT_DATA_LAST', () => {
    let newViewMap;
    let oldViewMap;
    let dataToInject;
    let oldExpectedIntervals;
    let newExpectedIntervals;
    beforeAll(() => {
      oldViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              tbdId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
          },
        },
        dynamic: {
          type: 'DynamicView',
          entryPoints: {
            epDynamic: {
              tbdId: 'rId2',
              offset: 0,
              localId: 'local2',
            },
          },
        },
      };
      oldExpectedIntervals = {
        rId1: { local1: { expectedInterval: [5, 10] } },
        rId2: { local2: { expectedInterval: [7, 10] } },
      };
      newViewMap = {
        text: {
          type: 'TextView',
          entryPoints: {
            ep1: {
              tbdId: 'rId1',
              field: 'time',
              localId: 'local1',
            },
            ep4: {
              tbdId: 'rId2',
              field: 'val4',
              localId: 'local4',
            },
          },
        },
        dynamic: {
          type: 'DynamicView',
          entryPoints: {
            epDynamic: {
              tbdId: 'rId1',
              offset: 0,
              localId: 'local1',
            },
          },
        },
      };
      newExpectedIntervals = {
        rId1: { local1: { expectedInterval: [7, 15] } },
        rId2: { local2: { expectedInterval: [11, 13] } },
      };
      dataToInject = { rId1: {}, rId2: {} };
      for (let j = 1; j < 21; j += 1) {
        dataToInject.rId1[j] = {
          val1: { type: 'uinteger', value: (j * 10) + 1 },
          val2: { type: 'uinteger', value: (j * 10) + 2 },
          val3: { type: 'uinteger', value: (j * 10) + 3 },
          val4: { type: 'enum', value: j, symbol: 'val'.concat(j) },
          referenceTimestamp: { type: 'time', value: j },
          time: { type: 'time', value: j },
        };
        if (j % 2) {
          dataToInject.rId2[j] = dataToInject.rId1[j];
        }
      }
    });
    test('valid viewData with empty state', () => {
      const action = { type: types.INJECT_DATA_LAST,
        payload: {
          newViewMap,
          oldExpectedLastIntervals: oldExpectedIntervals,
          newExpectedLastIntervals: oldExpectedIntervals,
          dataToInject,
        } };
      expect(dynamicViewData(freezeMe({ dynamic: {} }), action)).toEqual({
        dynamic: {
          index: 10,
          value: {
            val1: { type: 'uinteger', value: 101 },
            val2: { type: 'uinteger', value: 102 },
            val3: { type: 'uinteger', value: 103 },
            val4: { type: 'enum', value: 'val10', symbol: 'val10' },
            referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.010' },
            time: { type: 'time', value: '1970-01-01T00:00:00.010' },
          },
        },
      });
    });
    test('valid viewData with state: interval update', () => {
      const state = freezeMe({
        dynamic: {
          index: 8,
          value: {
            val1: { type: 'uinteger', value: 81 },
            val2: { type: 'uinteger', value: 82 },
            val3: { type: 'uinteger', value: 83 },
            val4: { type: 'enum', value: 'val8', symbol: 'val8' },
            referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.008Z' },
            time: { type: 'time', value: '1970-01-01T00:00:00.008Z' },
          },
        },
      });
      const action = { type: types.INJECT_DATA_LAST,
        payload: {
          oldViewMap: newViewMap,
          newViewMap,
          oldExpectedLastInterval: oldExpectedIntervals,
          newExpectedLastIntervals: newExpectedIntervals,
          dataToInject,
        } };

      expect(dynamicViewData(state, action)).toEqual({
        dynamic: {
          index: 15,
          value: {
            val1: { type: 'uinteger', value: 151 },
            val2: { type: 'uinteger', value: 152 },
            val3: { type: 'uinteger', value: 153 },
            val4: { type: 'enum', value: 'val15', symbol: 'val15' },
            referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.015' },
            time: { type: 'time', value: '1970-01-01T00:00:00.015' },
          },
        },
      });
    });
    test('valid viewData with state: tbdId update', () => {
      const state = freezeMe({
        dynamic: {
          index: 8,
          value: {
            val1: { type: 'uinteger', value: 81 },
            val2: { type: 'uinteger', value: 82 },
            val3: { type: 'uinteger', value: 83 },
            val4: { type: 'enum', value: 'val8', symbol: 'val8' },
            referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.008Z' },
            time: { type: 'time', value: '1970-01-01T00:00:00.008Z' },
          },
        },
      });
      const action = { type: types.INJECT_DATA_LAST,
        payload: {
          oldViewMap,
          newViewMap,
          oldExpectedLastInterval: oldExpectedIntervals,
          newExpectedLastIntervals: newExpectedIntervals,
          dataToInject,
        } };
      expect(dynamicViewData(state, action)).toEqual({
        dynamic: {
          index: 15,
          value: {
            val1: { type: 'uinteger', value: 151 },
            val2: { type: 'uinteger', value: 152 },
            val3: { type: 'uinteger', value: 153 },
            val4: { type: 'enum', value: 'val15', symbol: 'val15' },
            referenceTimestamp: { type: 'time', value: '1970-01-01T00:00:00.015' },
            time: { type: 'time', value: '1970-01-01T00:00:00.015' },
          },
        },
      });
    });
  });
});
