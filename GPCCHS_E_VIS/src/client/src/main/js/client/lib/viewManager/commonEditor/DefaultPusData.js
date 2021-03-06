/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';
import HorizontalFormGroup from 'windowProcess/commonReduxForm/HorizontalFormGroup';
import DomainFieldContainer from 'viewManager/commonEditor/Fields/DomainFieldContainer';
import ApplicationProcessFieldContainer from 'viewManager/commonEditor/Fields/ApplicationProcessFieldContainer';
import TimelineFieldContainer from 'viewManager/commonEditor/Fields/TimelineFieldContainer';
import { VM_PUS_VIEWS, VM_VIEW_PUS140, VM_VIEW_PUSMME } from 'viewManager/constants';

export default class DefaultPusData extends PureComponent {
  static propTypes = {
    // Own props
    viewId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    change: PropTypes.func.isRequired, // comes from redux-form magically: https://redux-form.com/6.2.0/docs/api/props.md/#-change-field-string-value-any-function-
    pusType: PropTypes.oneOf(VM_PUS_VIEWS).isRequired, // comes from redux-form magically: https://redux-form.com/6.2.0/docs/api/props.md/#-change-field-string-value-any-function-
    // From DefaultPusDataContainer's mapStateToProps
    selectedDomainName: PropTypes.string,
    selectedTimelineId: PropTypes.string,
  };

  static defaultProps = {
    selectedDomainName: null,
    selectedTimelineId: null,
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  handleChange = (apid, fieldName) => {
    const { change } = this.props;
    change(fieldName, apid);
  };

  render() {
    const { windowId } = this.context;
    const {
      viewId,
      pageId,
      selectedDomainName,
      selectedTimelineId,
      pusType,
    } = this.props;
    const apidsField = ![VM_VIEW_PUSMME, VM_VIEW_PUS140].includes(pusType) &&
      (
        <HorizontalFormGroup label="Application Process">
          <ApplicationProcessFieldContainer
            domainName={selectedDomainName}
            timelineId={selectedTimelineId}
            viewId={viewId}
            pageId={pageId}
            onChange={this.handleChange}
            pusType={pusType}
          />
        </HorizontalFormGroup>
      );
    return (
      <ErrorBoundary>
        <React.Fragment>
          <HorizontalFormGroup label="Domain">
            <DomainFieldContainer />
          </HorizontalFormGroup>

          <HorizontalFormGroup label="Timeline">
            <TimelineFieldContainer
              windowId={windowId}
            />
          </HorizontalFormGroup>
          {/*
            These views must subscribe to all apids at once, and therefore should not offer the
            possibility to select some apids. We shall always send 65535 in that case. @see SDD
          */}
          { apidsField }
        </React.Fragment>
      </ErrorBoundary>
    );
  }
}
