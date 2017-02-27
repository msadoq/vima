import _isUndefined from 'lodash/isUndefined';
import any from 'lodash/fp/any';
import { createSelector } from 'reselect';
// import getLogger from 'common/log';

import { getMasterSessionId } from '../store/selectors/masterSession';
import { getDomains } from '../store/selectors/domains';
import { getTimebarTimelinesSelector } from '../store/selectors/timebars';
import { getView } from '../store/selectors/views';
import { getStructureType, getStructureModule } from '../viewManager';

// const logger = getLogger('data:perViewData');

const anyUndefined = any(_isUndefined);

/**
* Get data definitions for a view
* @param state
* @param timebarUuid
* @param viewId
*/
export default function makeGetPerViewData() {
  return createSelector(
    getMasterSessionId,
    getDomains,
    getTimebarTimelinesSelector,
    getView,
    (state, { timebarUuid }) => timebarUuid,
    (masterSessionId, domains, viewTimelines, view, timebarUuid) => {
      if (anyUndefined([domains, view, timebarUuid, viewTimelines])) {
        return {};
      }
      const { configuration } = view;
      // Ignore collapsed view
      if (configuration.collapsed) {
        return {};
      }
      const { entryPoints, type } = configuration;
      const structureType = getStructureType(type);

      return {
        type,
        masterSessionId,
        structureType,
        entryPoints: entryPoints.reduce((acc, ep) => {
          const val =
          getStructureModule(type).parseEntryPoint(
            domains,
            viewTimelines,
            ep,
            masterSessionId,
            timebarUuid,
            type
          );
          return Object.assign({}, acc, val);
        }, {}
        ),
      };
    });
}