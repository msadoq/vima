// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated file" */
require('../../../utils/test');
const stubData = require('../stubs');

const protobuf = require('../../../protobuf');


const ackEnum = require('./ackEnum');
const sendTypeEnum = require('./sendTypeEnum');

describe('protobuf/isis/tcHistory/TCHistory', () => {
  const fixture = stubData.getTCHistory();
  let buffer;
  it('encode', () => {
    buffer = protobuf.encode('isis.tcHistory.TCHistory', fixture);
    buffer.constructor.should.equal(Buffer);
  });
  it('decode', () => {
    const json = protobuf.decode('isis.tcHistory.TCHistory', buffer);
    json.should.be.an('object').that.have.properties({
      sendingDate: { type: 'time', value: fixture.sendingDate },
      tcInProgress: { type: 'boolean', value: fixture.tcInProgress },
      tcId: { type: 'integer', value: fixture.tcId },
      tcSourceId: { type: 'uinteger', value: fixture.tcSourceId },
      historyName: { type: 'string', value: fixture.historyName },
      sendType: { type: 'enum', value: fixture.sendType, symbol: sendTypeEnum[fixture.sendType] },
      tcNums: { type: 'uinteger', value: fixture.tcNums },
      expectedAck: {
        acceptance: { type: 'boolean', value: fixture.expectedAck.acceptance },
        executionComplete: { type: 'boolean', value: fixture.expectedAck.executionComplete },
        executionStart: { type: 'boolean', value: fixture.expectedAck.executionStart },
      },
      successiveAck: {
        scdCop1Ack: { type: 'enum', value: fixture.successiveAck.scdCop1Ack, symbol: ackEnum[fixture.successiveAck.scdCop1Ack] },
        cop1Ack: { type: 'enum', value: fixture.successiveAck.cop1Ack, symbol: ackEnum[fixture.successiveAck.cop1Ack] },
        stationAck: { type: 'enum', value: fixture.successiveAck.stationAck, symbol: ackEnum[fixture.successiveAck.stationAck] },
        missionFailure: { type: 'enum', value: fixture.successiveAck.missionFailure, symbol: ackEnum[fixture.successiveAck.missionFailure] },
        executionComplete: { type: 'enum', value: fixture.successiveAck.executionComplete, symbol: ackEnum[fixture.successiveAck.executionComplete] },
        acceptance: { type: 'enum', value: fixture.successiveAck.acceptance, symbol: ackEnum[fixture.successiveAck.acceptance] },
        scdCop1AckRcvDate: (typeof fixture.successiveAck.scdCop1AckRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.scdCop1AckRcvDate },
        Cop1AckRcvDate: (typeof fixture.successiveAck.Cop1AckRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.Cop1AckRcvDate },
        stationAckRcvDate: (typeof fixture.successiveAck.stationAckRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.stationAckRcvDate },
        missionFailureRcvDate: (typeof fixture.successiveAck.missionFailureRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.missionFailureRcvDate },
        executionCompleteRcvDate: (typeof fixture.successiveAck.executionCompleteRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.executionCompleteRcvDate },
        acceptanceRcvDate: (typeof fixture.successiveAck.acceptanceRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.acceptanceRcvDate },
        executionStartRcvDate: (typeof fixture.successiveAck.executionStartRcvDate === 'undefined') 
          ? null 
          : { type: 'time', value: fixture.successiveAck.executionStartRcvDate },
        executionStart: (typeof fixture.successiveAck.executionStart === 'undefined') 
          ? null 
          : { type: 'enum', value: fixture.successiveAck.executionStart, symbol: ackEnum[fixture.successiveAck.executionStart] },
      },
    });
    
    
    
    
  });
});

