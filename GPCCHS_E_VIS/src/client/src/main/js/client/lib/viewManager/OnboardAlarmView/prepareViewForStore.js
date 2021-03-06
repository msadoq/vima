import _ from 'lodash/fp';
import { moveProp } from 'common/fp';

const singleton = x => [x];

const getDefaultView = view => _.merge({
  type: 'OnboardAlarmView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New Onboard Alarm View',
  configuration: {
    entryPoint: {},
  },
}, view);

export default _.pipe(
  getDefaultView,
  _.update('configuration', _.pipe(
    moveProp('entryPoint', 'entryPoints'),
    _.update('entryPoints', singleton)
  ))
);
