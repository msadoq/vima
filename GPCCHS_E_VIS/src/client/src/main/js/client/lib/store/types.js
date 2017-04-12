/**
 * Namespaces: HSC, HSS, WS
 * Domains: WINDOW, PAGE, VIEW, CD, EDITOR
 * Verbs: ADD, REMOVE, UN/MOUNT, SET, UPDATE, OPEN, CLOSE
 */

export const HSC_UPDATE_STATUS = 'HSC_UPDATE_STATUS';
export const HSC_SET_WINDOWS_AS_OPENED = 'HSC_SET_WINDOWS_AS_OPENED';
export const HSC_SET_WORKSPACE_AS_OPENED = 'HSC_SET_WORKSPACE_AS_OPENED';
export const HSC_UPDATE_LAST_CACHE_INVALIDATION = 'HSC_UPDATE_LAST_CACHE_INVALIDATION';
export const HSS_WS_REMOVE = 'HSS_WS_REMOVE';
export const HSS_WS_UPDATE_STATUS = 'HSS_WS_UPDATE_STATUS';
export const HSS_UPDATE_DOMAINS = 'HSS_UPDATE_DOMAINS';
export const HSS_UPDATE_SESSIONS = 'HSS_UPDATE_SESSIONS';
export const HSS_UPDATE_MASTER_SESSION = 'HSS_UPDATE_MASTER_SESSION';
export const HSC_PLAY = 'HSC_PLAY';
export const HSC_PAUSE = 'HSC_PAUSE';
export const HSC_FOCUS_WINDOW = 'HSC_FOCUS_WINDOW';
export const HSC_BLUR_WINDOW = 'HSC_BLUR_WINDOW';

export const WS_VIEW_OPEN = 'WS_VIEW_OPEN';
export const WS_PAGE_OPEN = 'WS_PAGE_OPEN';
export const WS_WORKSPACE_OPEN = 'WS_WORKSPACE_OPEN';

export const WS_MESSAGE_ADD = 'WS_MESSAGE_ADD';
export const WS_MESSAGE_REMOVE = 'WS_MESSAGE_REMOVE';
export const WS_MESSAGE_RESET = 'WS_MESSAGE_RESET';

export const WS_VIEW_SET_OID = 'WS_VIEW_SET_OID';
export const WS_PAGE_SET_OID = 'WS_PAGE_SET_OID';

export const WS_TIMEBAR_CREATE_NEW = 'WS_TIMEBAR_CREATE_NEW';
export const WS_TIMEBAR_ID_UPDATE = 'WS_TIMEBAR_ID_UPDATE';
export const WS_TIMEBAR_UPDATE_CURSORS = 'WS_TIMEBAR_UPDATE_CURSORS';
export const WS_TIMEBAR_UPDATE_VIEWPORT = 'WS_TIMEBAR_UPDATE_VIEWPORT';
export const WS_TIMEBAR_SPEED_UPDATE = 'WS_TIMEBAR_SPEED_UPDATE';
export const WS_TIMEBAR_MODE_UPDATE = 'WS_TIMEBAR_MODE_UPDATE';
export const WS_TIMEBAR_MASTERID_UPDATE = 'WS_TIMEBAR_MASTERID_UPDATE';
export const WS_TIMEBAR_DEFAULTWIDTH_UPDATE = 'WS_TIMEBAR_DEFAULTWIDTH_UPDATE';
export const WS_TIMEBAR_SET_REALTIME = 'WS_TIMEBAR_SET_REALTIME';

export const WS_TIMELINE_CREATE_NEW = 'WS_TIMELINE_CREATE_NEW';
export const WS_TIMELINE_REMOVE = 'WS_TIMELINE_REMOVE';
export const WS_TIMELINE_UPDATE_ID = 'WS_TIMELINE_UPDATE_ID';
export const WS_TIMELINE_UPDATE_OFFSET = 'WS_TIMELINE_UPDATE_OFFSET';
export const WS_TIMELINE_UPDATE_COLOR = 'WS_TIMELINE_UPDATE_COLOR';
export const WS_TIMELINE_UPDATE_SESSIONNAME = 'WS_TIMELINE_UPDATE_SESSIONNAME';

