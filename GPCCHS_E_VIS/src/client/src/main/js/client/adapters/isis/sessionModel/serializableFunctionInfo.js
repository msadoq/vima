// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ByteBuffer = require('bytebuffer');
const bOOLEAN = require('../ccsds_mal/bOOLEAN');
const objectId = require('../ccsds_com/objectId');
const sTRING = require('../ccsds_mal/sTRING');
const uINTEGER = require('../ccsds_mal/uINTEGER');
const uLONG = require('../ccsds_mal/uLONG');
const uOCTET = require('../ccsds_mal/uOCTET');
const uSHORT = require('../ccsds_mal/uSHORT');

const SESSIONOID_OBJECTTYPE_AREA_SIZE = 2;
const SESSIONOID_OBJECTTYPE_AREA_OFFSET = 0;
const SESSIONOID_OBJECTTYPE_SERVICE_SIZE = 2;
const SESSIONOID_OBJECTTYPE_SERVICE_OFFSET = SESSIONOID_OBJECTTYPE_AREA_OFFSET + SESSIONOID_OBJECTTYPE_AREA_SIZE;
const SESSIONOID_OBJECTTYPE_VERSION_SIZE = 1;
const SESSIONOID_OBJECTTYPE_VERSION_OFFSET = SESSIONOID_OBJECTTYPE_SERVICE_OFFSET + SESSIONOID_OBJECTTYPE_SERVICE_SIZE;
const SESSIONOID_OBJECTTYPE_NUMBER_SIZE = 2;
const SESSIONOID_OBJECTTYPE_NUMBER_OFFSET = SESSIONOID_OBJECTTYPE_VERSION_OFFSET + SESSIONOID_OBJECTTYPE_VERSION_SIZE;
const SESSIONOID_OBJECTTYPE_SIZE = (SESSIONOID_OBJECTTYPE_NUMBER_OFFSET + SESSIONOID_OBJECTTYPE_NUMBER_SIZE) - SESSIONOID_OBJECTTYPE_AREA_OFFSET;
const SESSIONOID_OBJECTTYPE_OFFSET = 0;
const SESSIONOID_OBJECTKEY_DOMAINEID_SIZE = 2;
const SESSIONOID_OBJECTKEY_DOMAINEID_OFFSET = SESSIONOID_OBJECTTYPE_OFFSET + SESSIONOID_OBJECTTYPE_SIZE;
const SESSIONOID_OBJECTKEY_UID_SIZE = 8;
const SESSIONOID_OBJECTKEY_UID_OFFSET = SESSIONOID_OBJECTKEY_DOMAINEID_OFFSET + SESSIONOID_OBJECTKEY_DOMAINEID_SIZE;
const SESSIONOID_OBJECTKEY_SIZE = (SESSIONOID_OBJECTKEY_UID_OFFSET + SESSIONOID_OBJECTKEY_UID_SIZE) - SESSIONOID_OBJECTKEY_DOMAINEID_OFFSET;
const SESSIONOID_OBJECTKEY_OFFSET = SESSIONOID_OBJECTTYPE_OFFSET + SESSIONOID_OBJECTTYPE_SIZE;
const SESSIONOID_SIZE = (SESSIONOID_OBJECTKEY_OFFSET + SESSIONOID_OBJECTKEY_SIZE) - SESSIONOID_OBJECTTYPE_OFFSET;
const SESSIONOID_OFFSET = 0;
const EID_OBJECTTYPE_AREA_SIZE = 2;
const EID_OBJECTTYPE_AREA_OFFSET = 0;
const EID_OBJECTTYPE_SERVICE_SIZE = 2;
const EID_OBJECTTYPE_SERVICE_OFFSET = EID_OBJECTTYPE_AREA_OFFSET + EID_OBJECTTYPE_AREA_SIZE;
const EID_OBJECTTYPE_VERSION_SIZE = 1;
const EID_OBJECTTYPE_VERSION_OFFSET = EID_OBJECTTYPE_SERVICE_OFFSET + EID_OBJECTTYPE_SERVICE_SIZE;
const EID_OBJECTTYPE_NUMBER_SIZE = 2;
const EID_OBJECTTYPE_NUMBER_OFFSET = EID_OBJECTTYPE_VERSION_OFFSET + EID_OBJECTTYPE_VERSION_SIZE;
const EID_OBJECTTYPE_SIZE = (EID_OBJECTTYPE_NUMBER_OFFSET + EID_OBJECTTYPE_NUMBER_SIZE) - EID_OBJECTTYPE_AREA_OFFSET;
const EID_OBJECTTYPE_OFFSET = 0;
const EID_OBJECTKEY_DOMAINEID_SIZE = 2;
const EID_OBJECTKEY_DOMAINEID_OFFSET = EID_OBJECTTYPE_OFFSET + EID_OBJECTTYPE_SIZE;
const EID_OBJECTKEY_UID_SIZE = 8;
const EID_OBJECTKEY_UID_OFFSET = EID_OBJECTKEY_DOMAINEID_OFFSET + EID_OBJECTKEY_DOMAINEID_SIZE;
const EID_OBJECTKEY_SIZE = (EID_OBJECTKEY_UID_OFFSET + EID_OBJECTKEY_UID_SIZE) - EID_OBJECTKEY_DOMAINEID_OFFSET;
const EID_OBJECTKEY_OFFSET = EID_OBJECTTYPE_OFFSET + EID_OBJECTTYPE_SIZE;
const EID_SIZE = (EID_OBJECTKEY_OFFSET + EID_OBJECTKEY_SIZE) - EID_OBJECTTYPE_OFFSET;
const EID_OFFSET = SESSIONOID_OFFSET + SESSIONOID_SIZE;
const NAME_SIZE = 128;
const NAME_OFFSET = EID_OFFSET + EID_SIZE;
const FEATURE_SIZE = 128;
const FEATURE_OFFSET = NAME_OFFSET + NAME_SIZE;
const CONFIGURATION_SIZE = 128;
const CONFIGURATION_OFFSET = FEATURE_OFFSET + FEATURE_SIZE;
const NODE_SIZE = 128;
const NODE_OFFSET = CONFIGURATION_OFFSET + CONFIGURATION_SIZE;
const STATE_SIZE = 4;
const STATE_OFFSET = NODE_OFFSET + NODE_SIZE;
const CONFID_SIZE = 2;
const CONFID_OFFSET = STATE_OFFSET + STATE_SIZE;
const AUTOSTART_SIZE = 1;
const AUTOSTART_OFFSET = CONFID_OFFSET + CONFID_SIZE;
const TYPE_SIZE = 1;
const TYPE_OFFSET = AUTOSTART_OFFSET + AUTOSTART_SIZE;
const INSTANCENUMBER_SIZE = 2;
const INSTANCENUMBER_OFFSET = TYPE_OFFSET + TYPE_SIZE;
const LASTSTATEUPDATETIME_SIZE = 8;
const LASTSTATEUPDATETIME_OFFSET = INSTANCENUMBER_OFFSET + INSTANCENUMBER_SIZE;
const AVAILABILITY_SIZE = 1;
const AVAILABILITY_OFFSET = LASTSTATEUPDATETIME_OFFSET + LASTSTATEUPDATETIME_SIZE;
const CONTROLURI_SIZE = 128;
const CONTROLURI_OFFSET = AVAILABILITY_OFFSET + AVAILABILITY_SIZE;
const VIEWURI_SIZE = 128;
const VIEWURI_OFFSET = CONTROLURI_OFFSET + CONTROLURI_SIZE;

