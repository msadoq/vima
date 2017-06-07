import { freezeArgs } from '../../../common/test';
import * as actions from '../../actions/domains';
import domainsReducer, { getDomains } from '.';

const reducer = freezeArgs(domainsReducer);

describe('store:domains:reducer', () => {
  it('initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });
  it('unknown action', () => {
    expect(reducer([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }], {})).toEqual([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
  it('set state', () => {
    expect(reducer(undefined, actions.updateDomains([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]))).toEqual([{
      itemNamespace: 'Domains',
      name: 'fr.cnes.sat1',
      oid: '0051525005151000565215465660515',
      domainId: 27,
      parentDomainId: 98,
    }]);
  });
});

describe('store:domains:selectors', () => {
  describe('getDomains', () => {
    it('should return the whole list', () => {
      const state = {
        domains: {
          myDomainId: { domainId: 1 },
          myOtherId: { domainId: 2 },
        },
      };
      expect(getDomains(state)).toBe(state.domains);
    });
  });
});
