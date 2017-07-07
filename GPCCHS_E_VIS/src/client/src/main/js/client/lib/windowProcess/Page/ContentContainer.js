import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { updateLayout, askOpenPage } from '../../store/actions/pages';
import { closeView, askOpenView } from '../../store/actions/views';
import { getPageViews } from '../../store/selectors/pages';
import {
  getPageLayoutWithCollapsed,
  getTimebarUuid,
  getMaximizedViewdUuid,
} from './ContentSelectors';

import Content from './Content';

const mapStateToProps = createStructuredSelector({
  layouts: getPageLayoutWithCollapsed,
  views: getPageViews,
  timebarUuid: getTimebarUuid,
  maximizedViewUuid: getMaximizedViewdUuid,
});

const mapDispatchToProps = (dispatch, { windowId, pageId }) => (
  bindActionCreators({
    closeView: viewId => closeView(pageId, viewId),
    updateLayout: layout => updateLayout(pageId, layout),
    askOpenPage: filePath => askOpenPage(windowId, filePath),
    askOpenView: filePath => askOpenView(filePath),
  }, dispatch)
);

const ContentContainer = connect(mapStateToProps, mapDispatchToProps)(Content);

ContentContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
  pageId: PropTypes.string,
};

export default ContentContainer;
