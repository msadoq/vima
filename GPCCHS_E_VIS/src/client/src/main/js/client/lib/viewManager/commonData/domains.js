// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 22/03/2017 : remove structure last and range
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : FA : #5846 : 10/05/2017 : Add option to launch vima in realtime play mode
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 14/06/2017 : Move common/log and common/parameters in client/
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _has from 'lodash/has';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isNull from 'lodash/isNumber';
import _isUndefined from 'lodash/isUndefined';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import { get } from 'common/configurationManager';

let memoizedDomains;
let memoizedSearchs = {};

export function reset(domains) {
  memoizedDomains = domains;
  memoizedSearchs = {};
}

export function save(search, result) {
  if (search !== get('WILDCARD_CHARACTER')) {
    _set(memoizedSearchs, [search], result);
  }
}

export function find(search, domains, viewDomain, pageDomain, workspaceDomain) {
  if (!domains || !domains.length) {
    return { error: 'invalid entry point, no domain available' };
  }
  if (search === '' || _isNull(search) || _isUndefined(search)) {
    return { error: 'invalid entry point, invalid domain field' };
  }
  const wildcardCharacter = get('WILDCARD_CHARACTER');
  let domainName = search;
  if (search === wildcardCharacter) {
    // Look to domainNames defined on
    if (viewDomain && viewDomain !== wildcardCharacter) { // 1. view
      domainName = viewDomain;
    } else if (pageDomain && pageDomain !== wildcardCharacter) {  // 2. page
      domainName = pageDomain;
    } else if (workspaceDomain && workspaceDomain !== wildcardCharacter) { // 3. workspace
      domainName = workspaceDomain;
    } else {
      return { error: 'invalid entry point, domain not defined on entities' };
    }
  }

  const domainIds = _map(_filter(domains, d => d.name === domainName), d => d.domainId);
  if (domainIds.length < 1) {
    return { error: 'invalid entry point, no domain matches' };
  } else if (domainIds.length > 1) {
    return { error: 'invalid entry point, more than one domains match' };
  }

  return { domainId: domainIds[0], domainName };
}

/**
 * Apply search on domains and return corresponding domainId.
 *
 * Search is memoized until domains list is common to the whole app.
 *
 * @param domains
 * @param search
 * @param viewDomain
 * @param pageDomain
 * @param workspaceDomain
 * @returns {*}
 */
export default function findDomain(
  domains,
  search,
  viewDomain,
  pageDomain,
  workspaceDomain) {
  // domains have changed
  if (memoizedDomains !== domains) {
    reset(domains);
  }

  // perform new search
  if (!_has(memoizedSearchs, [search])) {
    const domain =
      find(search, memoizedDomains, viewDomain, pageDomain, workspaceDomain);
    save(search, domain);
    return domain;
  }

  return _get(memoizedSearchs, [search]);
}
