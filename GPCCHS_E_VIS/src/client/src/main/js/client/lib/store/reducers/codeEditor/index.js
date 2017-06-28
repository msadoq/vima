import _ from 'lodash/fp';
import * as types from '../../types';

/* --- Reducer -------------------------------------------------------------- */

const initialState = {
  viewId: null,
};

export default function editor(state = initialState, action) {
  switch (action.type) {
    case types.WS_WINDOW_OPEN_CODE_EDITOR:
      return Object.assign({}, state, {
        viewId: action.payload.viewId,
      });
    case types.WS_WINDOW_CLOSE_CODE_EDITOR:
      return Object.assign({}, state, {
        viewId: null,
      });
    case types.WS_VIEW_CLOSE:
      if (action.payload.viewId === state.viewId) {
        return Object.assign({}, state, {
          viewId: null,
        });
      }
      return state;
    default:
      return state;
  }
}

/* --- Selectors ------------------------------------------------------------ */

export const getViewId = state => _.get('codeEditor.viewId', state);
export const getIsCodeEditorOpened = state => !!_.get('codeEditor.viewId', state);