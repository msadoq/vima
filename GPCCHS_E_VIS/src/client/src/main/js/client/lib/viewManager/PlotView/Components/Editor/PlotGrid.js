// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #3622 : 09/03/2017 : Moving the editor files in viewManager, splitting
//  between commonEditor and commonReduxForm.
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Fixed import errors in editor components.
// VERSION : 1.1.2 : DM : #5828 : 21/03/2017 : Prefer precise named import over .. from 'index.js'
//  import.
// VERSION : 1.1.2 : DM : #6302 : 03/04/2017 : Add comment and fix coding convetions warning and
//  un-needed relaxations
// VERSION : 1.1.2 : FA : ISIS-FT-2134 : 18/05/2017 : Porting #6660 patch 9 to version 1.2.
//  Changing default PlotView props (axis, grid).
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0 : FA : ISIS-FT-2280 : 06/12/2017 : ergonomie plotView VIMA // l'utilisateur doit
//  pouvoir choisir avec ou sans ligne entre les points sans "tricher" en mettant Line size = 0
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import SelectButtonField from 'windowProcess/commonReduxForm/SelectButtonField';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { validateRequiredFields } from '../../../common';

const lineStyleButtons = [
  { label: 'Continuous', icon: 'continuous' },
  { label: 'Dashed', icon: 'dashed' },
  { label: 'Dotted', icon: 'doted' },
];

class PlotGrid extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
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
  };

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
  };

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
      <ErrorBoundary>
        <Form
          horizontal
          onSubmit={handleSubmit}
          className={classnames(
            { 'redux-form-dirty': !pristine },
            'redux-form-padded'
          )}
        >
          <ClearSubmitButtons
            pristine={pristine}
            submitting={submitting}
            reset={reset}
            valid={valid}
          />
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
            <span>Time</span>
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Y Axis">
            <Field
              name="yAxisId"
              className="form-control input-sm"
              component="select"
            >
              {
                Object.keys(axes)
                .filter(key => key !== 'time')
                .map(axisId =>
                  <option key={axisId} value={axisId}>{axes[axisId].label}</option>
                )
              }
            </Field>
          </HorizontalFormGroup>
        </Form>
      </ErrorBoundary>
    );
  }
}

const requiredFields = [];

export default reduxForm({
  validate: validateRequiredFields(requiredFields),
  warn: () => ({}),
  enableReinitialize: true,
})(PlotGrid);
