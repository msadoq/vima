import sinon from 'sinon';
import { connect } from 'rtd/catalogs';
import { Reporting as loadReportings } from 'rtd/stubs/loaders';
import { Reporting as generateReporting } from 'rtd/stubs/generators';
import { should } from '../../common/test';
import {
  getShortDescription,
  getLongDescription,
  getAliases,
  getMonitoringLaws,
  getCalibrationFunctions,
  getSignificativityConditions,
  getComputedParameterFormula,
  getComputedParameterTriggers,
} from './';
import monitorings from '../monitorings';
import { SDB_NAMESPACE } from '../constants';

const socket = '/tmp/rtd.sock';
const mockRedis = true;
const sessionId = 0;
const domainId = 3;

let reporting;
const items = [
  generateReporting({ name: 'TEST_ITEM1', namespace: SDB_NAMESPACE, uid: 1, domainId }),
];

let rtd;

let monitoringStub;
let rtdStub;

describe('rtdManager/reportings', () => {
  beforeAll((done) => {
    monitoringStub = sinon.stub(monitorings, 'getTriggers').callsFake((opts, monitoring, callback) => {
      callback(null, 'StubTriggers');
    });
    connect({ socket, mockRedis }, (err, catalogApi) => {
      should.not.exist(err);
      should.exist(catalogApi);
      rtd = catalogApi;
      loadReportings(rtd.getDatabase().getClient(), { sessionId, domainId, items }, done);
    });
  });
  afterAll(() => {
    monitoringStub.restore();
  });
  beforeEach((done) => {
    rtd.getCatalogByName('Reporting', SDB_NAMESPACE, 'TEST_ITEM1', sessionId, domainId, (getErr, item) => {
      should.not.exist(getErr);
      should.exist(item);
      reporting = item;
      rtdStub = sinon.stub(rtd, 'getCatalogByName').callsFake((catalog, namespace, name, session, domain, callback) => {
        callback(null, 'StubMonitoring');
      });
      done(null);
    });
  });
  afterEach(() => {
    if (rtdStub) {
      rtdStub.restore();
    }
  });
  it('getShortDescription', (done) => {
    getShortDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      desc.should.be.a('string');
      done();
    });
  });
  it('getLongDescription', (done) => {
    getLongDescription({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      desc.should.be.a('string');
      done();
    });
  });
  it('getAliases', (done) => {
    getAliases({ rtd, sessionId, domainId }, reporting, (err, aliases) => {
      aliases.should.be.an('array');
      aliases[0].should.be.an('object');
      aliases[0].should.have.a.property('Alias');
      aliases[0].should.have.a.property('ContextDomain');
      done();
    });
  });
  it('getMonitoringLaws', (done) => {
    getMonitoringLaws({ rtd, sessionId, domainId }, reporting, (err, laws) => {
      const keys = Object.keys(laws);
      keys.should.have.lengthOf(1);
      keys[0].should.be.oneOf(['OnGround', 'OnBoard']);
      laws[keys[0]].should.be.an('array').that.has.lengthOf(2);
      laws[keys[0]][0].should.have.a.properties({ Triggers: 'StubTriggers' });
      done();
    });
  });
  it('getSignificativityConditions', (done) => {
    getSignificativityConditions({ rtd, sessionId, domainId }, reporting, (err, conds) => {
      conds.should.be.an('array');
      conds[0].should.be.an('object');
      conds[0].should.have.a.property('DomainApplicability');
      done();
    });
  });
  it('getCalibrationFunctions', (done) => {
    getCalibrationFunctions({ rtd, sessionId, domainId }, reporting, (err, funcs) => {
      funcs.should.be.an('object');
      funcs.should.have.a.property('DefaultInterpretationFunction').that.is.an('object');
      funcs.should.have.a.property('ConditionalInterpretationFunctions').that.is.an('array');
      done();
    });
  });
  /* it('getTMPackets', (done) => {
    getTMPackets({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  /* it('getComputingDefinitions', (done) => {
    getComputingDefinitions({ rtd, sessionId, domainId }, reporting, (err, desc) => {
      console.log(desc);
      done();
    });
  });*/
  it('getComputedParameterFormula', (done) => {
    getComputedParameterFormula({ rtd, sessionId, domainId }, reporting, (err, formula) => {
      formula.should.be.a('string');
      done();
    });
  });
  it('getComputedParameterTriggers', (done) => {
    getComputedParameterTriggers({ rtd, sessionId, domainId }, reporting, (err, triggers) => {
      triggers.should.be.an('array');
      done();
    });
  });
});
