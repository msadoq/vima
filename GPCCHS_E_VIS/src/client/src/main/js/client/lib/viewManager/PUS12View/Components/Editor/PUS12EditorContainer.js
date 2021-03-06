import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getViewPanels, getViewTab } from 'store/reducers/ui/editor';
import { getConfigurationByViewId } from 'viewManager/index';
import {
  open as openModal,
} from 'store/actions/modals';
import { getViewTitle, getViewTitleStyle } from 'store/reducers/views/index';
import { updateViewPanels, updateViewTab } from 'store/actions/ui';
import PUS12Editor from 'viewManager/PUS12View/Components/Editor/PUS12Editor';
import { updateEntryPoint } from 'store/actions/views';

const mapStateToProps = createStructuredSelector({
  title: getViewTitle,
  titleStyle: getViewTitleStyle,
  configuration: getConfigurationByViewId,
  panels: getViewPanels,
  tab: getViewTab,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal,
  updateViewTab,
  updateViewPanels,
  updateEntryPoint,
}, dispatch);

const PUS12EditorContainer = connect(mapStateToProps, mapDispatchToProps)(PUS12Editor);

PUS12EditorContainer.propTypes = {
  viewId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default PUS12EditorContainer;
