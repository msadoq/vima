// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : General Editor Refacto : using GenericModal, using
//  rc-collapse module instead of bootstrap accordion.
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Plot axis edition general revision. Fields
//  min, max and tickStep are stored in store as float, float, int, but handled in ReduxForm as
//  strings.
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : Plot axes log settings stored in store and
//  documents.
// VERSION : 2.0.0.2 : FA : #11609 : 20/04/2018 : correction plot view editeur unit + label(unit) +
//  test (cherry picked from commit 3c9fde0)
// END-HISTORY
// ====================================================================

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import AddPlotAxis from './AddPlotAxis';

const initialValues = {
  label: '',
  unit: '',
  min: '0',
  max: '0',
  autoLimits: true,
  tickStep: '1',
  autoTick: true,
  showTicks: true,
  logarithmic: false,
  logSettings: {
    min: '0.1',
    max: '1000000000',
    base: '10',
  },
  showAxis: true,
  style: {
    font: 'Arial',
    size: 12,
    bold: false,
    italic: false,
    underline: false,
    strikeOut: false,
    align: 'left',
    color: '#000000',
  },
};

export default class AddEntryPointWrapper extends Component {

  static propTypes = {
    viewId: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    addAxis: PropTypes.func.isRequired,
    axes: PropTypes.shape({}).isRequired,
  };

  willAddAxis = (values) => {
    const {
      addAxis,
      closeModal,
      viewId,
    } = this.props;
    addAxis(
      viewId,
      {
        ...values,
        min: parseFloat(values.min),
        max: parseFloat(values.max),
        tickStep: parseFloat(values.tickStep),
        logSettings: {
          min: parseFloat(values.logSettings.min),
          max: parseFloat(values.logSettings.max),
          base: parseInt(values.logSettings.base, 10),
        },
        unit: values.unit.length === 0 ? 'Unknown' : values.unit,
      }
    );
    closeModal();
  }

  render() {
    return (
      <ErrorBoundary>
        <AddPlotAxis
          onSubmit={this.willAddAxis}
          axes={this.props.axes}
          form={`add-plot-axis-${this.props.viewId}`}
          initialValues={initialValues}
        />
      </ErrorBoundary>
    );
  }
}
