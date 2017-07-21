import * as types from '../../../types';
import { getFocusedWindow } from '../../../selectors/windows';
import { withOpenDialog } from '../helpers';

const onOpenView = documentManager => withOpenDialog(
  ({ dispatch, openDialog, getState }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_VIEW) {
      const { absolutePath } = action.payload;
      const window = getFocusedWindow(getState());
      const windowId = window.uuid;
      if (absolutePath) {
        dispatch(documentManager.openView({ absolutePath }, window.focusedPage));
      } else {
        openDialog(windowId, 'open', {}, (closeAction) => {
          const { choice } = closeAction.payload;
          if (choice) {
            dispatch(documentManager.openView({ absolutePath: choice[0] }, window.focusedPage));
          }
        });
      }
    }
    return nextAction;
  }
);

export default onOpenView;