import React, { PropTypes } from 'react';
import {
  Accordion,
  Panel,
  Button,
  Glyphicon
} from 'react-bootstrap';
import PlotAxis from './PlotAxis';

export default class PlotAxes extends React.Component {
  static propTypes = {
    viewId: PropTypes.string.isRequired,
    axes: PropTypes.object.isRequired,
    removeAxis: PropTypes.func.isRequired,
    updateAxis: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    expanded: PropTypes.bool.isRequired,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired
  }
  state = { };

  openPanel = key => this.setState({ [`isPanel${key}Open`]: true });
  closePanel = key => this.setState({ [`isPanel${key}Open`]: false });

  handleRemovePlotAxis = (e, key) => {
    const { removeAxis, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    removeAxis(viewId, key);
  }

  handleAddPlotAxis = (e) => {
    const { addAxis, viewId } = this.props;
    e.preventDefault();
    e.stopPropagation();
    const person = prompt('Please enter your name', 'Harry Potter');
    if (person != null) {
      addAxis(viewId, {
        label: person
      });
    }
  }

  handleSubmit = (key, values) => {
    const { updateAxis, viewId } = this.props;
    updateAxis(viewId, key, values);
  }

  render() {
    const {
      axes,
      viewId,
      expanded,
      open,
      close
    } = this.props;

    return (
      <Panel
        header={<span>
          <span className="flex">Axes</span>
          <Button
            bsSize="xsmall"
            className="pull-right btn-link"
            onClick={this.handleAddPlotAxis}
          >
            <Glyphicon
              className="text-success"
              glyph="plus"
              title="Add"
            />
          </Button>
        </span>}
        expanded={expanded}
        onSelect={open}
        onExited={close}
        {...this.props}
      >
        <Accordion>
          {Object.keys(axes).map((axisId) => {
            const axis = axes[axisId];
            return (
              <Panel
                key={axisId}
                header={<span>
                  <span className="flex">{axis.label}</span>
                  <Button
                    bsSize="xsmall"
                    className="btn-link"
                    onClick={e => this.handleRemovePlotAxis(e, axisId)}
                  >
                    <Glyphicon
                      className="text-danger"
                      glyph="remove"
                      title="Remove"
                    />
                  </Button>
                </span>}
                eventKey={axisId}
                expanded={this.state[`isPanel${axisId}Open`]}
                onSelect={this.openPanel.bind(axisId)}
                onExited={this.closePanel.bind(axisId)}
              >
                {this.state[`isPanel${axisId}Open`] &&
                  <PlotAxis
                    key={axisId}
                    initialValues={axis}
                    onSubmit={this.handleSubmit.bind(this, axisId)}
                    form={`axis-form-${axisId}-${viewId}`}
                  />}
              </Panel>
            );
          })}
        </Accordion>
      </Panel>
    );
  }
}
