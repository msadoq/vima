// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6829 : 27/06/2017 : PlotView legend : left right top bottom.
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by
//  calling this.props.reset() onMount.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView,
//  MimicView, DynamicView forms.
// VERSION : 2.0.0 : FA : #8123 : 27/09/2017 : free attribute on ReactSelectFIeld disappears. Every
//  session/domain form in vima is fixed and works (page, view).
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// VERSION : 2.0.0.1 : FA : #11627 : 13/04/2018 : deal with multidomain sat colors
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

import React from 'react';
import PropTypes from 'prop-types';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import { Field, reduxForm } from 'redux-form';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ButtonToggleField from 'windowProcess/commonReduxForm/ButtonToggleField';
import FormSectionFontStyle from 'viewManager/commonEditor/FormSections/FormSectionFontStyle';
import classnames from 'classnames';
import { computeOptions } from 'viewManager/commonEditor/Fields/common';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import { validateRequiredFields } from '../../../common';

class ViewParamsForm extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      showLegend: PropTypes.bool.isRequired,
      legend: PropTypes.shape({
        location: PropTypes.string,
      }).isRequired,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
      }),
    }).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    pristine: PropTypes.bool.isRequired,
    reset: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    valid: PropTypes.bool.isRequired,
    domains: PropTypes.arrayOf(PropTypes.shape()).isRequired,
    sessions: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  state = {
    domain: null,
    session: null,
  }

  componentDidMount() {
    // Only one ReactSelectField works without this re-render
    setTimeout(this.props.reset, 0);
  }

  newDomain = (domain) => {
    this.setState({ domain });
  }

  newSession = (session) => {
    this.setState({ session });
  }

  handleTitle = ({ target: { value: title } }) => {
    this.setState({ title });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      domains,
      sessions,
      initialValues: { domainName, sessionName },
    } = this.props;
    const {
      domain,
      session,
    } = this.state;

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
          <div className="page-header">
            <h4>Title</h4>
          </div>
          <HorizontalFormGroup label="Title">
            <Field
              name="title"
              component={InputField}
              className="form-control input-sm"
              type="text"
            />
          </HorizontalFormGroup>

          <FormSectionFontStyle name="titleStyle" />

          <div className="page-header">
            <h4>Content</h4>
          </div>
          <div className="page-header">
            <h4>Legend</h4>
          </div>
          <HorizontalFormGroup label="Show">
            <Field
              name="showLegend"
              component={ButtonToggleField}
              styleOff="warning"
            />
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Location">
            <Field
              name="legend.location"
              component="select"
              className="form-control input-sm"
            >
              <option value="top">Top</option>
              <option value="right">Right</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
            </Field>
          </HorizontalFormGroup>
          <div className="page-header">
            <h4>Configuration</h4>
          </div>
          <HorizontalFormGroup label="Domain Name">
            <Field
              name="domainName"
              component={ReactSelectField}
              onInputChange={this.newDomain}
              clearable
              options={computeOptions(domains, true)}
              value={domainName || domain}
            />
          </HorizontalFormGroup>
          <HorizontalFormGroup label="Session Name">
            <Field
              name="sessionName"
              component={ReactSelectField}
              onInputChange={this.newSession}
              clearable
              options={computeOptions(sessions, true)}
              value={sessionName || session}
            />
          </HorizontalFormGroup>
        </Form>
      </ErrorBoundary>
    );
  }
}

const requiredFields = ['title'];

export default reduxForm({
  validate: validateRequiredFields(requiredFields),
  warn: () => ({}),
  enableReinitialize: true,
})(ViewParamsForm);
