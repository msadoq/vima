import PUS11View from 'viewManager/PUS11View/Components/View/PUS11View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import { generatePopover } from 'viewManager/common/pus/tooltip';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 11,
  scheduleStatus: 'string',
  availableSpace: 'string',
  spaceType: 'string',
  lastUpdateTime: 1528359679639,
  lastUpdateType: 'string',
  subSchedules: [],
  enabledApids: [],
  commands: [],
  openModal: () => null,
  onCommandCellDoubleClick: () => null,
};

describe('viewManager/PUS11View/Components/View/PUS11View', () => {
  describe('PUS11View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS11View, propsStub, stateTest);
    });
  });

  describe('generatePopover', () => {
    it('should match snapshot with valida data', () => {
      const date = 1527520025823;
      expect(generatePopover('id', date, 'TM')).toMatchSnapshot();
    });
  });
});
