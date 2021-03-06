// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const _defaultsDeep = require('lodash/defaultsDeep');
const getObjectKey = require('./objectKey.stub');
const getObjectType = require('./objectType.stub');

const objectId = {
  objectType: getObjectType(),
  objectKey: getObjectKey(),
};

module.exports = override => (override ? _defaultsDeep({}, override, objectId) : objectId);
