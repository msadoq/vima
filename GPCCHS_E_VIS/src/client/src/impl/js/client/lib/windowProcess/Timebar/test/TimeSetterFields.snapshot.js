import React from 'react';
import renderer from 'react-test-renderer';
import TimebarFixture from '../../../../test/__mocks__/Timebar';
import TimeSetterFields from '../TimeSetterFields';

const propsStub = {
  ms: 1480417090581,
  cursor: 'lower',
  disabled: false,
  onChange: () => null,
  visuWindow: TimebarFixture.visuWindow,
  slideWindow: TimebarFixture.slideWindow,
};

test('TimesetterFields renders correctly', () => {
  const tree = renderer.create(
    <TimeSetterFields
      {...propsStub}
    />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});