module.exports = {
  encodeRaw: (data, buffer, offset = 0) => {
    const serializableFunctionInfo = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    objectId.encodeRaw(data.sessionOid, serializableFunctionInfo, SESSIONOID_OFFSET + offset, SESSIONOID_SIZE);
    objectId.encodeRaw(data.eid, serializableFunctionInfo, EID_OFFSET + offset, EID_SIZE);
    sTRING.encodeRaw(data.name, serializableFunctionInfo, NAME_OFFSET + offset, NAME_SIZE);
    sTRING.encodeRaw(data.feature, serializableFunctionInfo, FEATURE_OFFSET + offset, FEATURE_SIZE);
    sTRING.encodeRaw(data.configuration, serializableFunctionInfo, CONFIGURATION_OFFSET + offset, CONFIGURATION_SIZE);
    sTRING.encodeRaw(data.node, serializableFunctionInfo, NODE_OFFSET + offset, NODE_SIZE);
    uINTEGER.encodeRaw(data.state, serializableFunctionInfo, STATE_OFFSET + offset, STATE_SIZE);
    uSHORT.encodeRaw(data.confId, serializableFunctionInfo, CONFID_OFFSET + offset, CONFID_SIZE);
    bOOLEAN.encodeRaw(data.autostart, serializableFunctionInfo, AUTOSTART_OFFSET + offset, AUTOSTART_SIZE);
    uOCTET.encodeRaw(data.type, serializableFunctionInfo, TYPE_OFFSET + offset, TYPE_SIZE);
    uSHORT.encodeRaw(data.instanceNumber, serializableFunctionInfo, INSTANCENUMBER_OFFSET + offset, INSTANCENUMBER_SIZE);
    uLONG.encodeRaw(data.lastStateUpdateTime, serializableFunctionInfo, LASTSTATEUPDATETIME_OFFSET + offset, LASTSTATEUPDATETIME_SIZE);
    bOOLEAN.encodeRaw(data.availability, serializableFunctionInfo, AVAILABILITY_OFFSET + offset, AVAILABILITY_SIZE);
    sTRING.encodeRaw(data.controlURI, serializableFunctionInfo, CONTROLURI_OFFSET + offset, CONTROLURI_SIZE);
    sTRING.encodeRaw(data.viewURI, serializableFunctionInfo, VIEWURI_OFFSET + offset, VIEWURI_SIZE);
    return serializableFunctionInfo.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const serializableFunctionInfo = {};
    const bufferedData = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    serializableFunctionInfo.sessionOid = objectId.decodeRaw(null, bufferedData, SESSIONOID_OFFSET + offset, SESSIONOID_SIZE);
    serializableFunctionInfo.eid = objectId.decodeRaw(null, bufferedData, EID_OFFSET + offset, EID_SIZE);
    serializableFunctionInfo.name = sTRING.decodeRaw(null, bufferedData, NAME_OFFSET + offset, NAME_SIZE);
    serializableFunctionInfo.feature = sTRING.decodeRaw(null, bufferedData, FEATURE_OFFSET + offset, FEATURE_SIZE);
    serializableFunctionInfo.configuration = sTRING.decodeRaw(null, bufferedData, CONFIGURATION_OFFSET + offset, CONFIGURATION_SIZE);
    serializableFunctionInfo.node = sTRING.decodeRaw(null, bufferedData, NODE_OFFSET + offset, NODE_SIZE);
    serializableFunctionInfo.state = uINTEGER.decodeRaw(null, bufferedData, STATE_OFFSET + offset, STATE_SIZE);
    serializableFunctionInfo.confId = uSHORT.decodeRaw(null, bufferedData, CONFID_OFFSET + offset, CONFID_SIZE);
    serializableFunctionInfo.autostart = bOOLEAN.decodeRaw(null, bufferedData, AUTOSTART_OFFSET + offset, AUTOSTART_SIZE);
    serializableFunctionInfo.type = uOCTET.decodeRaw(null, bufferedData, TYPE_OFFSET + offset, TYPE_SIZE);
    serializableFunctionInfo.instanceNumber = uSHORT.decodeRaw(null, bufferedData, INSTANCENUMBER_OFFSET + offset, INSTANCENUMBER_SIZE);
    serializableFunctionInfo.lastStateUpdateTime = uLONG.decodeRaw(null, bufferedData, LASTSTATEUPDATETIME_OFFSET + offset, LASTSTATEUPDATETIME_SIZE);
    serializableFunctionInfo.availability = bOOLEAN.decodeRaw(null, bufferedData, AVAILABILITY_OFFSET + offset, AVAILABILITY_SIZE);
    serializableFunctionInfo.controlURI = sTRING.decodeRaw(null, bufferedData, CONTROLURI_OFFSET + offset, CONTROLURI_SIZE);
    serializableFunctionInfo.viewURI = sTRING.decodeRaw(null, bufferedData, VIEWURI_OFFSET + offset, VIEWURI_SIZE);
    return serializableFunctionInfo;
  },
};
