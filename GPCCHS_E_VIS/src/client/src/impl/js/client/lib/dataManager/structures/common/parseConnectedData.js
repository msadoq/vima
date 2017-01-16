import globalConstants from 'common/constants';
import formulaParser from './formula';
import remoteIdGenerator from './remoteId';
import domainsFilter from './domains';
import timelinesFilter from './timelines';
import structures from '..';

export default function applyDomainsAndTimebar(
  connectedData, structureType, timebarUuid, viewMasterTimeline, visuWindow, timelines, domains
) {
  const { formula, domain, timeline, filter } = connectedData;

  // formula
  const parameter = formulaParser(formula);
  if (!parameter) {
    return { error: `unable to parse this connectedData formula ${formula}` };
  }
  const {
    catalog,
    parameterName,
    comObject,
    field,
  } = parameter;
  const expectedField = field || globalConstants.extractedValue;

  // domain
  const domainSearch = domainsFilter(domains, domain);
  if (domainSearch.error) {
    return domainSearch;
  }
  const domainId = domainSearch.domainId;

  // timeline
  const timelineSearch = timelinesFilter(timelines, viewMasterTimeline, timeline);
  if (timelineSearch.error) {
    return timelineSearch;
  }
  const { sessionId, offset } = timelineSearch;

  // remoteId
  const dataId = { catalog, parameterName, comObject, domainId, sessionId };
  const remoteId = remoteIdGenerator(structureType, dataId, filter);

  // expectedInterval
  const selector = structures(structureType, 'getExpectedInterval');
  const expectedInterval = selector(
    visuWindow.lower - offset, visuWindow.current - offset, visuWindow.upper - offset
  );
  if (!expectedInterval) {
    return { error: 'no valid expected interval found' };
  }

  return {
    remoteId,
    dataId,
    filter, // TODO : filter"s"
    field: expectedField,
    expectedInterval,
    offset,
  };
}
