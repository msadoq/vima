// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 10/04/2017 : prepare packet and history files
// VERSION : 1.1.2 : DM : #5828 : 11/04/2017 : Add getViewComponent function in viewManager
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : HistoryView work with real data .
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Remove labels from props.data in HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Create first basic table for HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add selected current to HistoryView
// VERSION : 2.0.0 : DM : #6127 : 22/09/2017 : Add rowHeight prop to HistoryView component
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEntryPoint } from 'store/actions/views';

import HistoryView from './HistoryView';
import { getData } from '../../store/dataReducer';
import { getCountBySearching } from '../../store/dataSelectors';
import { getConfigurationByViewId } from '../../../selectors';
import {
  getCatalogItemByName,
  getTupleId,
} from '../../../../store/reducers/catalogs';
import { getDomainId } from '../../../../store/reducers/domains';
import { getSessionByTimelineId } from '../../../../store/reducers/sessions';
import { getTimelinesByViewId } from '../../../../store/selectors/timelines';
import {
  getSearchCount,
  getSearchingByPage,
  getSearchViewsIds,
} from '../../../../store/reducers/pages';
import { updateSearchCount } from '../../../../store/actions/pages';


const mapStateToProps = (state, { viewId, pageId }) => {
  const data = getData(state, { viewId });
  let config = getConfigurationByViewId(state, { viewId });
  const last = _.getOr({}, 'last', data);
  const searching = getSearchingByPage(state, { pageId });
  const searchViewsIds = getSearchViewsIds(state, { pageId });
  const searchCount = getSearchCount(state, { pageId });
  const countBySearching = getCountBySearching(state, { viewId, searching });

  const scrollPosition =
    _.getOr(
      {},
      ['tables', 'history', 'scrollPosition'],
      config
    );

  config.entryPoints.forEach((ep, index) => {
    const { connectedData } = ep;

    if (connectedData) {
      const { domain, timeline, catalog, catalogItem } = connectedData;

      if (domain && timeline && catalog && catalogItem) {
        const domainId = getDomainId(state, { domainName: domain });
        const session = getSessionByTimelineId(state, { timelineId: timeline });

        const tupleId = getTupleId(domainId, _.get('id', session));

        const selectedCatalogItem = getCatalogItemByName(
          state.catalogs,
          {
            tupleId,
            name: catalog,
            itemName: catalogItem,
          }
        );

        if (selectedCatalogItem) {
          const metadata = _.getOr({}, 'metadata', selectedCatalogItem);
          config = _.set(['entryPoints', index, 'metadata'], metadata, config);
        }
      }
    }
  });

  const timelines = getTimelinesByViewId(state, { viewId });

  const isTimelineSelected = timelines.length > 0;

  return {
    config,
    last,
    scrollPosition,
    isTimelineSelected,
    searching,
    searchCount,
    countBySearching,
    searchForThisView: searchViewsIds.indexOf(viewId) !== -1,
  };
};

const mapDispatchToProps = (dispatch, { viewId, pageId }) => ({
  addEntryPoint: (entryPoint) => {
    dispatch(addEntryPoint(viewId, entryPoint));
  },
  updateSearchCount: (count) => {
    dispatch(updateSearchCount(pageId, viewId, count));
  },
});

const HistoryViewContainer = connect(mapStateToProps, mapDispatchToProps)(HistoryView);

HistoryViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default HistoryViewContainer;
