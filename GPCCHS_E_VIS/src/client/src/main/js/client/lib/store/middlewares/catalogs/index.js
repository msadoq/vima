import { getTupleId, getItemMetadata, REQUESTING } from 'store/reducers/catalogs';

import {
  WS_CATALOG_ITEMS_ASK,
  WS_CATALOGS_ASK,
  WS_COM_OBJECTS_ASK,
  WS_ITEM_STRUCTURE_ASK,
  WS_ITEM_METADATA_ASK,
  WS_REPORTING_ITEM_PACKETS_ASK,
} from 'store/types';
import {
  addCatalogItems,
  addCatalogs,
  addComObjects,
  addItemStructure,
  addCatalogItemMetadata,
  addReportingItemPackets,
} from 'store/actions/catalogs';
import { getSingleEntryPoint } from 'viewManager/DecommutedPacketView/store/dataSelectors';
import getLogger from 'common/logManager';

import { dc } from '../../../serverProcess/ipc';
import { getSessionIdWithFallback } from '../../reducers/sessions';
import { getDomainId } from '../../reducers/domains';
import { get } from '../../../common/configurationManager';
import { getPageIdByViewId } from '../../reducers/pages';

const logger = getLogger('middleware:catalogs');

// TODO: refactor async dependent fetchers

const asyncCatalogFetcher = (sessionId, domainId, cb) =>
  dc.retrieveSDBCatalogs({ sessionId, domainId }, cb);

const asyncCatalogItemFetcher = (sessionId, domainId, catalogName, cb) => {
  dc.retrieveSDBCatalogsItems({ sessionId, domainId, catalogName }, cb);
};

const asyncComObjectsFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveSDBCatalogsItemComObject({ sessionId, domainId, catalogName, catalogItemName }, cb);

const asyncItemMetadataFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveCatalogItemMetadata({ sessionId, domainId, catalogName, catalogItemName }, cb);

const asyncReportingItemPacketsFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveReportingItemPackets({ sessionId, domainId, catalogName, catalogItemName }, cb);


const asyncItemStructureFetcher = (sessionId, domainId, catalogName, catalogItemName, cb) =>
  dc.retrieveCatalogItemStructure(
    {
      sessionId,
      domainId,
      catalogName,
      catalogItemName,
    }, cb);


const getCatalogItems = (state, { sessionId, domainId, name }) => {
  const tupleId = getTupleId(domainId, sessionId);
  const found =
    state.catalogs &&
    Array.isArray(state.catalogs[tupleId]) &&
    state.catalogs[tupleId].filter(catalogObj =>
      catalogObj.name === name &&
      catalogObj.items !== REQUESTING
    );

  if (found.length > 0) {
    return found[0];
  }

  return null;
};

/**
 * @param state
 * @param sessionId
 * @param domainId
 * @returns {state.catalogs|{'domain-id-session-id'}|boolean}
 */
export const isCatalogLoaded = (state, { sessionId, domainId }) => (
  state.catalogs &&
  Object.keys(state.catalogs).includes(getTupleId(domainId, sessionId)) &&
  state.catalogs[getTupleId(domainId, sessionId)] !== REQUESTING
);

/**
 * @param state
 * @param sessionId
 * @param domainId
 * @param name
 * @returns {state.catalogs|{'domain-id-session-id'}|boolean|boolean}
 */
export const areCatalogItemsLoaded = (state, { sessionId, domainId, name }) =>
  isCatalogLoaded(state, { sessionId, domainId }) &&
  getCatalogItems(state, { sessionId, domainId, name }) !== null;


const wildcard = get('WILDCARD_CHARACTER');

