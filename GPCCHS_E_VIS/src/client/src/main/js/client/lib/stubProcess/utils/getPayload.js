// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move data stubs in common/protobuf
// VERSION : 1.1.2 : DM : #5828 : 23/05/2017 : Move DC stub code in client/lib/stubProcess
// VERSION : 1.1.2 : FA : #6780 : 21/06/2017 : Apply default state colors in views
// VERSION : 1.1.2 : FA : #6798 : 22/06/2017 : Remove data from protobuf in client - Change some stubProcesses and some controllers
// VERSION : 1.1.2 : FA : #6798 : 23/06/2017 : Merge branch 'dev' into pgaucher-464-proto-config
// END-HISTORY
// ====================================================================

// const _concat = require('lodash/fp/concat');
// const _times = require('lodash/fp/times');
// const _prop = require('lodash/fp/prop');
// const _compose = require('lodash/fp/compose');
// const _constant = require('lodash/fp/constant');
// const _head = require('lodash/fp/head');

const stubs = require('../../utils/stubs');
const predictibleRand = require('./predictibleRand');
const constants = require('../../constants');

const stubData = stubs.getStubData();

// INVALID = 0;
// VALID = 2;
// VALID_RAW_ONLY = 3;
// UNVERIFIED = 4;
// EXPIRED = 8;
// trying to have 70% of significant value
function getValidityState() {
  return predictibleRand.getBool(0.7) ? 2 : predictibleRand.getFrom([0, 3, 4, 8]);
}

function getMonitoringState() {
  return predictibleRand.getFrom([
    'nominal', 'warning', 'danger', 'severe', 'critical', 'outOfRange',
  ]);
}

function getSpecificAttributes(timestamp) {
  const parameterName = {
    name: 'ParameterName',
    value: predictibleRand.getFrom([
      'TMMGT_BC_VIRTCHAN0',
      'ATT_BC_REVTCOUNT1',
      'CLCW_TM_CLCWPACKET',
      'ATT_TM_AKEXENOK42',
      'AGA_AM_CCSDSAPID',
      'AGA_AM_QP2',
      'ATT_BC_ENABLED10',
      'AGA_AM_FIDCHKSTATUS',
    ]),
  };
  const groundDate = {
    name: 'groundDate',
    value: timestamp,
  };
  return [parameterName, groundDate];
}

function getAckRequest(timestamp, options) {
  const withAckRequest = (options.withAckRequest !== undefined ?
    options.withAckRequest
    : predictibleRand.getBool(0.25)
  );

  const withAck = (options.withAck !== undefined ?
    options.withAck
    : predictibleRand.getBool(0.75)
  );

  return withAckRequest ? {
    ackRequestDate: timestamp - 10,
    systemDate: timestamp,
    ack: withAck ? {
      ackDate: timestamp - 10,
      acknowledger: {
        login: predictibleRand.getString('login', 16),
        password: predictibleRand.getString('password', 64),
        profile: predictibleRand.getString('profile', 256),
        userTime: timestamp - 50000,
      },
    } : undefined,
    comment: options.setComment || predictibleRand.getString('comment', -1, 10),
  } : undefined;
}

function getNamedValue() {
  return {
    name: predictibleRand.getString('pName'),
    value: predictibleRand.getFrom([
      predictibleRand.getBool(),
      predictibleRand.getString('value'),
      predictibleRand.getInt([0, 100000]),
      predictibleRand.getFloat([0, 100000]),
    ]),
  };
}

