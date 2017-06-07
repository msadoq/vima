import parseConnectedData from './parseConnectedData';

describe('viewManager/commonData/parseConnectedData', () => {
  let connectedData;
  let timelines;
  let domains;
  let sessions;
  beforeEach(() => {
    connectedData = {
      formula: 'Reporting.ATT_BC_STR1VOLTAGE<ReportingParameter>.extractedValue',
      domain: 'cnes',
      timeline: 'tl1',
      filter: [],
    };
    timelines = [
      { id: 'tl1', sessionName: 'session1', offset: 0 },
      { id: 'tl2', sessionName: 'session2', offset: 10 },
      { id: 'other', sessionName: 'sessionOther', offset: -10 },
      { id: undefined, sessionName: 'invalid', offset: 0 },
    ];
    sessions = [
      { name: 'session1', id: 1 },
      { name: 'session2', id: 2 },
      { name: 'sessionOther', id: 3 },
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
  it('no domains', () => {
    expect(
      parseConnectedData([], sessions, timelines, connectedData, 'Session master')
    ).toEqual({ error: 'invalid entry point, no domain available' });
  });
  it('multiple domains', () => {
    connectedData.domain = 'cnes*';
    expect(
      parseConnectedData(domains, sessions, timelines, connectedData, 'Session master')
    ).toEqual({ error: 'invalid entry point, no domain matches' });
  });
  it('no session defined', () => {
    connectedData.timeline = 'tl10';
    expect(
      parseConnectedData(domains, sessions, timelines, connectedData, 'Session master')
    ).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
  it('no session', () => {
    expect(
      parseConnectedData(domains, [], timelines, connectedData, 'Session master')
    ).toEqual({ error: 'invalid entry point, no session available' });
  });
  it('multiple session', () => {
    connectedData.timeline = 'tl*';
    expect(
      parseConnectedData(domains, sessions, timelines, connectedData, 'Session master')
    ).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
  it('invalid formula', () => {
    connectedData.formula = 'formula';
    expect(
      parseConnectedData(domains, sessions, timelines, connectedData, 'Session master')
    ).toEqual(
      { error: `unable to parse this connectedData formula ${connectedData.formula}` }
    );
  });
  it('valid', () => {
    const res = parseConnectedData(domains, sessions, timelines, connectedData, 'Session master');
    expect(res).toEqual({
      dataId: {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        domainId: 'd1',
        domain: 'cnes',
        sessionName: 'session1',
        sessionId: 1,
      },
      filters: [],
      field: 'extractedValue',
      offset: 0,
    });
  });
  it('decommuted param => no field', () => {
    connectedData.formula = 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>';
    const res = parseConnectedData(domains, sessions, timelines, connectedData, 'Session master');
    expect(res).toEqual({
      dataId: {
        catalog: 'TelemetryPacket',
        parameterName: 'CLCW_TM_NOMINAL',
        comObject: 'DecommutedPacket',
        domainId: 'd1',
        domain: 'cnes',
        sessionName: 'session1',
        sessionId: 1,
      },
      filters: [],
      offset: 0,
      field: undefined,
    });
  });
  it('wildcard => view Data', () => {
    connectedData.domain = '*';
    connectedData.timeline = '*';
    const res = parseConnectedData(domains, sessions, timelines, connectedData, 'Session master',
      'cnes', 'cnes.isis', 'cnes', 'session1', 'session2');
    expect(res).toEqual({
      dataId: {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        domainId: 'd1',
        domain: 'cnes',
        sessionName: 'session1',
        sessionId: 1,
      },
      filters: [],
      field: 'extractedValue',
      offset: 0,
    });
  });
  it('wildcard => page Data', () => {
    connectedData.domain = '*';
    connectedData.timeline = '*';
    const res = parseConnectedData(domains, sessions, timelines, connectedData, 'Session master',
      undefined, 'cnes.isis', 'cnes', undefined, 'session1', 'session2');
    expect(res).toEqual({
      dataId: {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        domainId: 'd2',
        domain: 'cnes.isis',
        sessionName: 'session1',
        sessionId: 1,
      },
      filters: [],
      field: 'extractedValue',
      offset: 0,
    });
  });
  it('wildcard => workspace Data', () => {
    connectedData.domain = '*';
    connectedData.timeline = '*';
    const res = parseConnectedData(domains, sessions, timelines, connectedData, 'Session master',
      undefined, undefined, 'cnes.isis', undefined, undefined, 'session1');
    expect(res).toEqual({
      dataId: {
        catalog: 'Reporting',
        parameterName: 'ATT_BC_STR1VOLTAGE',
        comObject: 'ReportingParameter',
        domainId: 'd2',
        domain: 'cnes.isis',
        sessionName: 'session1',
        sessionId: 1,
      },
      filters: [],
      field: 'extractedValue',
      offset: 0,
    });
  });
});
