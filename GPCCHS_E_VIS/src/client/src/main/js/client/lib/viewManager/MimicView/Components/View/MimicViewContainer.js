// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : prepare mimic view container .
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : DM : #6129 : 04/05/2017 : merge dev on mimic branch
// VERSION : 1.1.2 : DM : #6785 : 31/05/2017 : Add possibility to show links in views
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : DM : #5822 : 21/06/2017 : add context menu in mimiv view to open entry points
//  in inspector
// VERSION : 1.1.2 : DM : #7111 : 03/07/2017 : Add config parameter VISU_WINDOW_MAX_DURATION to
//  limit visuWindow per view
// VERSION : 1.1.2 : DM : #6785 : 21/07/2017 : add links on mimicView if specify in svg editor
// VERSION : 1.1.2 : DM : #6816 : 02/08/2017 : add mimic benchmark with isolated mimicView
//  component
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : fix display in every view
// END-HISTORY
// ====================================================================

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash/fp';

import { askOpenLink } from 'store/actions/links';
import { getViewContent } from 'viewManager/MimicView/store/configurationSelectors';
import { getPageIdByViewId, getPage, getSearchCount, getSearchingByPage, getSearchViewsIds } from 'store/reducers/pages';
import { isMaxVisuDurationExceeded } from 'store/reducers/timebars';
import { isAnyInspectorOpened } from 'store/selectors/pages';
import { getInspectorEpId } from 'store/reducers/inspector';
import { getLinks, areLinksShown } from 'store/reducers/views';
import { removeLink, updateShowLinks } from 'store/actions/views';
import { getViewEntryPoints } from 'store/selectors/views';
import MimicViewWrapper from './MimicViewWrapper';
import { updateSearchCount } from '../../../../store/actions/pages';
import { getDataFilteredByEP } from '../../store/dataReducer';

const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const searching = getSearchingByPage(state, { pageId });
  const searchViewsIds = getSearchViewsIds(state, { pageId });
  const searchCount = getSearchCount(state, { pageId });
  const entryPoints = getViewEntryPoints(state, { viewId });
  const data = getDataFilteredByEP(state, { viewId }, entryPoints);

  return {
    content: getViewContent(state, { viewId }),
    entryPoints,
    data,
    isInspectorOpened: isAnyInspectorOpened(state),
    inspectorEpId: getInspectorEpId(state),
    links: getLinks(state, { viewId }),
    pageId,
    showLinks: areLinksShown(state, { viewId }),
    isMaxVisuDurationExceeded: isMaxVisuDurationExceeded(state,
      { timebarUuid: page.timebarUuid, viewType: 'PlotView' }),
    searching,
    searchCount,
    searchForThisView: searchViewsIds.indexOf(viewId) !== -1,
  };
};

const mapDispatchToProps = (dispatch, { viewId, pageId }) => bindActionCreators({
  removeLink,
  updateShowLinks,
  updateSearchCount: count => updateSearchCount(pageId, viewId, count),
  openLink: linkId => askOpenLink(viewId, linkId),
}, dispatch);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  openLink: linkName => dispatchProps.openLink(_.findIndex({ name: linkName }, stateProps.links)),
});

const MimicViewContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(MimicViewWrapper);

MimicViewContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
};

export default MimicViewContainer;
