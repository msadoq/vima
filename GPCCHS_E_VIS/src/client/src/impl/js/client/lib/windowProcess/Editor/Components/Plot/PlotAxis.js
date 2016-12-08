import React, { PropTypes, PureComponent } from 'react';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import {
  Form
} from 'react-bootstrap';
import {
  ButtonToggleField, InputField
} from '../Fields/';
import {
  HorizontalFormGroup,
  ClearSubmitButtons
} from '../Forms/';
import {
  FormSectionFontStyle
} from '../FormSections/';

class PlotAxis extends PureComponent {
  static propTypes = {
    /* eslint-disable react/no-unused-prop-types */
    initialValues: PropTypes.shape({
      label: PropTypes.string,
      unit: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
      autoLimits: PropTypes.bool,
      tickStep: PropTypes.number,
      autoTick: PropTypes.bool,
      showTicks: PropTypes.bool,
      isLogarithmic: PropTypes.bool,
      showAxis: PropTypes.bool,
      style: PropTypes.object
    }).isRequired,
    showTicks: PropTypes.bool,
    autoTick: PropTypes.bool,
    autoLimits: PropTypes.bool,
    handleSubmit: PropTypes.func,
    pristine: PropTypes.bool,
    reset: PropTypes.func,
    submitting: PropTypes.bool,
    valid: PropTypes.bool
  }

  static defaultProps = {
    initialValues: {
      unit: '',
      min: 0,
      max: 0,
      autoLimits: true,
      tickStep: 1,
      autoTick: true,
      showTicks: true,
      isLogarithmic: false,
      showAxis: true,
      style: {
        font: 'Arial',
        size: 12,
        bold: false,
        italic: false,
        underline: false,
        strikeOut: false,
        align: 'left',
        colour: '#000000'
      }
    }
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      showTicks,
      autoTick,
      autoLimits,
    } = this.props;

    return (
      <Form horizontal onSubmit={handleSubmit}>
        <HorizontalFormGroup label="Label">
          <Field
            name="label"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <FormSectionFontStyle name="style" />

        <HorizontalFormGroup label="Show">
          <Field
            name="showAxis"
            component={ButtonToggleField}
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Auto Limit">
          <Field
            name="autoLimits"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        { !autoLimits &&
          <HorizontalFormGroup label="Min">
            <Field
              name="min"
              component={InputField}
              normalize={value => parseFloat(value)}
              className="form-control input-sm"
              type="number"
            />
          </HorizontalFormGroup>
        }
        { !autoLimits &&
          <HorizontalFormGroup label="Max">
            <Field
              name="max"
              component={InputField}
              normalize={value => parseFloat(value)}
              className="form-control input-sm"
              type="number"
            />
          </HorizontalFormGroup>
        }

        <HorizontalFormGroup label="Unit">
          <Field
            name="unit"
            component={InputField}
            className="form-control input-sm"
            type="text"
          />
        </HorizontalFormGroup>

        <HorizontalFormGroup label="Show ticks">
          <Field
            name="showTicks"
            component={ButtonToggleField}
            styleOff="warning"
          />
        </HorizontalFormGroup>

        { showTicks &&
          <HorizontalFormGroup label="Auto Tick">
            <Field
              name="autoTick"
              component={ButtonToggleField}
              styleOff="warning"
            />
          </HorizontalFormGroup>
        }
        { showTicks && autoTick &&
          <HorizontalFormGroup label="Tick step">
            <Field
              name="tickStep"
              component={InputField}
              normalize={value => parseFloat(value)}
              className="form-control input-sm"
              type="number"
              step="any"
            />
          </HorizontalFormGroup>
        }

        <HorizontalFormGroup label="Logarithmic">
          <Field
            name="isLogarithmic"
            component={ButtonToggleField}
            styleOff="warning"
          />
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

const requiredFields = ['label'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default connect((state, { form }) => {
  const showTicks = formValueSelector(form)(state, 'showTicks');
  const autoTick = formValueSelector(form)(state, 'autoTick');
  const autoLimits = formValueSelector(form)(state, 'autoLimits');
  return {
    showTicks,
    autoTick,
    autoLimits,
  };
})(
  reduxForm({
    validate,
    enableReinitialize: true
  })(PlotAxis)
);
