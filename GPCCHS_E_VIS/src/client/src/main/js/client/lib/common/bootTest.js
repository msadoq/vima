import _ from 'lodash';
import path from 'path';

/*
  Setting up the testing framework before each test.
  Please see : https://facebook.github.io/jest/docs/cli.html#setuptestframeworkscriptfile-file
*/

global.testConfig = {
  ISIS_DOCUMENTS_ROOT: path.resolve(__dirname, '../documentManager/fixtures'),
  WILDCARD_CHARACTER: '*',
  VISUWINDOW_MAX_LENGTH: 42,
  STATE_COLORS: {
    alarm: 'orangered',
    critical: 'red',
    info: 'white',
    outOfRange: 'grey',
    severe: 'darkred',
    warning: 'orange',
    nonsignificant: 'lightgrey',
    obsolete: 'tan',
  },
  DEFAULT_FIELD: {},
};

_.set(
  global,
  'parameters.get',
  p => _.get(global.testConfig, p)
);

// jest expect.extend utils
const toBe = (predicat, getAssertionString = _.identity) => (received, argument) => {
  const pass = predicat(received, argument);
  const assertionString = getAssertionString(JSON.stringify(argument));
  return {
    message: () => `expected ${JSON.stringify(received)}${pass ? ' not ' : ' '}to be ${assertionString}`,
    pass,
  };
};

// jest extended assertions
const extendedAssertions = {
  toBeArray: toBe(Array.isArray, () => 'an array'),
  toBeObject: toBe(x => typeof x === 'object', () => 'an object'),
  toBeString: toBe(x => typeof x === 'string', () => 'a string'),
  toBeOneOf: toBe((val, arg = []) => arg.includes(val), arg => `one of ${arg}`),
};

const aliases = {
  toBeAnArray: extendedAssertions.toBeArray,
  toBeAnObject: extendedAssertions.toBeObject,
  toBeAString: extendedAssertions.toBeString,
};

expect.extend({
  ...extendedAssertions,
  ...aliases,
});
