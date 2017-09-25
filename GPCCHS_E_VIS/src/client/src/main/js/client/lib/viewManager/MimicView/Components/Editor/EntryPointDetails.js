import React, { PropTypes, PureComponent } from 'react';
import Collapse from 'rc-collapse';

import EntryPointConnectedData from './EntryPointConnectedData';
import AddEntryPoint from './AddEntryPoint';
import EntryPointStateColors from '../../../commonEditor/EntryPoint/EntryPointStateColors';

const { Panel } = Collapse;
const emptyArray = [];

/*
  EntryPointDetails représente un Point d'entrée,
  c'est à dire à une branche de l'arbre d'entryPoints.
*/
export default class EntryPointDetails extends PureComponent {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    timelines: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string,
      id: PropTypes.string,
      kind: PropTypes.string,
      offset: PropTypes.number,
      sessionId: PropTypes.number,
      timelineUuid: PropTypes.string,
    })).isRequired,
    panels: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.bool,
    ]).isRequired,
    entryPoint: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      connectedData: PropTypes.shape({
        digits: PropTypes.number,
        domain: PropTypes.string,
        filter: PropTypes.arrayOf(PropTypes.shape({
          field: PropTypes.string,
          operand: PropTypes.string,
          operator: PropTypes.string,
        })),
      }),
    }).isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    updateEntryPoint: PropTypes.func.isRequired,
    updateViewSubPanels: PropTypes.func.isRequired,
  }

  static defaultProps = {
    panels: [],
  }

  onChange = (openPanels) => {
    const {
      updateViewSubPanels,
      viewId,
      entryPoint,
    } = this.props;
    updateViewSubPanels(viewId, 'entryPoints', entryPoint.id, openPanels);
  }

  handleSubmit = (values) => {
    const { entryPoint, updateEntryPoint, viewId } = this.props;
    updateEntryPoint(viewId, entryPoint.id, {
      ...entryPoint,
      ...values,
    });
  }

  render() {
    const {
      entryPoint,
      viewId,
      panels,
      timelines,
      domains,
    } = this.props;

    return (
      <Collapse
        accordion={false}
        onChange={this.onChange}
        defaultActiveKey={panels === true ? emptyArray : panels}
      >
        <Panel
          key="parameters"
          header="Parameters"
        >
          {Array.isArray(panels) && panels.includes('parameters') && <AddEntryPoint
            onSubmit={this.handleSubmit}
            form={`entrypoint-title-form-${entryPoint.id}-${viewId}`}
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initialValues={{
              name: entryPoint.name,
            }}
          />}
        </Panel>
        <Panel
          key="coordinates"
          header="Coordinates"
        >
          {Array.isArray(panels) && panels.includes('coordinates') && <EntryPointConnectedData
            domains={domains}
            timelines={timelines}
            form={`entrypoint-connectedData-form-${entryPoint.id}-${viewId}`}
            onSubmit={values => this.handleSubmit({ connectedData: values })}
            initialValues={entryPoint.connectedData}
          />}
        </Panel>
        <Panel
          key="stateColors"
          header="State colors"
        >
          {Array.isArray(panels) && panels.includes('stateColors') && <EntryPointStateColors
            // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
            initialValues={{
              stateColors: entryPoint.stateColors || [],
            }}
            form={`entrypoint-stateColors-form-${entryPoint.id}-${viewId}`}
            onSubmit={this.handleSubmit}
          />}
        </Panel>
      </Collapse>
    );
  }
}
