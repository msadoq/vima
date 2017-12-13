import { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPanels } from 'store/reducers/pages';
import { getView } from 'store/reducers/views';
import Editor from './Editor';

const mapStateToProps = (state, { pageId }) => {
  const { editorViewId } = getPanels(state, { pageId });
  const view = getView(state, { viewId: editorViewId });
  return {
    pageId,
    viewId: editorViewId,
    type: view ? view.type : null,
  };
};

const EditorContainer = connect(mapStateToProps)(Editor);

EditorContainer.propTypes = {
  pageId: PropTypes.string.isRequired,
};

export default EditorContainer;
