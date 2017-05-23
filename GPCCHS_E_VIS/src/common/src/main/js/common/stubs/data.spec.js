const data = require('./data');
// require('../protobuf/adapters/dc');
// require('../protobuf/adapters/lpisis');

describe('stubs/data', () => {
  Object.keys(data).map((key) => {
    if (key.includes('DeProtobuf')) {
      return undefined;
    }
    return it(`should run ${key} without error`, () => data[key]());
  });
});
