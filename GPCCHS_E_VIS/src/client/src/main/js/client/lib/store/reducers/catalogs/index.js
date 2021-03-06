import _ from 'lodash/fp';

import {
  WS_CATALOG_ITEMS_ADD,
  WS_CATALOGS_ADD,
  WS_COM_OBJECTS_ADD,
  WS_ITEM_METADATA_ADD,
  WS_ITEM_STRUCTURE_ADD,
  WS_REPORTING_ITEM_PACKETS_ADD,
  WS_CATALOG_ITEMS_UPDATE_STATUS,
  WS_CATALOGS_UPDATE_STATUS,
  WS_ITEM_METADATA_UPDATE_STATUS,
  WS_COM_OBJECTS_UPDATE_STATUS,
  WS_ITEM_STRUCTURE_UPDATE_STATUS,
  WS_REPORTING_ITEM_PACKETS_UPDATE_STATUS,
} from 'store/types';


const updateCatalogItemFieldStateStatus =
  (state, props) => {
    const {
      domainId,
      sessionId,
      catalogName,
      catalogItemName,
      fieldName,
      status,
    } = props;

    if (
      typeof domainId !== 'number' ||
      typeof sessionId !== 'number' ||
      typeof catalogName !== 'string' ||
      typeof catalogItemName !== 'string' ||
      typeof fieldName !== 'string'
    ) {
      return state;
    }

    return _.set(
      [
        '_status',
        getTupleId(domainId, sessionId),
        catalogName,
        'items',
        catalogItemName,
        fieldName,
        '_status',
      ],
      status,
      state
    );
  };

const addCatalogs = (state, { domainId, sessionId, catalogs }) => {
  let updatedState = state;

  const existingCatalogs = _.getOr({}, [domainId, sessionId], state);

  const newCatalogs = catalogs.reduce((acc, catalog) => {
    acc[catalog.name] = {};

    return acc;
  }, {});

  const updatedCatalogs = {
    ...newCatalogs,
    ...existingCatalogs,
  };

  updatedState = _.set(
    getTupleId(domainId, sessionId),
    updatedCatalogs,
    updatedState
  );

  return updatedState;
};

const addCatalogItems = (state, { domainId, sessionId, catalogName, items }) => {
  let updatedState = state;

  const existingItems = _.getOr(
    {},
    [
      getTupleId(domainId, sessionId),
      catalogName,
    ],
    state
  );

  const sortedItems = _.sortBy(item => item.name, items);

  const newItems = sortedItems.reduce((acc, item) => {
    acc[item.name] = {};

    return acc;
  }, {});

  const updatedItems = {
    ...newItems,
    ...existingItems,
  };

  updatedState = _.set(
    [
      getTupleId(domainId, sessionId),
      catalogName,
    ],
    updatedItems,
    updatedState
  );

  return updatedState;
};

const addCatalogItemField = (state, props) => {
  const {
    domainId,
    sessionId,
    catalogName,
    catalogItemName,
    fieldName,
    content,
  } = props;

  let updatedState = state;

  updatedState = _.set(
    [
      getTupleId(domainId, sessionId),
      catalogName,
      catalogItemName,
      fieldName,
    ],
    content,
    updatedState
  );

  return updatedState;
};

// eslint-disable-next-line complexity
export default function catalogsReducer(state = {}, action) {
  switch (action.type) {
    case WS_CATALOGS_UPDATE_STATUS: {
      const { domainId, sessionId, status } = action.payload;

      return _.set(
        [
          '_status',
          getTupleId(domainId, sessionId),
          '_status',
        ],
        status,
        state
      );
    }
    case WS_CATALOGS_ADD: {
      const { payload: props } = action;

      return addCatalogs(state, { ...props, all: true });
    }
    case WS_CATALOG_ITEMS_UPDATE_STATUS: {
      const { domainId, sessionId, catalogName, status } = action.payload;

      return _.set(
        [
          '_status',
          getTupleId(domainId, sessionId),
          catalogName,
          '_status',
        ],
        status,
        state
      );
    }
    case WS_CATALOG_ITEMS_ADD: {
      const { payload: props } = action;

      return addCatalogItems(
        state,
        {
          ...props,
          all: true,
        }
      );
    }
    case WS_ITEM_METADATA_UPDATE_STATUS: {
      const { payload: props } = action;

      return updateCatalogItemFieldStateStatus(
        state,
        {
          ...props,
          fieldName: 'metadata',
        }
      );
    }
    case WS_ITEM_METADATA_ADD: {
      const { payload: props } = action;

      return addCatalogItemField(
        state,
        {
          ...props,
          fieldName: 'metadata',
          content: props.metadata,
        }
      );
    }
    case WS_COM_OBJECTS_UPDATE_STATUS: {
      const { payload: props } = action;

      return updateCatalogItemFieldStateStatus(
        state,
        {
          ...props,
          fieldName: 'comObjects',
        });
    }
    case WS_COM_OBJECTS_ADD: {
      const { payload: props } = action;

      return addCatalogItemField(
        state,
        {
          ...props,
          fieldName: 'comObjects',
          content: props.comObjects,
        }
      );
    }
    case WS_ITEM_STRUCTURE_UPDATE_STATUS: {
      const { payload: props } = action;

      return updateCatalogItemFieldStateStatus(
        state,
        {
          ...props,
          fieldName: 'structure',
        });
    }
    case WS_ITEM_STRUCTURE_ADD: {
      const { payload: props } = action;

      return addCatalogItemField(
        state,
        {
          ...props,
          fieldName: 'structure',
          content: props.structure,
        }
      );
    }
    case WS_REPORTING_ITEM_PACKETS_UPDATE_STATUS: {
      const { payload: props } = action;

      return updateCatalogItemFieldStateStatus(
        state,
        {
          ...props,
          fieldName: 'reportingItemPackets',
        }
      );
    }
    case WS_REPORTING_ITEM_PACKETS_ADD: {
      const { payload: props } = action;

      return addCatalogItemField(
        state,
        {
          ...props,
          fieldName: 'reportingItemPackets',
          content: props.reportingItemPackets,
        }
      );
    }
    default:
      return state;
  }
}

/**
 *
 * @param domainId
 * @param sessionId
 * @returns {string}
 */
export const getTupleId = (domainId, sessionId) => `${domainId}-${sessionId}`;

/**
 * DEPRECATED
 * @type {string}
 */
export const REQUESTING = 'requesting';
