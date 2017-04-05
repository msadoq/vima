import globalConstants from 'common/constants';
import parseEntryPoint from './parseEntryPoint';

describe('viewManager/PlotView/data/parseEntryPoint', () => {
  let timelines;
  let domains;
  let entryPoint;
  let sessions;
  beforeEach(() => {
    entryPoint = {
      name: 'ATT_BC_STR1VOLTAGE',
      id: 'ep1',
      connectedData: {
        formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
        fieldX: 'groundDate',
        domain: 'cnes',
        timeline: 'tl1',
        filter: {},
      },
      stateColors: [
        {
          color: '#000000',
          condition: {
            field: 'monitoringState',
            operator: '==',
            operand: 'waiting',
          },
        },
      ],
    };
    sessions = [
      { name: 'session1', id: 1 },
      { name: 'session2', id: 2 },
      { name: 'sessionOther', id: 3 },
    ];
    timelines = [
      { id: 'tl1', sessionName: 'session1', offset: 0 },
      { id: 'tl2', sessionName: 'session2', offset: 10 },
      { id: 'other', sessionName: 'sessionOther', offset: -10 },
      { id: undefined, sessionName: 'invalid', offset: 0 },
    ];
    domains = [
      { domainId: 'd1', name: 'cnes' },
      { domainId: 'd2', name: 'cnes.isis' },
      { domainId: 'd3', name: 'cnes.isis.sat1' },
      { domainId: 'd4', name: 'cnes.isis.sat2' },
      { domainId: 'd5', name: 'cnes.isis.sat2.gun' },
      { domainId: 'invalid', name: undefined },
    ];
  });
  it('no connectedData', () => {
    entryPoint.connectedData.fieldX = '';
    const ep = parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'No field X' } });
  });
  it('no timebarUuid', () => {
    const ep = parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', '', 'TextView');
    ep.should.eql({ ATT_BC_STR1VOLTAGE: { error: 'No timebar associated with this entry point' } });
  });
  it('valid', () => {
    parseEntryPoint(domains, sessions, timelines, entryPoint, 'Session 1', 'TB1', 'PlotView')
    .should.eql({
      ATT_BC_STR1VOLTAGE: {
        id: 'ep1',
        dataId: {
          catalog: 'Reporting',
          parameterName: 'ATT_BC_STR1VOLTAGE',
          comObject: 'ReportingParameter',
          domainId: 'd1',
          domain: 'cnes',
          sessionId: 1,
          sessionName: 'session1',
        },
        fieldX: 'groundDate',
        fieldY: 'extractedValue',
        offset: 0,
        filter: {},
        localId: 'groundDate/extractedValue.TB1:0',
        timebarUuid: 'TB1',
        structureType: globalConstants.DATASTRUCTURETYPE_RANGE,
        remoteId: 'range@Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>:1:d1',
        type: 'PlotView',
        stateColors: [
          {
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operator: '==',
              operand: 'waiting',
            },
          },
        ],
      },
    });
  });
});