export const WS_WINDOW_ADD = 'WS_WINDOW_ADD';
export const WS_WINDOW_CLOSE = 'WS_WINDOW_CLOSE';
export const WS_WINDOW_SET_IS_LOADED = 'WS_WINDOW_SET_IS_LOADED';
export const WS_WINDOW_UPDATE_GEOMETRY = 'WS_WINDOW_UPDATE_GEOMETRY';
export const WS_WINDOW_SET_DISPLAY_HELP = 'WS_WINDOW_SET_DISPLAY_HELP';
export const WS_WINDOW_PAGE_FOCUS = 'WS_WINDOW_PAGE_FOCUS';
export const WS_WINDOW_PAGE_REORDER = 'WS_WINDOW_PAGE_REORDER';
export const WS_WINDOW_MINIMIZE = 'WS_WINDOW_MINIMIZE';
export const WS_WINDOW_RESTORE = 'WS_WINDOW_RESTORE';
export const WS_WINDOW_OPEN_HTML_EDITOR = 'WS_WINDOW_OPEN_HTML_EDITOR';
export const WS_WINDOW_CLOSE_HTML_EDITOR = 'WS_WINDOW_CLOSE_HTML_EDITOR';
export const WS_WINDOW_MOVE_TAB_ORDER = 'WS_WINDOW_MOVE_TAB_ORDER';

export const WS_PAGE_ADD_BLANK = 'WS_PAGE_ADD_BLANK';
export const WS_PAGE_CLOSE = 'WS_PAGE_CLOSE';
export const WS_PAGE_UPDATE_LAYOUT = 'WS_PAGE_UPDATE_LAYOUT';
export const WS_PAGE_UPDATE_TIMEBARID = 'WS_PAGE_UPDATE_TIMEBARID';
export const WS_PAGE_PANELS_LOAD_IN_EDITOR = 'WS_PAGE_PANELS_LOAD_IN_EDITOR';
export const WS_PAGE_PANELS_RESIZE_EDITOR = 'WS_PAGE_PANELS_RESIZE_EDITOR';
export const WS_PAGE_PANELS_MINIMIZE_EDITOR = 'WS_PAGE_PANELS_MINIMIZE_EDITOR';
export const WS_PAGE_PANELS_RESIZE_TIMEBAR = 'WS_PAGE_PANELS_RESIZE_TIMEBAR';
export const WS_PAGE_PANELS_MINIMIZE_TIMEBAR = 'WS_PAGE_PANELS_MINIMIZE_TIMEBAR';
export const WS_PAGE_PANELS_FOCUS_IN_EXPLORER = 'WS_PAGE_PANELS_FOCUS_IN_EXPLORER';
export const WS_PAGE_PANELS_RESIZE_EXPLORER = 'WS_PAGE_PANELS_RESIZE_EXPLORER';
export const WS_PAGE_PANELS_MINIMIZE_EXPLORER = 'WS_PAGE_PANELS_MINIMIZE_EXPLORER';

export const WS_VIEW_ADD_BLANK = 'WS_VIEW_ADD_BLANK';
export const WS_VIEW_CLOSE = 'WS_VIEW_CLOSE';
export const WS_VIEW_REMOVE = 'WS_VIEW_REMOVE';
export const WS_VIEW_RELOAD = 'WS_VIEW_RELOAD';
export const WS_VIEW_MOVE_TO_PAGE = 'WS_VIEW_MOVE_TO_PAGE';
export const WS_VIEW_UPDATE_ENTRYPOINT = 'WS_VIEW_UPDATE_ENTRYPOINT';
export const WS_VIEW_UPDATE_AXIS = 'WS_VIEW_UPDATE_AXIS';
export const WS_VIEW_UPDATE_GRID = 'WS_VIEW_UPDATE_GRID';
export const WS_VIEW_UPDATE_LINK = 'WS_VIEW_UPDATE_LINK';
export const WS_VIEW_UPDATE_MARKER = 'WS_VIEW_UPDATE_MARKER';
export const WS_VIEW_UPDATE_PROCEDURE = 'WS_VIEW_UPDATE_PROCEDURE';
export const WS_VIEW_UPDATE_RATIO = 'WS_VIEW_UPDATE_RATIO';
export const WS_VIEW_UPDATE_TITLE = 'WS_VIEW_UPDATE_TITLE';
export const WS_VIEW_UPDATE_TITLESTYLE = 'WS_VIEW_UPDATE_TITLESTYLE';
export const WS_VIEW_UPDATE_BGCOLOR = 'WS_VIEW_UPDATE_BGCOLOR';
export const WS_VIEW_UPDATE_LEGEND = 'WS_VIEW_UPDATE_LEGEND';
export const WS_VIEW_UPDATE_CONTENT = 'WS_VIEW_UPDATE_CONTENT';
export const WS_VIEW_UPDATE_SHOWYAXES = 'WS_VIEW_UPDATE_SHOWYAXES';
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

