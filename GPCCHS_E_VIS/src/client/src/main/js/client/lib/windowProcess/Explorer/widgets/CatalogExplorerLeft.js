import React, { PureComponent, PropTypes } from 'react';
import {
  Panel,
  // FormGroup,
  // ControlLabel,
  FormControl,
} from 'react-bootstrap';
import _map from 'lodash/map';
import getLogger from 'common/log';
import Tree from './Tree';
import { main } from '../../ipc';
import styles from './CatalogExplorer.css';
// import handleContextMenu from '../../common/handleContextMenu';

const logger = getLogger('CatalogExplorerLeft');

// const catalogsHeader = (
//   <h2>Catalogs / Versions</h2>
// );
// const itemNamesHeader = (
//   <h2>Namespaces / Names</h2>
// );

const createItemKey = (sessionId, domainId, catalog, namespace, name) =>
  `${sessionId}:${domainId}:${catalog}:${namespace}:${name}`;

export default class CatalogExplorerLeft extends PureComponent {
  static propTypes = {
    // DATA
    sessions: PropTypes.arrayOf(PropTypes.string),
    domains: PropTypes.arrayOf(PropTypes.string),
    catalogs: PropTypes.arrayOf(PropTypes.object),
    itemNames: PropTypes.arrayOf(PropTypes.object),
    focusedItem: PropTypes.shape({
      key: PropTypes.string,
      session: PropTypes.string,
    }),
    openedItems: PropTypes.shape({}),
    // ACTIONS
    toggleCatalogNode: PropTypes.func.isRequired,
    activeCatalogNode: PropTypes.func.isRequired,
    toggleItemNameNode: PropTypes.func.isRequired,
    activeItemNameNode: PropTypes.func.isRequired,
    deleteItemNames: PropTypes.func.isRequired,
    setFocusedItem: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sessions: [],
    domains: [],
    catalogs: [],
    itemNames: [],
    focusedItem: {
      key: null,
    },
    openedItems: {},
  };

  onSessionChange = (event) => {
    const session = event.target.value;
    main.getRteDomains(session);
  }

  onDomainChange = (event) => {
    const { focusedItem } = this.props;
    const { session } = focusedItem;
    const domain = event.target.value;
    main.getRteCatalogs(session, domain);
  }

  onMouseDown = (key, event, node) => {
    if (event.buttons === 1) {
      const { deleteItemNames, focusedItem, openedItems } = this.props;
      switch (key) {
        case 'catalogs':
          this.props.toggleCatalogNode(node.path, !node.toggled);
          this.props.activeCatalogNode(node.path, !node.active);
          if (!node.active) {
            const catalog = node.name;
            const version = node.value;
            main.getRteItemNames(catalog, version);
          } else {
            deleteItemNames();
          }
          break;
        case 'itemNames':
          this.props.toggleItemNameNode(node.path, !node.toggled);
          this.props.activeItemNameNode(node.path, !node.active);
          if (!node.active && node.children.length === 0) {
            const { session, domain, catalog, version } = focusedItem;
            const namespace = node.parentName;
            const name = node.value;
            console.log(session, domain, catalog, version);
            const itemKey = createItemKey(session, domain, catalog, namespace, name);
            if (Object.keys(openedItems).includes(itemKey)) {
              console.log('already present');
              this.props.setFocusedItem(
                itemKey, session, domain, catalog, version, namespace, name);
            } else {
              main.openRteItem(session, domain, catalog, version, namespace, name, itemKey);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  render() {
    logger.debug('render');
    console.log('left render');
    const {
      sessions,
      domains,
      catalogs,
      itemNames,
      focusedItem,
    } = this.props;

    const sessionChoices = _map(['', ...sessions], session => (
      <option
        key={session}
        value={session}
      >
        {session}
      </option>
    ));
    const domainChoices = _map(['', ...domains], domain => (
      <option
        key={domain}
        value={domain}
      >
        {domain}
      </option>
    ));

    return (
      <div className={styles.root}>
        <Panel className={styles.session}>
          <div className={styles.stacked}>
            <span className={styles.title}>SessionId</span>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={focusedItem.session}
              onChange={this.onSessionChange}
            >
              {sessionChoices}
            </FormControl>
          </div>
          <div className={styles.stacked}>
            <span className={styles.title}>DomainId</span>
            <FormControl
              componentClass="select"
              placeholder="select"
              value={focusedItem.domain}
              onChange={this.onDomainChange}
            >
              {domainChoices}
            </FormControl>
          </div>
        </Panel>
        <Panel className={styles.panel}>
          <div className={styles.title}>Catalogs / Versions</div>
          <Panel className={styles.innerPanel}>
            <Tree
              data={catalogs}
              onMouseDown={(...args) => this.onMouseDown('catalogs', ...args)}
            />
          </Panel>
        </Panel>
        <Panel className={styles.panel}>
          <div className={styles.title}>Namespaces / Names</div>
          <Panel className={styles.innerPanel}>
            <Tree
              data={itemNames}
              onMouseDown={(...args) => this.onMouseDown('itemNames', ...args)}
            />
          </Panel>
        </Panel>
      </div>
    );
  }
}
