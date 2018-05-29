/* eslint-disable no-unused-vars */
import { connect } from 'react-redux';

import { filterColumn, toggleColumnSort } from 'store/actions/tableColumns';
import { pause } from 'store/actions/hsc';
import VirtualizedTableView from './VirtualizedTableView';
import { getConfigurationByViewId } from '../../../../selectors';
import { getIsPlaying } from '../../../../../store/reducers/hsc';


const mapStateToProps = (state, { viewId, tableId, rows }) => {
  const config = getConfigurationByViewId(state, { viewId });
  const tableConfig = config.tables[tableId];
  const isPlaying = getIsPlaying(state);

  const { columns, sorting, filters, name } = tableConfig;

  return {
    rows: rows.rows,
    columns,
    sortState: sorting,
    filterState: filters,
    tableName: name,
    totalCount: rows.totalCount,
    isPlaying,
  };
};

const mapDispatchToProps = (dispatch, { viewId, tableId, bodyCellActions, pauseOnScroll }) => ({
  onScrollTop: () => {
    if (pauseOnScroll) {
      dispatch(pause());
    }
  },
  onFilter: (col, value) => {
    dispatch(filterColumn(viewId, tableId, col, value));
  },
  onSort: (col, mode) => {
    dispatch(toggleColumnSort(viewId, tableId, col, mode));
  },
  onBodyCellAction: (name, data, rowIndex, columnIndex) => {
    const action = bodyCellActions.find(actionElem => actionElem.label === name);

    if (action) {
      if (!action.onClick) {
        console.error(`[NotImplementedError] onClick is not defined for action [${action.label}]`);
      }

      action.onClick(data, rowIndex, columnIndex);
    }
  },
  onCellClick: (i, j, content) => {
    console.error('[NotImplementedError] Click on cell has not yet been implemented');
    console.info(i, j, content);
  },
  onCellDoubleClick: (i, j, content) => {
    console.error('[NotImplementedError] Double-click on cell has not yet been implemented');
    console.info(i, j, content);
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onScrollTop: () => {
    if (stateProps.isPlaying) {
      dispatchProps.onScrollTop();
    }
  },
});

const VirtualizedTableViewContainer =
  connect(mapStateToProps, mapDispatchToProps, mergeProps)(VirtualizedTableView);


export default VirtualizedTableViewContainer;
