import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from 'viewManager/common/Components/ErrorBoundary';

import './PUS15View.scss';
import VirtualizedTableViewContainer
  from '../../../common/Components/View/VirtualizedTableView/VirtualizedTableViewContainer';
import { tableOverrideStyle, tableModifier } from '../../../common/pus/utils';


// ON BOARD STORAGES
const _onBoardStoragesStatusKeyList = ['storeStatus', 'downlinkStatus'];
// apply background color to cells for which value is ENABLED or DISABLED
const _onBoardStoragesOverrideStyle = tableOverrideStyle(_onBoardStoragesStatusKeyList);

const onBoardStoragesTooltips = {
  storeId: { mode: 'lastUpdateModeStoreId', time: 'lastUpdateTimeStoreId' },
  dumpEnabled: { mode: 'lastUpdateModeStoreId', time: 'lastUpdateTimeStoreId' },
  storageType: { mode: 'lastUpdateModeStoreType', time: 'lastUpdateTimeStoreType' },
  storeName: { mode: 'lastUpdateModeStoreType', time: 'lastUpdateTimeStoreId' },
  storeStatus: { mode: 'lastUpdateModeStoreStatus', time: 'lastUpdateTimeStoreStatus' },
  downlinkStatus: { mode: 'lastUpdateModeDownlinkStatus', time: 'lastUpdateTimeDownlinkStatus' },
};
const _onBoardStoragesModifier = tableModifier(onBoardStoragesTooltips);


// STORAGE DEFINITIONS
const storageDefTooltips = {
  serviceType: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  serviceSubType: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sid: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sidLabel: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  sidName: { mode: 'lastUpdateModePacketId', time: 'lastUpdateTimePacketId' },
  subsamplingRatio: { mode: 'lastUpdateModeSubSamplingRatio', time: 'lastUpdateTimeSubSamplingRatio' },
};
const _storageDefContentModifier = tableModifier(storageDefTooltips);

export default class PUS15View extends React.Component {
  static propTypes = {
    // own props
    viewId: PropTypes.string.isRequired,
    // From PUS15ViewContainer mapStateToProps
    data: PropTypes.shape({
      headers: PropTypes.arrayOf(PropTypes.shape()),
      tables: PropTypes.shape(),
    }),
  };

  static defaultProps = {
    data: {
      headers: [],
      tables: {},
    },
  };

  static contextTypes = {
    windowId: PropTypes.string,
  };

  render() {
    const {
      viewId,
      data,
    } = this.props;

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return renderInvald('Please fill-in configuration');
    }

    const headers = data.headers.map(header =>
      (
        <div className="header">
          {renderHeaders(
            header.serviceApid,
            header.serviceApidName
          )}
        </div>
      ));


    return (
      <ErrorBoundary>
        <div className="pus15">
          <div className="header">
            {headers}
          </div>
          <div className="col-sm-12 h100">
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'onBoardStorages'}
                data={data.tables.onBoardStorages.data}
                contentModifier={_onBoardStoragesModifier}
                overrideStyle={_onBoardStoragesOverrideStyle}
              />
            </div>
            <div className="row tablesHeight">
              <VirtualizedTableViewContainer
                viewId={viewId}
                tableId={'storageDef'}
                data={data.tables.storageDef.data}
                contentModifier={_storageDefContentModifier}
              />
            </div>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export const renderHeaders = (
  serviceApid,
  serviceApidName
) => (
  <ErrorBoundary>
    <div className="info col-sm-4 pus15_ap">
      Application Process&nbsp;
      <input type="text" disabled value={serviceApidName} />&nbsp;
      <input className="mw50" type="text" disabled value={serviceApid} />
    </div>
  </ErrorBoundary>
);

export const renderInvald = error => (
  <div className="pus15 h100 posRelative">
    <div className="flex h100">
      <div className="renderErrorText">
        Unable to render view <br />
        {error}
      </div>
    </div>
  </div>
);
