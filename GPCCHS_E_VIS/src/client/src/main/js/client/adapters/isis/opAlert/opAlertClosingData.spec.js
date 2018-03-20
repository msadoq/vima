// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
require('../../../utils/test');
const adapter = require('./opAlertClosingData');
const { getOpAlertClosingData } = require('../stubs');

const closingWay = require('./closingWay');

describe('protobuf/isis/opAlert/OpAlertClosingData', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/OpAlertClosingData.proto`, { keepCase: true })
    .lookup('opAlert.protobuf.OpAlertClosingData');
  const fixture = getOpAlertClosingData();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      closingUser: { type: 'string', value: fixture.closingUser },
      closingDate: { type: 'time', value: fixture.closingDate },
      closingWay: { type: 'enum', value: fixture.closingWay, symbol: closingWay[fixture.closingWay] },
    });
    
    
  });
});
