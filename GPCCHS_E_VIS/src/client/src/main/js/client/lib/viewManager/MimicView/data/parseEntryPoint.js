import __ from 'lodash/fp';

import globalConstants from '../../../constants';
import getLogger from 'common/log';
import remoteIdGenerator from 'common/utils/flattenDataId';
import parseConnectedData from '../../commonData/parseConnectedData';

const logger = getLogger('data:MimicView:parseEntryPoint');
function flattenStateColors(stateColors = []) {
  if (!stateColors.length) {
    return '';
  }

  return __.compose(
    str => `:${str}`,
    __.join(','),
    __.sortBy(__.identity),
    __.map(({ color, condition: { field, operator, operand } }) => `${color}.${field}.${operator}.${operand}`)
  )(stateColors);
}

function parseEntryPoint(
  domains,
  sessions,
  timelines,
  entryPoint,
  masterSessionId,
  timebarUuid,
  viewType) {
  if (!timebarUuid) {
    logger.info('invalid entryPoint', name, 'No timebar associated with this entry point');
    return { [entryPoint.name]: { error: 'No timebar associated with this entry point' } };
  }
  const { connectedData, name, id, stateColors } = entryPoint;

  const cd = parseConnectedData(domains, sessions, timelines, connectedData, masterSessionId);
  if (cd.error) {
    logger.info('invalid entryPoint', name, cd.error);
    return { [name]: { error: cd.error } };
  }
  const { dataId, field, offset, filters } = cd;
  // compute remoteId
  const remoteId = remoteIdGenerator(dataId);

  const ep = {
    [name]: {
      remoteId,
      dataId,
      localId: `${field}.${timebarUuid}:${offset}${flattenStateColors(entryPoint.stateColors)}`,
      field,
      offset,
      filters,
      timebarUuid,
      structureType: globalConstants.DATASTRUCTURETYPE_LAST,
      id,
      type: viewType,
    },
  };
  if (stateColors) {
    ep[name].stateColors = stateColors;
  }
  return ep;
}
module.exports = parseEntryPoint;
