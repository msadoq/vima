import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SizablePlotView from './PlotView';
import { addEntryPoint } from '../../../../store/actions/views';
import { getViewEntryPoints } from '../../../../store/selectors/views';
import { getData } from '../../store/dataReducer';
import { getTimebar } from '../../../../store/reducers/timebars';
import { getPage, getPageIdByViewId } from '../../../../store/reducers/pages';
import { getConfigurationByViewId } from '../../../../viewManager';

const mapStateToProps = (state, { viewId }) => {
  const pageId = getPageIdByViewId(state, { viewId });
  const page = getPage(state, { pageId });
  const timebar = getTimebar(state, { timebarUuid: page.timebarUuid });

  return {
    configuration: getConfigurationByViewId(state, { viewId }),
    entryPoints: getViewEntryPoints(state, { viewId }),
    data: getData(state, { viewId }),
    visuWindow: timebar ? timebar.visuWindow : null,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => bindActionCreators({
  addEntryPoint: data => addEntryPoint(viewId, data),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SizablePlotView);
