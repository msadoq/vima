const data = require('./index');
require('../adapters/dc');
require('../adapters/lpisis');

describe('stubs/data', () => {
  Object.keys(data).map((key) => {
    if (key.includes('DeProtobuf')) {
      return undefined;
    }
    return it(`should run ${key} without error`, () => data[key]());
  });
});
