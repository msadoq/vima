import React from 'react';
import PropTypes from 'prop-types';
import Collapse, { Panel } from 'rc-collapse';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import ViewParamsContainer from 'viewManager/commonEditor/ViewParamsContainer';
import TableColumnsEditorContainer
  from '../../../common/Components/View/TableColumnsEditor/TableColumnsEditorContainer';

export default class PUS19Tab extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    panels: PropTypes.shape({}).isRequired,
    // from PUS19TabContainer mapDispatchToProps
    updateViewPanels: PropTypes.func.isRequired,
  };

  onChange = (openPanels) => {
    const { updateViewPanels, viewId } = this.props;
    updateViewPanels(viewId, 'panels', openPanels);
  };

  render() {
    const { panels, viewId } = this.props;

    return (
      <ErrorBoundary>
        <Collapse
          accordion={false}
          onChange={this.onChange}
          defaultActiveKey={Object.keys(panels)}
        >
          <Panel
            header="Parameters"
            key="parameters"
          >
            {panels.parameters && <ViewParamsContainer viewId={viewId} />}
          </Panel>
          <Panel
            header="Event Actions Columns"
            key="pus19-event-action-panel"
          >
            {
              panels['pus19-event-action-panel'] &&
              <TableColumnsEditorContainer
                viewId={viewId}
                tableId={'eventActions'}
              />
            }
          </Panel>
        </Collapse>
      </ErrorBoundary>
    );
  }
}
