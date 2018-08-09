import _ from 'lodash/fp';
import { connect } from 'react-redux';
import { open as openModal } from 'store/actions/modals';
import { getData } from 'viewManager/PUSMMEView/store/dataReducer';
import PUSMMEView from './PUSMMEView';

import { getConfigurationByViewId } from '../../../selectors';
import { getWindowIdByViewId } from '../../../../store/selectors/windows';

const mapStateToProps = (state, { viewId }) => {
  const data = getData(state, { viewId });
  const config = getConfigurationByViewId(state, { viewId });
  const windowId = getWindowIdByViewId(state, { viewId });

  const packetsData = _.get(
    ['tables', 'packets'],
    data
  );

  return {
    noHkPackets: _.getOr(null, 'noHkPackets', data),
    noDiagPackets: _.getOr(null, 'noDiagPackets', data),
    domain: _.getOr(null, ['entryPoints', 0, 'connectedData', 'domain'], config),
    timeline: _.getOr(null, ['entryPoints', 0, 'connectedData', 'timeline'], config),
    packetsData,
    windowId,
  };
};

const mapDispatchToProps = (dispatch, { viewId }) => ({
  onCommandCellDoubleClick: (windowId, packetStore, packetParameter) => {
    dispatch(
      openModal(
        windowId,
        {
          type: 'pusMmeModal',
          title: 'Details for Packet',
          viewId,
          packetStore,
          packetParameter,
        }
      )
    );
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,
  onCommandCellDoubleClick: (rowIndex) => {
    const { packetsData } = stateProps;

    const data = packetsData.data[rowIndex];

    // extract modal data
    const {
      pusMmePacketStore,
      pusMmePacketParameter,
    } = data;

    dispatchProps.onCommandCellDoubleClick(
      stateProps.windowId,
      pusMmePacketStore,
      pusMmePacketParameter
    );
  },
});

const PUSMMEViewContainer =
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )(PUSMMEView);

export default PUSMMEViewContainer;
