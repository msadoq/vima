import { connect } from 'react-redux';
import DataViewEntryPoints from 'viewManager/commonEditor/EntryPoint/DataViewEntryPoints';
import PropTypes from 'prop-types';

const mapStateToProps = () => ({});

const DataViewEntryPointsContainer = connect(
  mapStateToProps, {}
)(DataViewEntryPoints);

const { string, oneOf } = PropTypes;

DataViewEntryPointsContainer.PropTypes = {
  viewId: string.isRequired,
  pageId: string.isRequired,
  search: string,
  viewType: oneOf(['TextView', 'MimicView', 'HistoryView']).isRequired,
};


export default DataViewEntryPointsContainer;