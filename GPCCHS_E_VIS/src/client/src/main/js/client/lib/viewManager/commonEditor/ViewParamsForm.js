import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import InputField from 'windowProcess/commonReduxForm/InputField';
import ColorPickerField from 'windowProcess/commonReduxForm/ColorPickerField';
import ReactSelectField from 'windowProcess/commonReduxForm/ReactSelectField';
import FormSectionFontStyle from './FormSections/FormSectionFontStyle';

class ViewParamsForm extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types, "DV6 TBC_CNES Support. by ReduxForm HOC"
    initialValues: PropTypes.shape({
      backgroundColor: PropTypes.string,
      title: PropTypes.string,
      sessionName: PropTypes.string,
      domainName: PropTypes.string,
      titleStyle: PropTypes.shape({
        font: PropTypes.string,
        size: PropTypes.number,
        bold: PropTypes.bool,
        italic: PropTypes.bool,
        underline: PropTypes.bool,
        strikeOut: PropTypes.bool,
        align: PropTypes.string,
        color: PropTypes.string,
        bgColor: PropTypes.string,
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

        <HorizontalFormGroup label="Bg Color">
          <Field
            name="backgroundColor"
            component={ColorPickerField}
          />
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
            options={
              domains.map(d =>
                ({
                  label: d.name,
                  value: d.name,
                })
              )
              .concat(
                domain && !domains.find(s => s.name === domain) ?
                { label: domain, value: domain } : []
              )
              .concat(
                domainName && !domains.find(s => s.name === domainName) ?
                { label: domainName, value: domainName } : []
              )
            }
          />
        </HorizontalFormGroup>
        <HorizontalFormGroup label="Session Name">
          <Field
            name="sessionName"
            component={ReactSelectField}
            onInputChange={this.newSession}
            clearable
            options={
              sessions.map(s =>
                ({
                  label: s.name,
                  value: s.name,
                })
              )
              .concat(
                session && !sessions.find(s => s.name === session) ?
                { label: session, value: session } : []
              )
              .concat(
                sessionName && !sessions.find(s => s.name === sessionName) ?
                { label: sessionName, value: sessionName } : []
              )
            }
          />
        </HorizontalFormGroup>
      </Form>
    );
  }
}


const requiredFields = ['title'];
const validate = (values = {}) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = 'Required';
    }
  });
  return errors;
};

export default reduxForm({
  validate,
  warn: () => ({}),
  enableReinitialize: true,
})(ViewParamsForm);