const catalogMiddleware = ({ dispatch, getState }) => next => (action) => {
  const nextAction = next(action);

  const state = getState();
  switch (action.type) {
    case WS_CATALOGS_ASK: {
      const { sessionId, domainId } = action.payload;

      if (isCatalogLoaded(state, { sessionId, domainId })) {
        return nextAction;
      }

      asyncCatalogFetcher(
        sessionId,
        domainId,
        (catalogs) => {
          dispatch(
            addCatalogs(
              getTupleId(domainId, sessionId),
              catalogs
            )
          );
        }
      );
      break;
    }
    case WS_CATALOG_ITEMS_ASK: {
      const { sessionId, domainId, name } = action.payload;

      if (areCatalogItemsLoaded(state, { sessionId, domainId, name })) {
        return nextAction;
      }

      asyncCatalogItemFetcher(
        sessionId,
        domainId,
        name,
        items => dispatch(
          addCatalogItems(
            getTupleId(domainId, sessionId),
            name,
            items
          )
        )
      );
      break;
    }
    case WS_COM_OBJECTS_ASK: {
      const { sessionId, domainId, name, itemName } = action.payload;

      asyncComObjectsFetcher(
        sessionId,
        domainId,
        name,
        itemName,
        comObjects => dispatch(
          addComObjects(
            getTupleId(domainId, sessionId),
            name,
            itemName,
            comObjects
          )
        )
      );
      break;
    }
    case WS_ITEM_STRUCTURE_ASK: {
      const { viewId } = action.payload;

      const pageId = getPageIdByViewId(state, { viewId });
      const domainId = getDomainId(state, { domainName: wildcard, viewId, pageId });
      const sessionId = getSessionIdWithFallback(state, { sessionName: wildcard, viewId, pageId });
      const tupleId = getTupleId(domainId, sessionId);
      const {
        catalogItem: itemName,
        catalog: name,
      } = getSingleEntryPoint(state, { viewId }).connectedData;

      if (!itemName || !name) return nextAction;

      const fetchItemStructure = () => asyncItemStructureFetcher(
        sessionId,
        domainId,
        name,
        itemName,
        structure => dispatch(addItemStructure(tupleId, name, itemName, structure))
      );

      const fetchCatalogItemAndStructure = () => asyncCatalogItemFetcher(sessionId, domainId, name,
        (items) => {
          logger.debug('catalog items fetched');
          dispatch(addCatalogItems(getTupleId(domainId, sessionId), name, items));
          fetchItemStructure();
        }
      );

      const fetchCatalogAndCatalogItemAndStructure = () => asyncCatalogFetcher(
        sessionId,
        domainId,
        (catalogs) => {
          logger.debug('catalogs fetched');
          dispatch(addCatalogs(getTupleId(domainId, sessionId), catalogs));
          fetchCatalogItemAndStructure();
        }
      );


      if (isCatalogLoaded(state, { sessionId, domainId })) {
        if (areCatalogItemsLoaded(state, { sessionId, domainId, name })) {
          logger.debug('going to fetch structure');
          fetchItemStructure();
        } else {
          logger.debug('going to fetch catalog item');
          fetchCatalogItemAndStructure();
        }
      } else {
        fetchCatalogAndCatalogItemAndStructure();
      }
      break;
    }
    case WS_ITEM_METADATA_ASK: {
      const { sessionId, domainId, catalogName, itemName } = action.payload;
      // fetch catalog items, then fetch onNeededMetadata for given itemName
      // TODO only if itemName matches /^[A-Z][A-Z_]*/g
      const meta = getItemMetadata(state.catalogs,
        { tupleId: getTupleId(domainId, sessionId), name: catalogName, itemName });
      if (meta && Object.keys(meta).length !== 0) {
        break;
      }
      const fetchMeta = () => asyncItemMetadataFetcher(sessionId, domainId, catalogName, itemName,
        metadata => dispatch(
          addCatalogItemMetadata(
            getTupleId(domainId, sessionId),
            catalogName,
            itemName,
            metadata
          )
        ));

      const fetchItemsAndMeta = () => asyncCatalogItemFetcher(sessionId, domainId, catalogName,
        (items) => {
          dispatch(addCatalogItems(getTupleId(domainId, sessionId), catalogName, items));
          fetchMeta();
        }
      );

      const fetchCatalogAndItemsAndMeta = () => {
        asyncCatalogFetcher(
          sessionId,
          domainId,
          (catalogs) => {
            dispatch(
              addCatalogs(
                getTupleId(domainId, sessionId),
                catalogs
              )
            );
            fetchItemsAndMeta();
          });
      };

      if (!isCatalogLoaded(state, { sessionId, domainId })) {
        fetchCatalogAndItemsAndMeta();
      }

      if (!areCatalogItemsLoaded(state, { sessionId, domainId, name: catalogName })) {
        fetchItemsAndMeta();
      } else {
        fetchMeta();
      }
      break;
    }

    case WS_REPORTING_ITEM_PACKETS_ASK: {
      const { sessionId, domainId, catalogName, itemName } = action.payload;

      const fetchItemPackets = () =>
        asyncReportingItemPacketsFetcher(sessionId, domainId, catalogName, itemName,
          items => dispatch(
            addReportingItemPackets(
              getTupleId(domainId, sessionId),
              catalogName,
              itemName,
              items
            )
          ));

      const fetchItemsAndItemPackets = () =>
        asyncCatalogItemFetcher(sessionId, domainId, catalogName,
          (items) => {
            dispatch(addCatalogItems(getTupleId(domainId, sessionId), catalogName, items));
            fetchItemPackets();
          }
        );

      const fetchCatalogAndItemsAndItemPackets = () => {
        asyncCatalogFetcher(
          sessionId,
          domainId,
          (catalogs) => {
            dispatch(
              addCatalogs(
                getTupleId(domainId, sessionId),
                catalogs
              )
            );
            fetchItemsAndItemPackets();
          });
      };

      if (!isCatalogLoaded(state, { sessionId, domainId })) {
        fetchCatalogAndItemsAndItemPackets();
      }

      if (!areCatalogItemsLoaded(state, { sessionId, domainId, name: catalogName })) {
        fetchItemsAndItemPackets();
      } else {
        fetchItemPackets();
      }
      break;
    }
    default:
      break;
  }

  return nextAction;
};

export default catalogMiddleware;
