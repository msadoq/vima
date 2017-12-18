// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : add entry points to mimic view
// VERSION : 1.1.2 : FA : ISIS-FT-1945 : 22/05/2017 : Remove required fields in editor to allow view model creation from editor
// VERSION : 1.1.2 : DM : #6829 : 07/07/2017 : Resolved issue on empty ReactSelectFields, by calling this.props.reset() onMount.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 19/07/2017 : Added dirty state in TextView, PlotView, MimicView, DynamicView forms.
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 24/08/2017 : Fixed few eslint errors / warnings no-console and spaced-comment.
// END-HISTORY
// ====================================================================

import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import {
  Form,
} from 'react-bootstrap';
import _get from 'lodash/get';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import ClearSubmitButtons from 'windowProcess/commonReduxForm/ClearSubmitButtons';
import EntryPointConnectedDataFields from './EntryPointConnectedDataFields';

const { string, func, bool } = PropTypes;

/*
  EntryPointConnectedData représente une donnée connectée à un entryPoint.
  Dans le cas de l'éditeur de la Plot, il y en a 2 (en X et Y).

  Composant react-select :
  https://github.com/JedWatson/react-select
*/
class EntryPointConnectedData extends Component {
  componentDidMount() {
    setTimeout(this.props.reset, 0);
  }

  render() {
    const {
      handleSubmit,
      pristine,
      reset,
      submitting,
      valid,
      timeline,
      domain,
    } = this.props;

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
        <br />
        <EntryPointConnectedDataFields
          timeline={timeline}
          domain={domain}
        />
      </Form>
    );
  }
}

EntryPointConnectedData.propTypes = {
  handleSubmit: func.isRequired,
  pristine: bool.isRequired,
  reset: func.isRequired,
  submitting: bool.isRequired,
  valid: bool.isRequired,
  timeline: string,
  domain: string,
};

EntryPointConnectedData.defaultProps = {
  timeline: null,
  domain: null,
};

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

export default reduxForm({
  validate,
  enableReinitialize: true,
})(
  connect(
    (state, props) => {
      const selector = formValueSelector(props.form);
      return {
        timeline: selector(state, 'timeline') || _get(props, 'initialValues.timeline'),
        domain: selector(state, 'domain') || _get(props, 'initialValues.domain'),
      };
    }
  )(EntryPointConnectedData)
);