/* eslint-disable complexity, switch case function */
const getComObject = (dataId, timestamp, options) => {
  switch (dataId.comObject) {
    case 'OnBoardAlarmAckRequest': {
      if (!predictibleRand.getBool(options.alarmFrequency || 1)) {
        return null;
      }

      return stubData.getOnBoardAlarmAckRequestProtobuf({
        oid: options.setOid || `oid${predictibleRand.getFloat([0, 10000000])}`,
        onBoardAlarm: {
          apid: predictibleRand.getInt([0, 100000]),
          reportId: predictibleRand.getInt([0, 100000]),
          reportName: predictibleRand.getString('reportName'),
          eventType: predictibleRand.getInt([0, 100000]),
          alarmLevel: getMonitoringState(),
          onBoardDate: timestamp - 20,
          groundDate: timestamp,
          parameter: [getNamedValue(), getNamedValue()],
        },
        ackRequest: getAckRequest(timestamp, options),
        satellite: predictibleRand.getString('satellite'),
        telemetryType: predictibleRand.getString('telemetryType'),
      });
    }

    case 'GroundMonitoringAlarmAckRequest': {
      if (!predictibleRand.getBool(options.alarmFrequency || 1)) {
        return null;
      }

      const withAckRequest = (options.withAckRequest !== undefined ?
        options.withAckRequest
        : predictibleRand.getBool(0.75)
      );

      const value = predictibleRand.getSinValue(timestamp, options.epName);
      const groundMonitoringAlarm = {
        creationDate: timestamp - 100,
        paramUid: predictibleRand.getInt([0, 100000]),
        updateDate: timestamp - 50,
        closingDate: predictibleRand.getBool() ? timestamp - 10 : undefined,
        hasAckRequest: withAckRequest,
        alarmId: predictibleRand.getInt([0, 100000]),
        transitions: [],
        validityState: getValidityState(),
      };

      const transitionNumber = predictibleRand.getInt([1, 6]);
      for (let i = 0; i < transitionNumber; i += 1) {
        groundMonitoringAlarm.transitions.push({
          onboardDate: timestamp,
          groundDate: timestamp + 20,
          convertedValue: value * 2,
          extractedValue: value * 3,
          rawValue: value,
          monitoringState: getMonitoringState(),
        });
      }

      return stubData.getGroundMonitoringAlarmAckRequestProtobuf({
        oid: options.setOid || `oid${predictibleRand.getFloat([0, 10000000])}`,
        groundMonitoringAlarm,
        ackRequest: getAckRequest(timestamp, options),
        parameterName: predictibleRand.getString('pName'),
        parameterType: predictibleRand.getString('pType'),
        satellite: predictibleRand.getString('satellite'),
        telemetryType: predictibleRand.getString('telemetryType'),
      });
    }

    case 'ReportingParameter': {
      const scale =
        dataId.provider === constants.PROVIDER_FLOW_HKTMR ? 0.5 : 1;

      const value = scale * predictibleRand.getSinValue(timestamp, options.epName);
      const isisAggreg = stubData.getIsisAggregationProtobuf();
      const parameter = stubData.getParameterProtobuf();
      const reportingParam = stubData.getReportingParameterProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        convertedValue: value,
        rawValue: value,
        extractedValue: value,
        monitoringState: getMonitoringState(timestamp),
        validityState: getValidityState(),
      });
      // TODO: add offset depending on provider field
      return [
        { p: isisAggreg, com: 'IsisAggregation' },
        { p: parameter, com: 'Parameter' },
        { p: reportingParam, com: 'ReportingParameter' },
      ];
    }

    case 'DecommutedPacket': {
      return stubData.getDecommutedPacketProtobuf({
        groundDate: timestamp + 20,
        onboardDate: timestamp,
        decommutedValues: [
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS1',
            extractedValue: Buffer.alloc(10, 12),
            rawValue: 2,
            convertedValue: 2,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS1',
            extractedValue: Buffer.alloc(10, 12),
            rawValue: 2,
            convertedValue: 2,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS2',
            extractedValue: Buffer.alloc(10, 1),
            rawValue: 0,
            convertedValue: 0,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS2',
            extractedValue: Buffer.alloc(10, 1),
            rawValue: 0,
            convertedValue: 0,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS3',
            extractedValue: Buffer.alloc(10, 4),
            rawValue: 12,
            convertedValue: 12.1,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS4',
            rawValue: 0,
            convertedValue: 0,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS4',
            rawValue: 1,
            convertedValue: 30,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS5',
            rawValue: 20,
            convertedValue: 0,
          }),
          stubData.getDecommutedValue({
            name: 'GENE_AM_CCSDSVERS5',
            rawValue: 13,
            convertedValue: '31',
          }),
        ],
      });
    }

    case 'StatExecution':
      return [
        { p: stubData.getExecutionProtobuf(), com: 'Execution' },
        { p: stubData.getStatValueProtobuf(), com: 'StatValue' },
        { p: stubData.getStatAggregationProtobuf({ statDate: timestamp }), com: 'StatAggregation' },
      ];

    case 'Pus003Model':
      return stubData.getPus003ModelProtobuf({
        groundDate: timestamp,
      });

    case 'Pus005Model':
      return stubData.getPus005ModelProtobuf({
        groundDate: timestamp,
      });

    case 'Pus012Model':
      return stubData.getPus012ModelProtobuf({
        groundDate: timestamp,
      });
    case 'OperationParameter':
      return stubData.getOperationParameterProtobuf();
    case 'ComputedEvent':
      return stubData.getComputedEventProtobuf();
    case 'COP1Context':
      return stubData.getCOP1ContextProtobuf();
    case 'ClcwPacket':
      return stubData.getClcwPacketProtobuf();
    case 'IsisAggregation':
      return stubData.getIsisAggregationProtobuf();
    case 'RmPacket':
      return stubData.getRmPacketProtobuf();
    case 'TmPacket':
      return stubData.getTmPacketProtobuf();
    case 'GroundMonitoringAlarm':
      return stubData.getGroundMonitoringAlarmProtobuf();
    case 'LogbookEvent':
      return stubData.getLogbookEventProtobuf({
        eventDate: timestamp,
        specificAttributes: getSpecificAttributes(timestamp),
      });
    case 'ExternalEvent':
      return stubData.getExternalEventProtobuf();
    case 'UserEvent':
      return stubData.getUserEventProtobuf();
    case 'Pus011Command':
      return stubData.getPus011CommandProtobuf();
    case 'Pus011Model':
      return stubData.getPus011ModelProtobuf();
    case 'Pus011SubSchedule':
      return stubData.getPus011SubScheduleProtobuf();
    case 'Pus011SyncPoint':
      return stubData.getPus011SyncPointProtobuf();
    case 'Pus013Model':
      return stubData.getPus013ModelProtobuf();
    case 'Pus014Model':
      return stubData.getPus014ModelProtobuf();
    case 'Pus015Model':
      return stubData.getPus015ModelProtobuf();
    case 'Pus018Model':
      return stubData.getPus018ModelProtobuf();
    case 'Pus019Model':
      return stubData.getPus019ModelProtobuf();
    case 'Pus140Model':
      return stubData.getPus140ModelProtobuf();
    case 'Pus142Model':
      return stubData.getPus142ModelProtobuf();
    case 'Pus144Model':
      return stubData.getPus144ModelProtobuf();
    case 'StatValue':
      return stubData.getStatisticValueProtobuf();
    default: {
      return undefined;
    }
  }
};

/**
 * Generate payload for stubs
 * @param  {number} timestamp Timestamp for the generated payload
 * @param  {object} dataId
 * @param  {Object} options   Options for generation
 * @return {Object}           Generated payload
 */
module.exports = function getPayload(timestamp, dataId, versionDCCom, options = {}) {
  const _options = options;
  _options.epName = (options.epName === undefined ? 'todo' : options.epName);

  predictibleRand.setSeed(timestamp);

  let payload = getComObject(dataId, timestamp, _options);

  if (payload === null) {
    return null;
  }

  // Decorate payload with ADEGenericPayload in case of proto ADE
  if (versionDCCom === constants.DC_COM_V2) {
    if (Array.isArray(payload)) {
      payload = stubData.getADEPayloadProtobuf(payload.map(payloadPart => ({
        payload: payloadPart.p,
        providerId: 0,
        comObjectType: payloadPart.com,
        instanceOid: 0,
      })
      ));
    } else {
      payload = stubData.getADEPayloadProtobuf({
        payload,
        providerId: 0,
        comObjectType: dataId.comObject,
        instanceOid: 0,
      });
    }
  }

  return {
    timestamp: stubData.getTimestampProtobuf({ ms: timestamp }),
    payload,
  };
};
