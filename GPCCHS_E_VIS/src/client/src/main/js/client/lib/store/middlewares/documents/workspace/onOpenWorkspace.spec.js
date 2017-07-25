import _ from 'lodash/fp';
import configureMockStore from 'redux-mock-store';

import makeOnOpenWorkspace from './onOpenWorkspace';
import * as types from '../../../types';

const documentManager = {
  createBlankWorkspace: () => ({ workspace: true }),
  openWorkspace: absolutePath => ({
    type: 'OPEN_WORKSPACE',
    payload: { absolutePath },
  }),
};

const mockStore = configureMockStore([makeOnOpenWorkspace(documentManager)]);

const askOpenWorkspace = (absolutePath, isNew = false) => ({
  type: types.WS_ASK_OPEN_WORKSPACE,
  payload: { absolutePath, isNew, windowId: 'w1' },
});

describe('store:serverProcess:middlewares:documents:onOpenWorkspace', () => {
  const store = mockStore({
    windows: { w1: {} },
    pages: {},
    views: {},
  });

  afterEach(() => {
    store.clearActions();
  });

  test('simple open workspace', () => {
    store.dispatch(askOpenWorkspace('/absolute/path'));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open new workspace', () => {
    store.dispatch(askOpenWorkspace('/absolute/path', true));
    expect(store.getActions()).toMatchSnapshot();
  });

  test('open workspace (filepicker)', () => {
    store.dispatch(askOpenWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId, choice: ['/chosen/path'] } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('cancel opening workspace (filepicker)', () => {
    store.dispatch(askOpenWorkspace());
    const dialogId = _.last(store.getActions()).payload.dialogId;
    store.dispatch({ type: types.HSC_DIALOG_CLOSED, payload: { dialogId } });
    expect(store.getActions()).toMatchSnapshot();
  });

  test('workspace need save (pages)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save (views)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: {},
      views: { v1: { isModified: true }, v2: { isModified: true } },
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save (pages and views)', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: { v1: { isModified: true }, v2: { isModified: true } },
    });
    unsavedStore.dispatch(askOpenWorkspace());
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save, save it, then open another workspace', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace('/absolute/path'));
    const modalId = _.last(unsavedStore.getActions()).payload.props.modalId;
    unsavedStore.dispatch({
      type: types.WS_MODAL_CLOSE, payload: { choice: 'open', props: { modalId } },
    });
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });

  test('workspace need save, then cancel opening workspace', () => {
    const unsavedStore = mockStore({
      windows: { w1: {} },
      pages: { p1: { isModified: true }, p2: { isModified: true } },
      views: {},
    });
    unsavedStore.dispatch(askOpenWorkspace('/absolute/path'));
    const modalId = _.last(unsavedStore.getActions()).payload.props.modalId;
    unsavedStore.dispatch({
      type: types.WS_MODAL_CLOSE, payload: { props: { modalId } },
    });
    expect(unsavedStore.getActions()).toMatchSnapshot();
  });
});
