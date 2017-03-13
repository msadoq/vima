import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import {
  HorizontalFormGroup,
  ClearSubmitButtons,
  ButtonToggleField,
  InputField,
  SelectButtonField,
} from '../../../../windowProcess/commonReduxForm/';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

class PlotGrid extends React.Component {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      // label: PropTypes.string,
      xAxisId: PropTypes.string,
      yAxisId: PropTypes.string,
      showGrid: PropTypes.bool,
      line: PropTypes.shape({
        style: PropTypes.string,
        size: PropTypes.number,
      }),
    }).isRequired,
    axes: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
  }

  static defaultProps = {
    initialValues: {
      label: 'grid 1',
      xAxisId: null,
      yAxisId: null,
      line: {
        style: 'Continuous',
        size: 1,
      },
      showGrid: false,
    },
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      axes,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        {/* Keeping in case we need to name grids!
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>
        */}
        <HorizontalFormGroup label="Show">
          <Field
            name="showGrid"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Line style">
          <Field
            component={SelectButtonField}
            name="line.style"
            buttons={lineStyleButtons}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Width">
          <Field
            name="line.size"
            component={InputField}
            normalize={value => parseFloat(value)}
            className="form-control input-sm"
            type="number"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="X Axis">
          <Field
            name="xAxisId"
            className="form-control input-sm"
            component="select"
          >
            {Object.keys(axes).map((axisId) => {
              const axis = axes[axisId];
              return (
                <option key={axisId} value={axisId}>{axis.label}</option>
              );
            })}
          </Field>
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Y Axis">
          <Field
            name="yAxisId"
            className="form-control input-sm"
            component="select"
          >
            {Object.keys(axes).map((axisId) => {
              const axis = axes[axisId];
              return (
                <option key={axisId} value={axisId}>{axis.label}</option>
              );
            })}
          </Field>
        </HorizontalFormGroup>

        <ClearSubmitButtons
          pristine={pristine}
          submitting={submitting}
          reset={reset}
          valid={valid}
        />
      </Form>
    );
  }
}


const requiredFields = [];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

const warn = () => {
  const warnings = {};
  return warnings;
};

export default reduxForm({
  validate,
  warn,
  enableReinitialize: true,
})(PlotGrid);
