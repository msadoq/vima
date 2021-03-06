import PUS12View, { isValid, renderInvald } from 'viewManager/PUS12View/Components/View/PUS12View';
import { shallowRenderSnapshot } from 'common/jest/utils';
import stateTest from 'common/jest/stateTest';
import renderer from 'react-test-renderer';

const propsStub = {
  viewId: '1838f507-156b-4734-bf6d-69d0e96b39b8',
  applicationProcessName: 'string',
  applicationProcessId: 12,
  serviceApid: 2,
  noOfParameterMonitoringDefinition: 100,
  serviceStatus: 'ENABLED',
  serviceApidName: 'ORBIT',
  lastUpdateModeServiceStatus: 'TC',
  lastUpdateTimeServiceStatus: '1528359679639',
  parameterMonitoringDefinitions: [],
  apids: [{ apidName: 'ORBIT', apidRawValue: '2' }],
};

describe('viewManager/PUS12View/Components/View/PUS12View', () => {
  describe('PUS12View :: render', () => {
    test('snapshot', () => {
      shallowRenderSnapshot(PUS12View, propsStub, stateTest);
    });
  });

  describe('PUS12View :: renderInvald', () => {
    test('snapshot', () => {
      const tree = renderer.create(renderInvald('this is an error message'))
        .toJSON()
      ;
      expect(tree).toMatchSnapshot();
    });
  });

  describe('PUS12View :: isValid', () => {
    [null, undefined, []].map(apids =>
      [null, undefined].map(applicationProcessId =>
        it('should return false with invalid data', () => {
          expect(isValid(apids, applicationProcessId)).toBe(false);
        })
      )
    );
    const { apids, serviceApid } = propsStub;
    it('should return true with valid data', () => {
      expect(isValid(apids, serviceApid)).toBe(true);
    });
  });
});
