import { shallowRenderSnapshot } from 'common/jest/utils';
import HistoryEditor from 'viewManager/HistoryView/Components/Editor/HistoryEditor';

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

describe('HistoryEditor :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(HistoryEditor, propsStub, {});
  });
});