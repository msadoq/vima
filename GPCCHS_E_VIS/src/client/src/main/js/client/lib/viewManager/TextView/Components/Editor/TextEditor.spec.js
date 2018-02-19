import { shallowRenderSnapshot } from 'common/jest/utils';
import TextEditor from 'viewManager/TextView/Components/Editor/TextEditor';

const propsStub = {
  viewId: 'view-id',
  pageId: 'pageId',
  search: 'search',
  tab: 0,
  openModal: () => null,
  updateViewTab: () => null,
  title: '',
  titleStyle: {},
  panels: {},
  updateViewPanels: () => null,
  configuration: {},
  currentDisplay: 0,
};

describe('TextEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(TextEditor, propsStub, {});
  });
});