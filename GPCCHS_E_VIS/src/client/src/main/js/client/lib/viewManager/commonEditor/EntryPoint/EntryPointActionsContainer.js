import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { open as openModal } from 'store/actions/modals';
import { updateEditorSearch } from 'store/actions/views';
import EntryPointActions from 'viewManager/commonEditor/EntryPoint/EntryPointActions';

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  openModal,
  changeSearch: search => updateEditorSearch(viewId, search),
}, dispatch);

const EntryPointActionsContainer = connect(mapStateToProps, mapDispatchToProps)(EntryPointActions);

const { string, oneOf } = PropTypes;

EntryPointActionsContainer.PropTypes = {
  viewId: string.isRequired,
  search: string,
  viewType: oneOf(['TextView', 'MimicView', 'HistoryView', 'PlotView']).isRequired,
};

export default EntryPointActionsContainer;
