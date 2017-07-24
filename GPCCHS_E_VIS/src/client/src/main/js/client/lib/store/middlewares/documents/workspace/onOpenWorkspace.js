import * as types from '../../../types';
import { getModifiedPagesIds } from '../../../reducers/pages';
import { getModifiedViewsIds } from '../../../reducers/views';
import { closeWorkspace, isWorkspaceOpening } from '../../../actions/hsc';
import { withOpenModal, withOpenDialog } from '../helpers';

const makeOnOpenWorkspace = documentManager => withOpenModal(withOpenDialog(
  ({ dispatch, getState, openModal, openDialog }) => next => (action) => {
    const nextAction = next(action);
    if (action.type === types.WS_ASK_OPEN_WORKSPACE) {
      const { isNew, windowId, absolutePath } = action.payload;
      const state = getState();

      const modifiedPagesIds = getModifiedPagesIds(state);
      const modifiedViewsIds = getModifiedViewsIds(state);

      const isPagesSaved = modifiedPagesIds.length === 0;
      const isViewsSaved = modifiedViewsIds.length === 0;

      const openWorkspace = () => {
        if (isNew) {
          dispatch(isWorkspaceOpening(true));
          dispatch(closeWorkspace(true));
          dispatch({
            type: types.WS_WORKSPACE_OPENED,
            payload: documentManager.createBlankWorkspace(),
          });
          dispatch(isWorkspaceOpening(false));
        } else if (absolutePath) {
          dispatch(documentManager.openWorkspace({ absolutePath }));
        } else {
          openDialog(windowId, 'open', {}, (closeAction) => {
            const { choice } = closeAction.payload;
            if (choice) {
              dispatch(documentManager.openWorkspace({ absolutePath: choice[0] }));
            }
          });
        }
      };

      const workspaceNeedSave = title => openModal(windowId, {
        title,
        type: 'saveWizard',
        documentType: 'workspace',
        pageIds: modifiedPagesIds,
        viewIds: modifiedViewsIds,
        buttons: [
          {
            savedDocuments: { label: 'Open workspace', value: 'open', type: 'primary' },
            unsavedDocuments: { label: 'Open workspace without saving', value: 'open', type: 'danger' },
          },
        ],
      }, (closeAction) => {
        if (closeAction.payload.choice === 'open') {
          openWorkspace();
        }
      });

      if (!isViewsSaved && !isPagesSaved) {
        workspaceNeedSave('Page and views are modified');
      } else if (!isPagesSaved) {
        workspaceNeedSave('Page is modified');
      } else if (!isViewsSaved) {
        workspaceNeedSave('Views are modified');
      } else {
        openWorkspace();
      }
    }
    return nextAction;
  }));

export default makeOnOpenWorkspace;
