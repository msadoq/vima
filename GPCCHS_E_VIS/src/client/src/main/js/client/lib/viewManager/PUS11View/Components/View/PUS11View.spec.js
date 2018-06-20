import PUS11View, { isValid, renderInvald } from 'viewManager/PUS11View/Components/View/PUS11View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

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
};

describe('PUS11View :: render', () => {
  test('snapshot', () => {
    shallowRenderSnapshot(PUS11View, propsStub, stateTest);
  });
});

describe('PUS11View :: renderInvald', () => {
  test('snapshot', () => {
    const tree = renderer.create(renderInvald('this is an error message'))
      .toJSON()
    ;
    expect(tree).toMatchSnapshot();
  });
});

describe('PUS11View :: isValid', () => {
  [null, undefined, ''].map(applicationProcessName =>
    [null, undefined].map(applicationProcessId =>
      it('should return false with invalid data', () => {
        expect(isValid(applicationProcessName, applicationProcessId)).toBe(false);
      })
    )
  );
  it('should return true with valid data', () => {
    expect(isValid('ORBIT', 0)).toBe(true);
  });
});