// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getPusElement = require('./pusElement.stub');

const pus011Apid = {
  status: 1,
  pusElement: getPusElement(),
  apid: 100,
};

module.exports = override => (override ? _defaultsDeep({}, override, pus011Apid) : pus011Apid);
