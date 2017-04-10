import { connect } from 'react-redux';
import { getConfigurationByViewId } from '../viewManager';
import { getViewEntryPointsName } from '../store/selectors/views';
import { updateContent } from '../store/actions/views';
import { closeHtmlEditor } from '../store/actions/editor';
import Source from './Source';

const mapStateToProps = (state, { viewId }) => {
  const configuration = getConfigurationByViewId(state, { viewId });
  const entryPointsName = getViewEntryPointsName(state, { viewId });
  return {
    content: configuration.content,
    entryPointsName,
  };
};

const mapDispatchToProps = dispatch => ({
  updateContent: (viewId, value) => {
    dispatch(updateContent(viewId, value.html));
  },
  closeHtmlEditor: () => {
    dispatch(closeHtmlEditor());
  },
});

export const SourceContainer = connect(mapStateToProps, mapDispatchToProps)(Source);

export default SourceContainer;
