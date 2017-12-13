import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getView } from 'store/reducers/views';
import { getPage, getPanels } from 'store/reducers/pages';
import { getDataSelectors } from 'viewManager';

import Header from './Header';

const makeMapStateToProps = () => (state, { pageId, viewId }) => {
  const {
    type,
    isModified,
    backgroundColor,
    titleStyle,
  } = getView(state, { viewId });

  const { getFullTitle } = getDataSelectors(type);
  const title = getFullTitle(state, { viewId });
  const page = getPage(state, { pageId });
  const { editorIsMinimized, editorViewId } = getPanels(state, { pageId });

  return {
    backgroundColor,
    type,
    title,
    titleStyle,
    isModified,
    isViewsEditorOpen: !editorIsMinimized && editorViewId === viewId,
    collapsed:
      !!(page.layout.find(e => e.i === viewId && e.collapsed)), // TODO boxmodel factorize
  };
};

Header.propTypes = {
  pageId: PropTypes.string.isRequired,
};

// return function to avoid page grid layout and React DOM re-conciliation issue
export default connect(makeMapStateToProps, null)(Header);
