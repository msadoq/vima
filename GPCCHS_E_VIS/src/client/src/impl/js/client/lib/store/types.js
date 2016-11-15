/**
 * Namespaces: HSC, HSS, WS
 * Domains: WINDOW, PAGE, VIEW, CD, EDITOR
 * Verbs: ADD, REMOVE, UN/MOUNT, UPDATE, OPEN, CLOSE
 */

export const HSC_UPDATE_STATUS = 'HSC_UPDATE_STATUS';
export const HSC_UPDATE_LAST_CACHE_INVALIDATION = 'HSC_UPDATE_LAST_CACHE_INVALIDATION';
export const HSS_WS_REMOVE = 'HSS_WS_REMOVE';
export const HSS_WS_UPDATE_STATUS = 'HSS_WS_UPDATE_STATUS';
export const HSS_UPDATE_DOMAINS = 'HSS_UPDATE_DOMAINS';
export const HSS_UPDATE_SESSIONS = 'HSS_UPDATE_SESSIONS';

export const WS_TIMEBAR_ADD = 'WS_TIMEBAR_ADD';
export const WS_TIMEBAR_REMOVE = 'WS_TIMEBAR_REMOVE';
export const WS_TIMEBAR_ID_UPDATE = 'WS_TIMEBAR_ID_UPDATE';
export const WS_TIMEBAR_VISUWINDOW_UPDATE = 'WS_TIMEBAR_VISUWINDOW_UPDATE';
export const WS_TIMEBAR_SPEED_UPDATE = 'WS_TIMEBAR_SPEED_UPDATE';
export const WS_TIMEBAR_MODE_UPDATE = 'WS_TIMEBAR_MODE_UPDATE';
export const WS_TIMEBAR_PLAYINGSTATE_UPDATE = 'WS_TIMEBAR_PLAYINGSTATE_UPDATE';
export const WS_TIMEBAR_MASTERID_UPDATE = 'WS_TIMEBAR_MASTERID_UPDATE';
export const WS_TIMEBAR_MOUNT_TIMELINE = 'WS_TIMEBAR_ADDANDMOUNT_TIMELINE';
export const WS_TIMEBAR_UNMOUNT_TIMELINE = 'WS_TIMEBAR_REMOVEANDUNMOUNT_TIMELINE';
export const WS_TIMELINE_ADD = 'WS_TIMELINE_ADD';
export const WS_TIMELINE_REMOVE = 'WS_TIMELINE_REMOVE';
export const WS_TIMELINE_UPDATE_ID = 'WS_TIMELINE_UPDATE_ID';
export const WS_TIMELINE_UPDATE_NAME = 'WS_TIMELINE_UPDATE_NAME';
export const WS_TIMELINE_UPDATE_OFFSET = 'WS_TIMELINE_UPDATE_OFFSET';
export const WS_TIMELINE_UPDATE_SESSIONID = 'WS_TIMELINE_UPDATE_SESSIONID';
export const WS_WINDOW_ADD = 'WS_WINDOW_ADD';
export const WS_WINDOW_REMOVE = 'WS_WINDOW_REMOVE';
export const WS_WINDOW_UPDATE_GEOMETRY = 'WS_WINDOW_UPDATE_GEOMETRY';
export const WS_WINDOW_PAGE_FOCUS = 'WS_WINDOW_PAGE_FOCUS';
export const WS_WINDOW_PAGE_REORDER = 'WS_WINDOW_PAGE_REORDER';
export const WS_WINDOW_PAGE_MOUNT = 'WS_WINDOW_PAGE_MOUNT';
export const WS_WINDOW_PAGE_UNMOUNT = 'WS_WINDOW_PAGE_UNMOUNT';
export const WS_WINDOW_DEBUG_SWITCH = 'WS_WINDOW_DEBUG_SWITCH';
export const WS_PAGE_ADD = 'WS_PAGE_ADD';
export const WS_PAGE_REMOVE = 'WS_PAGE_REMOVE';
export const WS_PAGE_UPDATE_LAYOUT = 'WS_PAGE_UPDATE_LAYOUT';
export const WS_PAGE_VIEW_MOUNT = 'WS_PAGE_VIEW_MOUNT';
export const WS_PAGE_VIEW_UNMOUNT = 'WS_PAGE_VIEW_UNMOUNT';
export const WS_PAGE_EDITOR_OPEN = 'WS_PAGE_EDITOR_OPEN';
export const WS_PAGE_EDITOR_CLOSE = 'WS_PAGE_EDITOR_CLOSE';
export const WS_VIEW_ADD = 'WS_VIEW_ADD';
export const WS_VIEW_REMOVE = 'WS_VIEW_REMOVE';
export const WS_VIEW_CD_MOUNT = 'WS_VIEW_CD_MOUNT';
export const WS_VIEW_CD_UNMOUNT = 'WS_VIEW_CD_UNMOUNT';

