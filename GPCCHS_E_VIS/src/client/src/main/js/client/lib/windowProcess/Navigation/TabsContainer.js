import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from '../../store/selectors/windows';
import { focusPage, addAndMount, unmountAndRemove } from '../../store/actions/windows';
import Tabs from './Tabs';

const mapStateToStore = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    focusPage: pageId => focusPage(windowId, pageId),
    addAndMount: () => addAndMount(windowId),
    removeAndUnmountPage: pageId => unmountAndRemove(windowId, pageId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToStore, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default TabsContainer;
