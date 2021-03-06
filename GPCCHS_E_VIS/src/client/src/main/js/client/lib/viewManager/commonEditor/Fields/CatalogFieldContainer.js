import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCatalogs,
  areCatalogsLoaded,
  areCatalogsLoading,
} from 'store/selectors/catalogs';
import { getDomainId } from 'store/reducers/domains';
import { getSessionIdWithFallback, getSessionNameFromTimeline } from 'store/reducers/sessions';
import { askCatalogs, updateCatalogField } from 'store/actions/catalogs';
import { get } from 'common/configurationManager';
import CatalogField from './CatalogField';


const requested = [];

const wildcardCharacter = get('WILDCARD_CHARACTER');

const mapStateToProps = (state, {
  name,
  domainName,
  timelineId,
  viewId,
  pageId,
  viewSessionName,
}) => {
  const domainId = getDomainId(state, { domainName, viewId, pageId });
  const sessionName = viewSessionName
    || getSessionNameFromTimeline(state, { timelineId, wildcardCharacter });
  const sessionId = getSessionIdWithFallback(state, { sessionName, viewId, pageId });
  const catalogs = getCatalogs(state, { domainId, sessionId });

  const loading = areCatalogsLoading(state, { domainId, sessionId });
  const loaded = areCatalogsLoaded(state, { domainId, sessionId });

  const shouldLoadCatalogs =
    typeof domainId === 'number' &&
    typeof sessionId === 'number' &&
    !loaded &&
    !loading;

  return {
    name,
    catalogs,
    sessionId,
    domainId,
    shouldLoadCatalogs,
    loading,
    loaded,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCatalogField,
  askCatalogs,
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  askCatalogs: () => {
    const { domainId, sessionId, shouldLoadCatalogs } = stateProps;

    const requestId = [domainId, sessionId];

    if (shouldLoadCatalogs) {
      if (_.findIndex(_.isEqual(requestId), requested) === -1) {
        dispatchProps.askCatalogs(domainId, sessionId);
        requested.push(requestId);
      }
    }
  },
});

const CatalogFieldContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CatalogField);

export default CatalogFieldContainer;

