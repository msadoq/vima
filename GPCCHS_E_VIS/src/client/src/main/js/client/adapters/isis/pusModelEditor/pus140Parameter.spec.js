// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./pus140Parameter');
const stub = require('./pus140Parameter.stub')();



describe('protobuf/isis/pusModelEditor/Pus140Parameter', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Pus140Parameter.proto`, { keepCase: true })
    .lookup('pusModelEditor.protobuf.Pus140Parameter');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      parameterId: { type: 'uinteger', value: stub.parameterId },
      apid: { type: 'uinteger', value: stub.apid },
      currentValue: { type: 'string', value: stub.currentValue },
      lastUpdateModeCurrentValue: { type: 'uinteger', value: stub.lastUpdateModeCurrentValue },
      lastUpdateTimeCurrentValue: { type: 'string', value: stub.lastUpdateTimeCurrentValue },
      lastUpdateModeParamId: { type: 'uinteger', value: stub.lastUpdateModeParamId },
      lastUpdateTimeParamId: { type: 'string', value: stub.lastUpdateTimeParamId },
      serviceStatus: { type: 'uinteger', value: stub.serviceStatus },
      serviceApidName: { type: 'string', value: stub.serviceApidName },
      uniqueId: { type: 'ulong', symbol: `${stub.uniqueId}` },
      apidName: { type: 'string', value: stub.apidName },
      parameterName: { type: 'string', value: stub.parameterName },
      initialValue: { type: 'string', value: stub.initialValue },
    });
    
  });
});
