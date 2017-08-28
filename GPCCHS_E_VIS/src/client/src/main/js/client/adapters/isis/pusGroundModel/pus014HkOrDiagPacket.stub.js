// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPus014ForwardedPacket = require('./pus014ForwardedPacket.stub');

const pus014HkOrDiagPacket = {
  subsamplingRatio: 100,
  sid: 100,
  pus014ForwardedPacket: getPus014ForwardedPacket(),
  sidLabel: 'mySTRING',
};

module.exports = override => (override ? _defaultsDeep({}, override, pus014HkOrDiagPacket) : pus014HkOrDiagPacket);