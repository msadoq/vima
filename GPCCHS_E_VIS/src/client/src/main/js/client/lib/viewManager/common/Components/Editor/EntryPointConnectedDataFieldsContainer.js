import { connect } from 'react-redux';
import EntryPointConnectedDataFields from 'viewManager/common/Components/Editor/EntryPointConnectedDataFields';
import { askItemMetadata } from 'store/actions/catalogs';
import {
  getSelectedCatalogName,
  getSelectedComObjectName,
  getSelectedDataType,
  getSelectedDomainInForm,
  getSelectedItemName,
  getSelectedTimelineId,
  getSelectedPath,
  getSelectedDisplayMode,
} from 'viewManager/commonEditor/Fields/selectors';
import { getTupleId, getAlgorithmMetadata } from 'store/reducers/catalogs';
import { getDomainId } from 'store/reducers/domains';
import { getSessionByNameWithFallback, getSessionNameFromTimeline } from 'store/reducers/sessions';
import { get } from '../../../../common/configurationManager';


const wildcardCharacter = get('WILDCARD_CHARACTER');

const mapStateToProps = (state, { form, viewId, pageId }) => {
  const domainName = getSelectedDomainInForm(form, state);
  const timelineId = getSelectedTimelineId(form, state);
  const sessionName = getSessionNameFromTimeline(state, { timelineId, wildcardCharacter });
  const sessionId = getSessionByNameWithFallback(state, { sessionName, viewId, pageId }).id;
  const domainId = getDomainId(state, { viewId, pageId, domainName });
  const tupleId = getTupleId(domainId, sessionId);
  const name = getSelectedCatalogName(form, state);
  const selectedPath = getSelectedPath(form, state);
  const metadata = getAlgorithmMetadata(state.catalogs, { tupleId, name, itemName: selectedPath });

  return {
    selectedDomainName: domainName,
    selectedTimelineId: timelineId,
    selectedCatalogName: name,
    selectedItemName: getSelectedItemName(form, state),
    selectedComObjectName: getSelectedComObjectName(form, state),
    dataType: getSelectedDataType(form, state),
    selectedPath,
    selectedDisplayMode: getSelectedDisplayMode(form, state),
    metadata,
  };
};

const mapDispatchToProps = {
  getFormula: (viewId, pageId, domainName, timelineId, catalog, item) =>
    askItemMetadata(viewId, pageId, domainName, timelineId, catalog, item),
};

const EntryPointConnectedDataFieldsContainer =
  connect(mapStateToProps, mapDispatchToProps)(EntryPointConnectedDataFields);

export default EntryPointConnectedDataFieldsContainer;
