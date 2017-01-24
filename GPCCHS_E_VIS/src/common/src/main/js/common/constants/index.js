module.exports = {
  // CHILD PROCESS ID
  CHILD_PROCESS_SERVER: 1,
  CHILD_PROCESS_DC: 2,
  // DATA STRUCTURE TYPES
  DATASTRUCTURETYPE_LAST: 'last',
  DATASTRUCTURETYPE_RANGE: 'range',
  // EDITOR
  WILDCARD_CHARACTER: '*',
  DEFAULT_FIELD: 'extractedValue',
  // MESSAGE TYPES
  MESSAGETYPE_DOMAIN_QUERY: 0,
  MESSAGETYPE_TIMEBASED_QUERY: 1,
  MESSAGETYPE_TIMEBASED_SUBSCRIPTION: 2,
  MESSAGETYPE_RESPONSE: 3,
  MESSAGETYPE_DOMAIN_DATA: 4,
  MESSAGETYPE_TIMEBASED_ARCHIVE_DATA: 5,
  MESSAGETYPE_TIMEBASED_PUBSUB_DATA: 6,
  MESSAGETYPE_SESSION_QUERY: 7,
  MESSAGETYPE_SESSION_DATA: 8,
  MESSAGETYPE_SESSION_TIME_QUERY: 9,
  MESSAGETYPE_SESSION_TIME_DATA: 10,

  MESSAGETYPE_LOG_SEND: 12,
  MESSAGETYPE_FMD_GET_QUERY: 13,
  MESSAGETYPE_FMD_GET_DATA: 14,
  MESSAGETYPE_FMD_CREATE_QUERY: 15,
  MESSAGETYPE_FMD_CREATE_DOCUMENT_QUERY: 16,
  MESSAGETYPE_FMD_CREATE_DATA: 17,
  MESSAGETYPE_SESSION_MASTER_QUERY: 18,
  MESSAGETYPE_SESSION_MASTER_DATA: 19,
  MESSAGETYPE_DC_STATUS: 20,

  FILE_TYPE_COLLECTION: 0,
  FILE_TYPE_COLLECTION_DOCUMENT: 1,
  FILE_TYPE_DOCUMENT: 2,
  FILE_TYPE_FOLDER: 3,

  // SUBSCRIPTION ACTIONS
  SUBSCRIPTIONACTION_ADD: 0,
  SUBSCRIPTIONACTION_DELETE: 1,
  // STATUS
  STATUS_SUCCESS: 0,
  STATUS_ERROR: 1,
  // GETLAST TYPES
  GETLASTTYPE_GET_LAST: 0,
  GETLASTTYPE_GET_N_LAST: 1,
  // VISUWINDOW
  HSC_VISUWINDOW_MAX_LENGTH: 7200000,
  HSC_VISUWINDOW_CURRENT_UPPER_MIN_MARGIN: 0.1,
  // TIMING
  HSC_ORCHESTRATION_FREQUENCY: 333,
  HSC_RENDERER_WARNING: 100, // 100ms
  HSC_ORCHESTRATION_WARNING: 5e7, // 50ms
  CACHE_INVALIDATION_FREQUENCY: 18e4, // 3mn
  // MAX PAYLOADS PER DC MESSAGE
  HSS_MAX_PAYLOADS_PER_MESSAGE: 1000,
  // STUB
  DC_STUB_FREQUENCY: 250,
  DC_STUB_MAX_SUBSCRIPTION_VALUES: 1,
  DC_STUB_VALUE_TIMESTEP: 1000,
  DC_STUB_CONGESTION_TIMESTEP: 20000, // 20s
  // TIMELINE TYPES
  TIMELINETYPE_SESSION: 'session',
  TIMELINETYPE_DATASET: 'dataSet',
  TIMELINETYPE_RECORDSET: 'recordSet',
  // SUBSCRIPTION STATES
  HSC_PLAY_STATE: 'play',
  HSC_PAUSE_STATE: 'pause',
  // FILTER TYPES
  FILTERTYPE_EQ: 0,
  FILTERTYPE_NE: 1,
  FILTERTYPE_LT: 2,
  FILTERTYPE_LE: 3,
  FILTERTYPE_GT: 4,
  FILTERTYPE_GE: 5,
  FILTERTYPE_CONTAINS: 6,
  FILTERTYPE_ICONTAINS: 7,
  // FMD FILE TYPES
  FMDFILETYPE_COLLECTION: 0,
  FMDFILETYPE_COLLECTION_DOCUMENT: 1,
  FMDFILETYPE_DOCUMENT: 2,
  FMDFILETYPE_FOLDER: 3,
  // QUERY ARGS
  SORTORDER_ASC: 0,
  SORTORDER_DESC: 1,
  // ERROR TYPES
  ERRORTYPE_RESPONSE: 0,
  // EVENTS
  EVENT_PULL: 'pull',
  EVENT_ERROR: 'error',
  EVENT_DOMAIN_QUERY: 'domainQuery',
  EVENT_DOMAIN_DATA: 'domainData',
  EVENT_TIMEBASED_QUERY: 'timebasedQuery',
  EVENT_TIMEBASED_QUERY_INVALIDATION: 'timebasedQueryInvalidation',
  EVENT_TIMEBASED_DATA: 'timebasedData',
  EVENT_SESSION_QUERY: 'sessionQuery',
  EVENT_SESSION_DATA: 'sessionData',
  EVENT_FILEPATH_QUERY: 'filepathQuery',
  EVENT_FILEPATH_DATA: 'filepathData',
  // MODELS
  COLLECTION_TIMEBASED_DATA_PREFIX: 'timebasedData',
  COLLECTION_CONNECTED_DATA_PREFIX: 'connectedData',
  COLLECTION_SUBSCRIPTIONS_PREFIX: 'subscriptions',
  // IPC MESSAGE TYPES
  IPC_RPC_REQUEST: 0,
  IPC_RPC_RESPONSE: 1,
  IPC_MESSAGE: 2,
  // IPC MESSAGE NAMES
  IPC_METHOD_DOMAINS_REQUEST: 0,
  IPC_METHOD_SESSIONS_REQUEST: 1,
  IPC_METHOD_TIMEBASED_QUERY: 2,
  IPC_METHOD_TIMEBASED_PULL: 3,
  IPC_METHOD_CACHE_CLEANUP: 5,
  IPC_METHOD_SESSION_TIME: 6, // warn! used for two message in two different IPC
  IPC_METHOD_RELOAD_SESSIONS: 7,
  IPC_METHOD_RELOAD_VIEW: 8,
  IPC_METHOD_SAVE_VIEW: 9,
  IPC_METHOD_ERROR: 10,
  IPC_METHOD_SERVER_DEBUG: 11, // warn! used for two message in two different IPC
  IPC_METHOD_FMD_GET: 12,
  IPC_METHOD_FMD_CREATE: 13,
  IPC_METHOD_MASTER_SESSION: 14,
  IPC_METHOD_CREATE_MODEL: 15,
  IPC_METHOD_PRODUCT_LOG: 16,
  // LOG
  LOG_LOCAL_FILENAME: 'local.log',
  // DIST LOG UIDS
  LOG_APPLICATION_START: 6002,
  LOG_APPLICATION_STOP: 6003,
  LOG_APPLICATION_ERROR: 6004,
  LOG_DOCUMENT_OPEN: 6005,
  LOG_DOCUMENT_SAVE: 6006,
  LOG_APPLICATION_OVERLOADED: 6007,
  // DC STATUS
  DC_STATUS_HEALTHY: 0,
  DC_STATUS_CONGESTION: 1,
};
