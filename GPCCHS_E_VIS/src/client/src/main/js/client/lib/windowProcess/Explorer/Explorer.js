import React, { PureComponent, PropTypes } from 'react';
import _get from 'lodash/get';
import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';
import DataMapContainer from './widgets/DataMapContainer';
import StoreContainer from './widgets/StoreContainer';

import styles from './Explorer.css';

const NotAlreadyImplemented = () => <div>Not already implemented</div>;

const widgets = {
  dsex: { title: 'DataStore explorer', component: NotAlreadyImplemented },
  rte: { title: 'RTE', component: NotAlreadyImplemented },
  inspector: { title: 'Inspector', component: NotAlreadyImplemented },
  map: { title: 'Data map (developer)', component: DataMapContainer },
  store: { title: 'Store (developer)', component: StoreContainer },
  cache: { title: 'Cache (developer)', component: NotAlreadyImplemented },
  performances: { title: 'Performances (developer)', component: NotAlreadyImplemented },
  information: { title: 'Information (developer)', component: NotAlreadyImplemented },
};

export default class Explorer extends PureComponent {
  static propTypes = {
    pageId: PropTypes.string.isRequired,
    tabId: PropTypes.string,
    focusTabInExplorer: PropTypes.func.isRequired,
  }

  static defaultProps = {
    tabId: Object.keys(widgets)[0],
  }

  handleSelect = (event) => {
    const tabId = event.target.value;
    if (tabId) {
      const { pageId, focusTabInExplorer } = this.props;
      focusTabInExplorer(pageId, tabId);
    }
  }

  /**
   * DataStore explorer:
   * - ...
   * RTE:
   * - ...
   * Inspector:
   * - ...
   * ====== separator =======
   * Data map:
   * - data map
   * = copy
   * = console
   * Store:
   * - redux store
   * = copy
   * = console
   * Cache:
   * - server info
   * - last cache cleanup time
   * = clean cache
   * = refresh
   * Performances:
   * - health
   * - pubsub time
   * - number of views and points
   * = wasted
   * = profile
   * Informations:
   * - releases
   * - branch
   * - build time
   * - configuration
   */

  // <div className={styles.nav}>
  // <Nav bsStyle="tabs" activeKey={tabId} onSelect={this.handleSelect} >
  // <NavItem eventKey="perRemoteId" title="Entry point list of current page">
  // <div className={styles.tabs}>Data Map</div>
  // </NavItem>
  // <NavItem eventKey="perViewId" title="Entry point list per view on current page">
  // <div className={styles.tabs}>View Map</div>
  // </NavItem>
  // <NavItem eventKey="server" title="Server information">
  // <div className={styles.tabs}>Server</div>
  // </NavItem>
  // </Nav>
  // </div>

  // {(tabId === 'perRemoteId') && <PerRemoteIdContainer pageId={pageId} />}
  // {(tabId === 'perViewId') && <PerViewContainer pageId={pageId} />}
  // {(tabId === 'server') && <ServerInfoContainer />}
  // {(tabId === 'health') && <HealthContainer />}

  render() {
    const { tabId } = this.props;

    const Widget = _get(widgets, [tabId, 'component'], NotAlreadyImplemented);

    return (
      <div className={styles.container}>
        <FormGroup controlId="formControlsSelect">
          <FormControl
            componentClass="select"
            onChange={this.handleSelect}
            value={tabId}
          >
            {Object.keys(widgets).map(
              id => <option key={id} value={id}>{_get(widgets, [id, 'title'])}</option>
            )}
          </FormControl>
        </FormGroup>
        <div className={styles.widgetContainer}>
          <Widget />
        </div>
      </div>
    );
  }
}
