import _ from 'lodash/fp';

import * as types from '../../store/types';

const removeElementIn = (key, index, state) => _.update(key, _.pullAt(index), state);

export default (stateConf, action) => {
  switch (action.type) {
    // loading view configuration
    case types.WS_VIEW_OPEN:
    case types.WS_PAGE_OPEN:
    case types.WS_WORKSPACE_OPEN:
    case types.WS_VIEW_ADD_BLANK:
    case types.WS_VIEW_RELOAD:
      return _.defaults(stateConf, action.payload.view.configuration);

    // entryPoints
    case types.WS_VIEW_UPDATE_ENTRYPOINT:
      return _.set(`entryPoints[${action.payload.index}]`, action.payload.entryPoint, stateConf);
    case types.WS_VIEW_REMOVE_ENTRYPOINT:
      return removeElementIn('entryPoints', action.payload.index, stateConf);
    default:
      return stateConf;
  }
};
