import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWindowPages } from '../../store/selectors/windows';
import { focusPage } from '../../store/actions/windows';
import { closePage } from '../../store/actions/pages';
import Tabs from './Tabs';

const mapStateToStore = (state, { windowId }) => ({
  pages: getWindowPages(state, { windowId }),
});

function mapDispatchToProps(dispatch, { windowId }) {
  return bindActionCreators({
    focusPage: pageId => focusPage(windowId, pageId),
    closePage: pageId => closePage(windowId, pageId),
  }, dispatch);
}

const TabsContainer = connect(mapStateToStore, mapDispatchToProps)(Tabs);

TabsContainer.propTypes = {
  windowId: PropTypes.string.isRequired,
};

export default TabsContainer;
