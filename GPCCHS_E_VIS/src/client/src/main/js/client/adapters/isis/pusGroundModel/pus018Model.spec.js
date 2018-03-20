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
const adapter = require('./pus018Model');
const { getPus018Model } = require('../stubs');



describe('protobuf/isis/pusGroundModel/Pus018Model', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus018Model.proto`, { keepCase: true })
    .lookup('pusGroundModel.protobuf.Pus018Model');
  const fixture = getPus018Model();
  let buffer;
  it('encode', () => {
    buffer = builder.encode(adapter.encode(fixture)).finish();
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = adapter.decode(builder.decode(buffer));
    json.should.be.an('object').that.have.properties({
      engineStatus: { type: 'uinteger', value: fixture.engineStatus },
      groundDate: { type: 'time', value: fixture.groundDate },
      apid: { type: 'uinteger', value: fixture.apid },
      noOBCPs: { type: 'uinteger', value: fixture.noOBCPs },
      pusElement: {
        lastUpdateMode: { type: 'uinteger', value: fixture.pusElement.lastUpdateMode },
        lastUpdateTime: { type: 'time', value: fixture.pusElement.lastUpdateTime },
      },
      status: { type: 'uinteger', value: fixture.status },
    });
    
    json.pus018Obcp.should.be.an('array').that.have.lengthOf(fixture.pus018Obcp.length);
    for (let i = 0; i < fixture.pus018Obcp.length; i += 1) {
      json.pus018Obcp[i].should.be.an('object').that.have.properties({
        id: { type: 'uinteger', value: fixture.pus018Obcp[i].id },
        status: { type: 'string', value: fixture.pus018Obcp[i].status },
        stepId: { type: 'string', value: fixture.pus018Obcp[i].stepId },
        partitionId: { type: 'string', value: fixture.pus018Obcp[i].partitionId },
        observabilityLevel: { type: 'string', value: fixture.pus018Obcp[i].observabilityLevel },
        priority: { type: 'string', value: fixture.pus018Obcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus018Obcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus018Obcp[i].pusElement.lastUpdateTime },
        },
      });
      json.pus018Obcp[i].pus18Parameter.should.be.an('array').that.have.lengthOf(fixture.pus018Obcp[i].pus18Parameter.length);
      for (let ii = 0; ii < fixture.pus018Obcp[i].pus18Parameter.length; ii += 1) {
        json.pus018Obcp[i].pus18Parameter[ii].should.be.an('object').that.have.properties({
          parameterId: { type: 'uinteger', value: fixture.pus018Obcp[i].pus18Parameter[ii].parameterId },
          parameterName: { type: 'string', value: fixture.pus018Obcp[i].pus18Parameter[ii].parameterName },
          value: { type: 'double', symbol: fixture.pus018Obcp[i].pus18Parameter[ii].value.toString() },
        });
        
      }
    }
    json.pus018ConfiguredObcp.should.be.an('array').that.have.lengthOf(fixture.pus018ConfiguredObcp.length);
    for (let i = 0; i < fixture.pus018ConfiguredObcp.length; i += 1) {
      json.pus018ConfiguredObcp[i].should.be.an('object').that.have.properties({
        id: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].id },
        hkParamNameForName: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForName },
        hkParamNameForId: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForId },
        hkParamNameForStatus: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForStatus },
        hkParamNameForPriority: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForPriority },
        hkParamNameForStepId: { type: 'string', value: fixture.pus018ConfiguredObcp[i].hkParamNameForStepId },
        status: { type: 'string', value: fixture.pus018ConfiguredObcp[i].status },
        stepId: { type: 'string', value: fixture.pus018ConfiguredObcp[i].stepId },
        priority: { type: 'string', value: fixture.pus018ConfiguredObcp[i].priority },
        pusElement: {
          lastUpdateMode: { type: 'uinteger', value: fixture.pus018ConfiguredObcp[i].pusElement.lastUpdateMode },
          lastUpdateTime: { type: 'time', value: fixture.pus018ConfiguredObcp[i].pusElement.lastUpdateTime },
        },
      });
      
    }
  });
});
