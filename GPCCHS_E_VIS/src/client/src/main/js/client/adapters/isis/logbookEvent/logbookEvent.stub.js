// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _now = require('lodash/now');
const _defaultsDeep = require('lodash/defaultsDeep');
const getNamedValue = require('../ccsds_mal/namedValue.stub');
const getProvider = require('../ccsds_cs/provider.stub');
const getUser = require('../ccsds_cs/user.stub');

const now = _now();

const logbookEvent = {
  eventDate: now,
  user: getUser(),
  systemDate: now,
  specificAttributes: [getNamedValue(), getNamedValue()],
  mission: 'mySTRING',
  satellite: 1000,
  producer: getProvider(),
};

module.exports = override => (override ? _defaultsDeep({}, override, logbookEvent) : logbookEvent);
