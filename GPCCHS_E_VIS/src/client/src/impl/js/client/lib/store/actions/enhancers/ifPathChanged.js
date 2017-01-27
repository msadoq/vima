import { resolve } from 'path';
import { compose, pathOr } from 'lodash/fp';

// wrap an action creator in a thunk that dispatch it only when newPath is different from 'key'
const ifPathChanged = (actionCreator, [key = 'views', keyPath = 'path', keyNewPath = 'newPath']) => (
  (...args) => (dispatch, getState) => {
    const action = actionCreator(...args);
    const getView = compose(pathOr({}, [key, action.payload.viewId]), getState);

    const newPath = action.payload[keyNewPath];
    const oldPath = getView()[keyPath];
    if (!getView() || !newPath) {
      return;
    }
    if ((newPath && oldPath && resolve(newPath) !== resolve(oldPath))) {
      return dispatch(action);
    }
  }
);

export default {
  ifPathChanged,
};