export const DATA_ADD_REQUESTS = 'DATA_ADD_REQUESTS';
export const DATA_REMOVE_REQUESTS = 'DATA_REMOVE_REQUESTS';
export const DATA_IMPORT_PAYLOAD = 'DATA_IMPORT_PAYLOAD';
export const DATA_IMPORT_VIEWDATA = 'DATA_IMPORT_VIEWDATA';
export const DATA_REMOVE_ALL_DATACACHE = 'DATA_REMOVE_ALL_DATACACHE';
export const DATA_REMOVE_ALL_REQUESTS = 'DATA_REMOVE_ALL_REQUESTS';
export const DATA_REMOVE_ALL_VIEWDATA = 'DATA_REMOVE_ALL_VIEWDATA';
export const DATA_UPDATE_VIEWREQUEST = 'DATA_UPDATE_VIEWREQUEST';

export const WS_UPDATE_PATH = 'WS_UPDATE_PATH';
export const WS_VIEW_UPDATEPATH = 'WS_VIEW_UPDATEPATH';
export const WS_VIEW_UPDATE_RELATIVEPATH = 'WS_VIEW_UPDATE_RELATIVEPATH';
export const WS_PAGE_UPDATEPATH = 'WS_PAGE_UPDATEPATH';
export const WS_PAGE_UPDATE_RELATIVEPATH = 'WS_PAGE_UPDATE_RELATIVEPATH';

export const WS_VIEW_UPDATE_ENTRYPOINT = 'WS_VIEW_UPDATE_ENTRYPOINT';
export const WS_VIEW_UPDATE_AXIS = 'WS_VIEW_UPDATE_AXIS';
export const WS_VIEW_UPDATE_GRID = 'WS_VIEW_UPDATE_GRID';
export const WS_VIEW_UPDATE_LINK = 'WS_VIEW_UPDATE_LINK';
export const WS_VIEW_UPDATE_MARKER = 'WS_VIEW_UPDATE_MARKER';
export const WS_VIEW_UPDATE_PROCEDURE = 'WS_VIEW_UPDATE_PROCEDURE';
export const WS_VIEW_UPDATE_RATIO = 'S_VIEW_UPDATE_RATIO';
export const WS_VIEW_UPDATE_TITLE = 'WS_VIEW_UPDATE_TITLE';
export const WS_VIEW_UPDATE_TITLESTYLE = 'WS_VIEW_UPDATE_TITLESTYLE';
export const WS_VIEW_UPDATE_BGCOLOR = 'WS_VIEW_UPDATE_BGCOLOR';
export const WS_VIEW_UPDATE_LEGEND = 'WS_VIEW_UPDATE_LEGEND';
export const WS_VIEW_UPDATE_CONTENT = 'WS_VIEW_UPDATE_LEGEND';

export const WS_VIEW_ADD_AXIS = 'WS_VIEW_ADD_AXIS';
export const WS_VIEW_REMOVE_AXIS = 'WS_VIEW_REMOVE_AXIS';
export const WS_VIEW_ADD_ENTRYPOINT = 'WS_VIEW_ADD_ENTRYPOINT';
export const WS_VIEW_REMOVE_ENTRYPOINT = 'WS_VIEW_REMOVE_ENTRYPOINT';
export const WS_VIEW_ADD_GRID = 'WS_VIEW_ADD_GRID';
export const WS_VIEW_REMOVE_GRID = 'WS_VIEW_REMOVE_GRID';
export const WS_VIEW_ADD_LINK = 'WS_VIEW_ADD_LINK';
export const WS_VIEW_REMOVE_LINK = 'WS_VIEW_REMOVE_LINK';
export const WS_VIEW_ADD_MARKER = 'WS_VIEW_ADD_MARKER';
export const WS_VIEW_REMOVE_MARKER = 'WS_VIEW_REMOVE_MARKER';
export const WS_VIEW_ADD_PROCEDURE = 'WS_VIEW_ADD_PROCEDURE';
export const WS_VIEW_REMOVE_PROCEDURE = 'WS_VIEW_REMOVE_PROCEDURE';
