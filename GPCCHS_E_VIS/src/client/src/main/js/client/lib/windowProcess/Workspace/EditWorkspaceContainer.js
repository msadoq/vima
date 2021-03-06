// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add possibility to modify domainName and sessionName
//  from GUI for view, page, window and workspace
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import { connect } from 'react-redux';

import { updateDomainName, updateSessionName } from 'store/actions/hsc';
import { getDomains } from 'store/reducers/domains';
import { getSessions } from 'store/reducers/sessions';
import { getDomainName, getSessionName } from 'store/reducers/hsc';

import EditWorkspaceWrapper from './EditWorkspaceWrapper';

const mapStateToProps = state =>
  ({
    domains: getDomains(state),
    sessions: getSessions(state),
    domainName: getDomainName(state),
    sessionName: getSessionName(state),
  });

const mapDispatchToProps = { updateDomainName, updateSessionName };

const EditWorkspaceContainer = connect(mapStateToProps, mapDispatchToProps)(EditWorkspaceWrapper);

export default EditWorkspaceContainer;