export const DATA_ADD_REQUESTS = 'DATA_ADD_REQUESTS';
export const DATA_REMOVE_REQUESTS = 'DATA_REMOVE_REQUESTS';
export const DATA_IMPORT_PAYLOAD = 'DATA_IMPORT_PAYLOAD';
export const DATA_IMPORT_VIEWDATA = 'DATA_IMPORT_VIEWDATA';
export const DATA_REMOVE_ALL_DATACACHE = 'DATA_REMOVE_ALL_DATACACHE';
export const DATA_REMOVE_ALL_REQUESTS = 'DATA_REMOVE_ALL_REQUESTS';
export const DATA_REMOVE_ALL_VIEWDATA = 'DATA_REMOVE_ALL_VIEWDATA';
export const DATA_UPDATE_VIEWDATA = 'DATA_UPDATE_VIEWDATA';
export const DATA_UPDATE_VIEWREQUEST = 'DATA_UPDATE_VIEWREQUEST';

export const HSC_UPDATE_PATH = 'HSC_UPDATE_PATH';
export const WS_VIEW_UPDATEPATH = 'WS_VIEW_UPDATEPATH';
export const WS_VIEW_UPDATE_ABSOLUTEPATH = 'WS_VIEW_UPDATE_ABSOLUTEPATH';
export const WS_PAGE_UPDATEPATH = 'WS_PAGE_UPDATEPATH';
export const WS_PAGE_UPDATE_ABSOLUTEPATH = 'WS_PAGE_UPDATE_ABSOLUTEPATH';

export const HSC_CLOSE_WORKSPACE = 'HSC_CLOSE_WORKSPACE';
export const HSC_ISWORKSPACE_OPENING = 'HSC_ISWORKSPACE_OPENING';
export const WS_PAGE_SETMODIFIED = 'WS_PAGE_SETMODIFIED';
export const WS_WINDOW_SETMODIFIED = 'WS_WINDOW_SETMODIFIED';
export const WS_VIEW_SETMODIFIED = 'WS_VIEW_SETMODIFIED';
export const WS_VIEW_SETCOLLAPSED = 'WS_VIEW_SETCOLLAPSED';
export const WS_VIEW_SETMAXIMISED = 'WS_VIEW_SETMAXIMISED';

export const WS_MODAL_OPEN = 'WS_MODAL_OPEN';
export const WS_MODAL_CLOSE = 'WS_MODAL_CLOSE';

export const HSS_UPDATE_DC_STATUS = 'HSS_UPDATE_DC_STATUS';
export const HSS_UPDATE_HEALTH_STATUS = 'HSS_UPDATE_HEALTH_STATUS';
export const HSS_UPDATE_MAIN_STATUS = 'HSS_UPDATE_MAIN_STATUS';
export const HSS_UPDATE_WINDOW_STATUS = 'HSS_UPDATE_WINDOW_STATUS';
export const HSS_UPDATE_LAST_PUBSUB_TIMESTAMP = 'HSS_UPDATE_LAST_PUBSUB_TIMESTAMP';

export const HSC_IS_INSPECTOR_DISPLAYING_A_TM = 'HSC_IS_INSPECTOR_DISPLAYING_A_TM';
export const HSC_UPDATE_INSPECTOR_REMOTE_ID = 'HSC_UPDATE_INSPECTOR_REMOTE_ID';
export const HSC_UPDATE_INSPECTOR_DATA_ID = 'HSC_UPDATE_INSPECTOR_DATA_ID';
export const HSC_SET_INSPECTOR_STATIC_DATA = 'HSC_SET_INSPECTOR_STATIC_DATA';
export const HSC_IS_INSPECTOR_STATIC_DATA_LOADING = 'HSC_IS_INSPECTOR_STATIC_DATA_LOADING';
export const HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE = 'HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE';
export const HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING = 'HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING';
export const HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED = 'HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED';
