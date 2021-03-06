// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Explorer Right panel refactoring .
// VERSION : 1.1.2 : DM : #3622 : 14/02/2017 : Show / Hide Text Editor Window
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : merge dev . . .
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 17/02/2017 : Creation of timebarTimelines reducer .
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : Fix missing action types .
// VERSION : 1.1.2 : DM : #3622 : 21/02/2017 : fix typo in store/types .
// VERSION : 1.1.2 : DM : #3622 : 23/02/2017 : Merge branch 'dev' into abesson-html-editor
// VERSION : 1.1.2 : DM : #3622 : 03/03/2017 : Work on Maximize and collapse views
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : first draft on inspector: retrieve data from rtd on
//  right-click
// VERSION : 1.1.2 : DM : #3622 : 08/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_VIEW_ADD by WS_VIEW_ADD_BLANK .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Refacto loadDocumentsInStore from documentManager .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_CLOSE action + remove unmountAndRemove
//  (page)
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename TIMELINE_ADD_NEW in TIMELINE_CREATE_NEW .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Remove add/_add/addAndMount thunks . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_PAGE_OPEN action and remove WS_LOAD_DOCUMENTS
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup redux actions . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Rename WS_WINDOW_REMOVE in WS_WINDOW_CLOSE .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Replace WS_TIMEBAR_ADD by WS_TIMEBAR_CREATE_NEW .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_OPEN action . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Discard addAndMountTimeline . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Cleanup actions . . .
// VERSION : 1.1.2 : DM : #3622 : 13/03/2017 : Add WS_VIEW_CLOSE action + remove unmountAndRemove
//  (view)
// VERSION : 1.1.2 : DM : #3622 : 14/03/2017 : Ignore not loaded views in dataMap and data
//  requesting
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Implement a page panels reducer to allow panels
//  configuration storage in page
// VERSION : 1.1.2 : DM : #5822 : 15/03/2017 : add a tree component and format inspector data to be
//  consumed
// VERSION : 1.1.2 : DM : #5828 : 15/03/2017 : Remove the explorer resizable behavior and use
//  panels data to handle show/hide
// VERSION : 1.1.2 : DM : #5828 : 16/03/2017 : Remove old explorer keys from store
// VERSION : 1.1.2 : DM : #5822 : 16/03/2017 : resolve a rtd link in the inspector
// VERSION : 1.1.2 : DM : #5822 : 20/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 23/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5822 : 24/03/2017 : inspector view: separate general data from specific
//  TM data
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Fix few broken unit tests
// VERSION : 1.1.2 : DM : #5828 : 24/03/2017 : Cleanup React components tree and props
// VERSION : 1.1.2 : DM : #5822 : 27/03/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 28/03/2017 : Timebar is collapsable. action reducer test.
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Replace sessionId by sessionName in timeline
//  definition
// VERSION : 1.1.2 : DM : #5828 : 29/03/2017 : Move page items order in navbar
// VERSION : 1.1.2 : DM : #5822 : 03/04/2017 : merge dev in working branch
// VERSION : 1.1.2 : DM : #5828 : 05/04/2017 : minimize and keep old size for explorer and editor
// VERSION : 1.1.2 : DM : #5828 : 07/04/2017 : Collapse / minimize buttons on panel dividers. New
//  colors for dividers, darker.
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : Move isModified from state.windows to state.hsc
// VERSION : 1.1.2 : DM : #5828 : 12/04/2017 : New GenericModal component displayed or not
//  displayed at root (Window.js) AddTimeline and EditTimeline forms displayed through it.
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : add buttons to collapse and expand inspector static
//  data
// VERSION : 1.1.2 : DM : #5828 : 18/04/2017 : open parameter in editor via context menu
// VERSION : 1.1.2 : DM : #5828 : 19/04/2017 : Page title edition using contextMenu and
//  GenericModal.
// VERSION : 1.1.2 : DM : #5828 : 24/04/2017 : Edit window title available through upper menu
//  Window -> Rename.
// VERSION : 1.1.2 : DM : #5828 : 26/04/2017 : request modification to add forecast
// VERSION : 1.1.2 : DM : #5828 : 28/04/2017 : Merge branch 'dev' into simplify_datamap
// VERSION : 1.1.2 : DM : #5822 : 03/05/2017 : Inspector : display dynamic data
// VERSION : 1.1.2 : DM : #5828 : 05/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #5828 : 09/05/2017 : split updateTimebarId in mountTimebar and
//  unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Add domainName and sessionName on view, window, page
//  and hsc in store
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Main tab is stored in store for Dynamic Plot & Text.
//  state.ui
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : remove domain and session on window apply domain and
//  session of view, page or workspace in case of wildcard
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : split updateTimebarId in mountTimebar and
//  unmountTimebar
// VERSION : 1.1.2 : DM : #5828 : 10/05/2017 : Plot & Text editor panels and sub-panels are stored
//  in store.
// VERSION : 1.1.2 : DM : #6785 : 12/06/2017 : activate links in views .
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Message removing can be cancel by passing the
//  mouse over the message
// VERSION : 1.1.2 : FA : ISIS-FT-2135 : 16/06/2017 : Add animation to messages removing
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : moved components/animations in separate files.
//  Possibility to add it in editor using context menu
// VERSION : 1.1.2 : FA : ISIS-FT-2107 : 19/06/2017 : Improve PlotView editor UI -> legend in
//  store.
// VERSION : 1.1.2 : DM : #6129 : 19/06/2017 : Merge dev in abesson-mimic .
// VERSION : 1.1.2 : DM : #6129 : 20/06/2017 : [FT:#6129] [FT:#6129] [FT:#6129] [FT:#6129] Merge
//  remote-tracking branch 'origin/dev' into abesson-mimic
// VERSION : 1.1.2 : DM : #6129 : 27/06/2017 : merge dev on abesson-mimic branch .
// VERSION : 1.1.2 : DM : #6700 : 27/06/2017 : Add realTimeHandler and goNowHandler in player
//  middleware
// VERSION : 1.1.2 : DM : #6785 : 29/06/2017 : Fix opening view link in a new page and read only
//  path for link definition
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : catalog explorer : open, close and browse items
// VERSION : 1.1.2 : DM : #6688 : 05/07/2017 : First draft on catalog explorer
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Rename documentManager actions . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rewrite all saving page code
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add mock delay in profiling loop event - Try to add
//  middlware to induce stress => not possible - Modify health logic, change as soon as the
//  critical delay is reached
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add openDialog and closeDialog simple actions
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Add askPage redux action .
// VERSION : 1.1.2 : DM : #6700 : 06/07/2017 : Implement ui/dialog reducer . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Rename WS_ASK_PAGE in WS_ASK_OPEN_PAGE action
// VERSION : 1.1.2 : DM : #6700 : 12/07/2017 : Controllers dispatch action with incoming payloads
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Ask open workspace at start in
//  mainProcess/index
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Correct VIMA shutdown on new workspace : add
//  middleware for synchronous treatment
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add types and action creator for views
//  middlewares
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : fix store types tests .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Closing window now display a save wizard
//  (documents middleware)
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onReloadView documents middleware .
// VERSION : 1.1.2 : FA : #7235 : 18/07/2017 : Add workspace middleware => TODO : onWsClose
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : SaveAgentModal component can be in a
//  workspace mode
// VERSION : 1.1.2 : DM : #6700 : 19/07/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 20/07/2017 : Reimplement openLink middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Clean IPC about openInspector .
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : Add skeleton for incomingData and retrieveData
//  middleware + their test
// VERSION : 1.1.2 : DM : #6700 : 24/07/2017 : CReation of knownRanges reducer and actions
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Modify values in types js .
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : split of viewData cleaning in dataReducer for plot
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Add sendProductLog middleware in serverProcess +
//  replace old IPC productLog
// VERSION : 1.1.2 : FA : #7145 : 04/08/2017 : Clean IPC about opening wiki helper + create a store
//  folder in mainProcess
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : branch 'dev' into dbrugne-data
// VERSION : 1.1.2 : DM : #6127 : 12/09/2017 : Creation of history view data store
// VERSION : 1.1.2 : DM : #6816 : 13/09/2017 : Its possible to change the size of the mimic in the
//  view ezeditor
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json
//  patch
// VERSION : 1.1.2 : FA : #7813 : 19/09/2017 : Add batch action + logger support Remove ipc
//  transmission for un-patch action
// VERSION : 2.0.0 : DM : #5806 : 29/09/2017 : Update server process and data injection for alarms
// VERSION : 2.0.0 : DM : #5806 : 12/10/2017 : Create AlarmPubSubController and include it in the
//  code
// VERSION : 2.0.0 : FA : ISIS-FT-2248 : 18/10/2017 : Fallback/Wildcard for sessions and domains is
//  now functionnal. Plus fixed page and workspace modal editor for undefined values.
// VERSION : 2.0.0 : DM : #5806 : 20/10/2017 : Merge branch jmaupeti_alarmstub into dev
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Fork GMA to OBA (viewManager)
// VERSION : 2.0.0 : DM : #5806 : 26/10/2017 : Add GMA prefix to all GroundMonitoringAlarm
//  constants
// VERSION : 2.0.0 : DM : #6832 : 06/11/2017 : Improve ack middleware (display messages)
// VERSION : 2.0.0 : DM : #6832 : 08/11/2017 : Fix AckModal closing using a new action
//  WS_MODAL_CLOSED
// VERSION : 2.0.0 : DM : #5806 : 10/11/2017 : GroundMonitoringAlarm is now collapsable .
// VERSION : 2.0.0 : DM : #5806 : 15/11/2017 : Implement uiReducer for GMA and OBA and compute
//  selected alarms in redux store
// VERSION : 2.0.0 : DM : #6818 : 20/11/2017 : save live extents zooms & pans (plot view) in the
//  store
// VERSION : 2.0.0 : DM : #5806 : 21/11/2017 : Implement WS_VIEW_ALARM_TOGGLE_SORT action for GMA
//  and OBA
// VERSION : 2.0.0 : FA : #9380 : 23/11/2017 : Docking d'une page dans une nouvelle fenetre
// VERSION : 2.0.0 : DM : #5806 : 23/11/2017 : Merge branch 'sort_alarms' into dev
// VERSION : 2.0.0 : DM : #5806 : 27/11/2017 : Remove specific GMA and OBA ack actions
// VERSION : 2.0.0 : DM : #5806 : 12/12/2017 : Implement search filter in GMA
// VERSION : 2.0.0 : DM : #5806 : 18/12/2017 : Fix GMA filters . .
// VERSION : 2.0.0 : FA : #7813 : 02/01/2018 : fix test & constant naming
// VERSION : 2.0.0 : FA : #10670 : 09/02/2018 : Detach a page no dispatch WIP
// VERSION : 2.0.0 : FA : ISIS-FT-2265 : 27/02/2018 : init Presentational component + tests
// VERSION : 2.0.0 : FA : ISIS-FT-2215 : 05/03/2018 : Fix unit test . .
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Improve single unit retrieval .
// VERSION : 2.0.0.2 : FA : #11609 : 18/04/2018 : Fix entry point unit retrieval
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// END-HISTORY
// ====================================================================

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

export const HSC_SEND_PRODUCT_LOG = 'HSC_SEND_PRODUCT_LOG';

export const HSC_OPEN_DIALOG = 'HSC_OPEN_DIALOG';
export const HSC_DIALOG_CLOSED = 'HSC_DIALOG_CLOSED';

export const HSC_OPEN_WIKI_HELPER = 'HSC_OPEN_WIKI_HELPER';

export const WS_ASK_OPEN_VIEW = 'WS_ASK_OPEN_VIEW';
export const WS_ASK_SAVE_VIEW = 'WS_ASK_SAVE_VIEW';
export const WS_ASK_CLOSE_VIEW = 'WS_ASK_CLOSE_VIEW';
export const WS_ASK_RELOAD_VIEW = 'WS_ASK_RELOAD_VIEW';
export const WS_ASK_SAVE_VIEW_AS_MODEL = 'WS_ASK_SAVE_VIEW_AS_MODEL';
export const WS_ASK_EXPORT_AS_CSV = 'WS_ASK_EXPORT_AS_CSV';
export const WS_ASK_EXPORT_AS_IMAGE = 'WS_ASK_EXPORT_AS_IMAGE';
export const WS_ASK_EXPORT_AS_IMAGE_HAS_FAILED = 'WS_ASK_EXPORT_AS_IMAGE_HAS_FAILED';
export const WS_ASK_OPEN_LINK = 'WS_ASK_OPEN_LINK';
export const WS_VIEW_OPENED = 'WS_VIEW_OPENED';
export const WS_VIEW_TOUCH = 'WS_VIEW_TOUCH';

export const WS_ASK_OPEN_PAGE = 'WS_ASK_OPEN_PAGE';
export const WS_ASK_SAVE_PAGE = 'WS_ASK_SAVE_PAGE';
export const WS_ASK_CLOSE_PAGE = 'WS_ASK_CLOSE_PAGE';
export const WS_PAGE_OPENED = 'WS_PAGE_OPENED';

export const WS_ASK_OPEN_WORKSPACE = 'WS_ASK_OPEN_WORKSPACE';
export const WS_ASK_SAVE_WORKSPACE = 'WS_ASK_SAVE_WORKSPACE';
export const WS_ASK_CLOSE_WORKSPACE = 'WS_ASK_CLOSE_WORKSPACE';
export const WS_WORKSPACE_OPENED = 'WS_WORKSPACE_OPENED';

export const WS_ASK_CLOSE_WINDOW = 'WS_ASK_CLOSE_WINDOW';

export const WS_WORKSPACE_SET_MODIFIED = 'WS_WORKSPACE_SET_MODIFIED';
export const WS_WORKSPACE_UPDATE_DOMAINNAME = 'WS_WORKSPACE_UPDATE_DOMAINNAME';
export const WS_WORKSPACE_UPDATE_SESSIONNAME = 'WS_WORKSPACE_UPDATE_SESSIONNAME';

export const WS_MESSAGE_ADD = 'WS_MESSAGE_ADD';
export const WS_MESSAGE_REMOVING = 'WS_MESSAGE_REMOVING';
export const WS_MESSAGE_REMOVE = 'WS_MESSAGE_REMOVE';
export const WS_MESSAGE_CANCEL_REMOVING = 'WS_MESSAGE_CANCEL_REMOVING';
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
export const WS_TIMEBAR_GO_NOW = 'WS_TIMEBAR_GO_NOW';
export const WS_TIMEBAR_SAVE_VISUALIZATION = 'WS_TIMEBAR_SAVE_VISUALIZATION';

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
export const WS_WINDOW_UPDATE_TITLE = 'WS_WINDOW_UPDATE_TITLE';
export const WS_WINDOW_SET_DISPLAY_HELP = 'WS_WINDOW_SET_DISPLAY_HELP';
export const WS_WINDOW_PAGE_FOCUS = 'WS_WINDOW_PAGE_FOCUS';
export const WS_WINDOW_PAGE_REORDER = 'WS_WINDOW_PAGE_REORDER';
export const WS_WINDOW_MINIMIZE = 'WS_WINDOW_MINIMIZE';
export const WS_WINDOW_RESTORE = 'WS_WINDOW_RESTORE';
export const WS_WINDOW_OPEN_CODE_EDITOR = 'WS_WINDOW_OPEN_CODE_EDITOR';
export const WS_WINDOW_CLOSE_CODE_EDITOR = 'WS_WINDOW_CLOSE_CODE_EDITOR';
export const WS_WINDOW_MOVE_TAB_ORDER = 'WS_WINDOW_MOVE_TAB_ORDER';

export const WS_PAGE_ADD_BLANK = 'WS_PAGE_ADD_BLANK';
export const WS_PAGE_CLOSE = 'WS_PAGE_CLOSE';
export const WS_PAGE_UPDATE_LAYOUT = 'WS_PAGE_UPDATE_LAYOUT';
export const WS_PAGE_TIMEBAR_MOUNT = 'WS_PAGE_TIMEBAR_MOUNT';
export const WS_PAGE_TIMEBAR_UNMOUNT = 'WS_PAGE_TIMEBAR_UNMOUNT';
export const WS_PAGE_UPDATE_TITLE = 'WS_PAGE_UPDATE_TITLE';
export const WS_PAGE_PANELS_LOAD_IN_EDITOR = 'WS_PAGE_PANELS_LOAD_IN_EDITOR';
export const WS_PAGE_PANELS_LOAD_IN_SEARCH = 'WS_PAGE_PANELS_LOAD_IN_SEARCH';
export const WS_PAGE_PANELS_RESIZE_EDITOR = 'WS_PAGE_PANELS_RESIZE_EDITOR';
export const WS_PAGE_PANELS_MINIMIZE_EDITOR = 'WS_PAGE_PANELS_MINIMIZE_EDITOR';
export const WS_PAGE_PANELS_RESIZE_SEARCH = 'WS_PAGE_PANELS_RESIZE_SEARCH';
export const WS_PAGE_PANELS_MINIMIZE_SEARCH = 'WS_PAGE_PANELS_MINIMIZE_SEARCH';
export const WS_PAGE_PANELS_RESIZE_TIMEBAR = 'WS_PAGE_PANELS_RESIZE_TIMEBAR';
export const WS_PAGE_PANELS_MINIMIZE_TIMEBAR = 'WS_PAGE_PANELS_MINIMIZE_TIMEBAR';
export const WS_PAGE_PANELS_FOCUS_IN_EXPLORER = 'WS_PAGE_PANELS_FOCUS_IN_EXPLORER';
export const WS_PAGE_PANELS_RESIZE_EXPLORER = 'WS_PAGE_PANELS_RESIZE_EXPLORER';
export const WS_PAGE_PANELS_MINIMIZE_EXPLORER = 'WS_PAGE_PANELS_MINIMIZE_EXPLORER';
export const WS_PAGE_PANELS_UPDATE_SEARCH_COUNT = 'WS_PAGE_PANELS_UPDATE_SEARCH_COUNT';
export const WS_PAGE_UPDATE_DOMAINNAME = 'WS_PAGE_UPDATE_DOMAINNAME';
export const WS_PAGE_UPDATE_SESSIONNAME = 'WS_PAGE_UPDATE_SESSIONNAME';
export const WS_PAGE_MOVE_TO_WINDOW = 'WS_PAGE_MOVE_TO_WINDOW';
export const WS_PAGE_SEARCH = 'WS_PAGE_SEARCH';
export const WS_PAGE_RESET_SEARCH = 'WS_PAGE_RESET_SEARCH';

export const WS_VIEW_ADD_BLANK = 'WS_VIEW_ADD_BLANK';
export const WS_VIEW_CLOSE = 'WS_VIEW_CLOSE';
export const WS_VIEW_REMOVE = 'WS_VIEW_REMOVE';
export const WS_VIEW_RELOAD = 'WS_VIEW_RELOAD';
export const WS_VIEW_MOVE_TO_PAGE = 'WS_VIEW_MOVE_TO_PAGE';
export const WS_VIEW_UPDATE_ENTRYPOINT = 'WS_VIEW_UPDATE_ENTRYPOINT';
export const WS_VIEW_UPDATE_AXIS = 'WS_VIEW_UPDATE_AXIS';
export const WS_VIEW_UPDATE_GRID = 'WS_VIEW_UPDATE_GRID';
export const WS_VIEW_UPDATE_LINK = 'WS_VIEW_UPDATE_LINK';
export const WS_VIEW_TOGGLE_LEGEND = 'WS_VIEW_TOGGLE_LEGEND';
export const WS_VIEW_UPDATE_MARKER = 'WS_VIEW_UPDATE_MARKER';
export const WS_VIEW_UPDATE_PROCEDURE = 'WS_VIEW_UPDATE_PROCEDURE';
export const WS_VIEW_UPDATE_RATIO = 'WS_VIEW_UPDATE_RATIO';
export const WS_VIEW_UPDATE_TITLE = 'WS_VIEW_UPDATE_TITLE';
export const WS_VIEW_UPDATE_TITLESTYLE = 'WS_VIEW_UPDATE_TITLESTYLE';
export const WS_VIEW_UPDATE_LEGEND = 'WS_VIEW_UPDATE_LEGEND';
export const WS_VIEW_UPDATE_CONTENT = 'WS_VIEW_UPDATE_CONTENT';
export const WS_VIEW_UPDATE_SHOWYAXES = 'WS_VIEW_UPDATE_SHOWYAXES';
export const WS_VIEW_UPDATE_DIMENSIONS = 'WS_VIEW_UPDATE_DIMENSIONS';
export const WS_VIEW_UPDATE_TABLE_COLS = 'WS_VIEW_UPDATE_TABLE_COLS'; // TODO: deprecate this
export const WS_VIEW_UPDATE_TABLE_COLUMNS = 'WS_VIEW_UPDATE_TABLE_COLUMNS';
export const WS_VIEW_ADD_AXIS = 'WS_VIEW_ADD_AXIS';
export const WS_VIEW_REMOVE_AXIS = 'WS_VIEW_REMOVE_AXIS';
export const WS_VIEW_ADD_ENTRYPOINT = 'WS_VIEW_ADD_ENTRYPOINT';
export const WS_VIEW_ASK_REMOVE_ENTRYPOINT = 'WS_VIEW_ASK_REMOVE_ENTRYPOINT';
export const WS_VIEW_REMOVE_ENTRYPOINT = 'WS_VIEW_REMOVE_ENTRYPOINT';
export const WS_VIEW_ADD_GRID = 'WS_VIEW_ADD_GRID';
export const WS_VIEW_REMOVE_GRID = 'WS_VIEW_REMOVE_GRID';
export const WS_VIEW_SAVE_LIVE_EXTENTS = 'WS_VIEW_SAVE_LIVE_EXTENTS';
export const WS_VIEW_ADD_LINK = 'WS_VIEW_ADD_LINK';
export const WS_VIEW_REMOVE_LINK = 'WS_VIEW_REMOVE_LINK';
export const WS_VIEW_UPDATE_SHOWLINK = 'WS_VIEW_UPDATE_SHOWLINK';
export const WS_VIEW_ADD_MARKER = 'WS_VIEW_ADD_MARKER';
export const WS_VIEW_REMOVE_MARKER = 'WS_VIEW_REMOVE_MARKER';
export const WS_VIEW_ADD_PROCEDURE = 'WS_VIEW_ADD_PROCEDURE';
export const WS_VIEW_REMOVE_PROCEDURE = 'WS_VIEW_REMOVE_PROCEDURE';
export const WS_VIEW_UPDATE_EDITOR_SEARCH = 'WS_VIEW_UPDATE_EDITOR_SEARCH';
export const WS_VIEW_UPDATE_DOMAINNAME = 'WS_VIEW_UPDATE_DOMAINNAME';
export const WS_VIEW_UPDATE_SESSIONNAME = 'WS_VIEW_UPDATE_SESSIONNAME';
export const WS_VIEW_UPDATE_ENTRYPOINT_NAME = 'WS_VIEW_UPDATE_ENTRYPOINT_NAME';
export const WS_VIEWDATA_CLEAN = 'WS_VIEWDATA_CLEAN';
export const WS_VIEW_ADD_CONSTANT = 'WS_VIEW_ADD_CONSTANT';
export const WS_VIEW_REMOVE_CONSTANT = 'WS_VIEW_REMOVE_CONSTANT';
export const WS_VIEW_UPDATE_CONSTANT = 'WS_VIEW_UPDATE_CONSTANT';


export const WS_VIEW_TABLE_UPDATE_SORT = 'WS_VIEW_TABLE_UPDATE_SORT';
export const WS_VIEW_CHANGE_COL_FILTERS = 'WS_VIEW_CHANGE_COL_FILTERS';
export const WS_VIEW_HIDE_COL = 'WS_VIEW_HIDE_COL';
export const WS_VIEW_SHOW_COL = 'WS_VIEW_SHOW_COL';
export const WS_VIEW_ADD_COL = 'WS_VIEW_ADD_COL';
export const WS_VIEW_REMOVE_COL = 'WS_VIEW_REMOVE_COL';
export const WS_VIEW_TABLE_SCROLL = 'WS_VIEW_TABLE_SCROLL';
export const WS_VIEW_TABLE_UPDATE_HEIGHT = 'WS_VIEW_TABLE_UPDATE_HEIGHT';
export const WS_VIEW_TABLE_ADD_COLUMNS = 'WS_VIEW_TABLE_ADD_COLUMNS';
export const WS_VIEW_TABLE_REORDER_COLUMNS = 'WS_VIEW_TABLE_REORDER_COLUMNS';
export const WS_VIEW_TABLE_TOGGLE_COLUMN = 'WS_VIEW_TABLE_TOGGLE_COLUMN';
export const WS_VIEW_TABLE_UPDATE_COLUMN_WIDTH = 'WS_VIEW_TABLE_UPDATE_COLUMN_WIDTH';

export const WS_SEARCH_IN_VIEW = 'WS_SEARCH_IN_VIEW';
export const WS_RESET_SEARCH_IN_VIEW = 'WS_RESET_SEARCH_IN_VIEW';

export const WS_VIEW_ALARM_COLLAPSE = 'WS_VIEW_ALARM_COLLAPSE';
export const WS_VIEW_ALARM_UNCOLLAPSE = 'WS_VIEW_ALARM_UNCOLLAPSE';
export const WS_VIEW_ALARM_TOGGLE_SELECTION = 'WS_VIEW_ALARM_TOGGLE_SELECTION';
export const WS_VIEW_ALARM_TOGGLE_SORT = 'WS_VIEW_ALARM_TOGGLE_SORT';

export const WS_VIEW_ALARM_INPUT_SEARCH = 'WS_VIEW_ALARM_INPUT_SEARCH';
export const WS_VIEW_ALARM_INPUT_RESET = 'WS_VIEW_ALARM_INPUT_RESET';
export const WS_VIEW_ALARM_INPUT_TOGGLE = 'WS_VIEW_ALARM_INPUT_TOGGLE';

export const WS_VIEW_UPDATE_ALARMDOMAIN = 'WS_VIEW_UPDATE_ALARMDOMAIN';
export const WS_VIEW_UPDATE_ALARMTIMELINE = 'WS_VIEW_UPDATE_ALARMTIMELINE';
export const WS_VIEW_UPDATE_ALARMMODE = 'WS_VIEW_UPDATE_ALARMMODE';

export const WS_VIEW_ALARM_ACK = 'WS_VIEW_ALARM_ACK';
export const WS_VIEW_ALARM_ACK_SUCCESS = 'WS_VIEW_ALARM_ACK_SUCCESS';
export const WS_VIEW_ALARM_ACK_FAILURE = 'WS_VIEW_ALARM_ACK_FAILURE';

export const WS_VIEW_HISTORY_TOGGLE_TRACK_CURRENT = 'WS_VIEW_HISTORY_TOGGLE_TRACK_CURRENT';

export const DATA_INCOMING_ARCHIVE = 'DATA_INCOMING_ARCHIVE';
export const DATA_INCOMING_PUBSUB = 'DATA_INCOMING_PUBSUB';
export const DATA_REMOVE_ALL_VIEWDATA = 'DATA_REMOVE_ALL_VIEWDATA';

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
export const WS_MODAL_CLOSED = 'WS_MODAL_CLOSED';

export const WS_EDITOR_UI_PANEL = 'WS_EDITOR_UI_PANEL';
export const WS_EDITOR_UI_SUBPANEL = 'WS_EDITOR_UI_SUBPANEL';
export const WS_EDITOR_UI_TAB = 'WS_EDITOR_UI_TAB';

export const WS_CATALOGS_UPDATE_STATUS = 'WS_CATALOGS_UPDATE_STATUS';
export const WS_CATALOGS_ASK = 'WS_CATALOGS_ASK';
export const WS_CATALOGS_ADD = 'WS_CATALOGS_ADD';
export const WS_CATALOG_ITEMS_UPDATE_STATUS = 'WS_CATALOG_ITEMS_UPDATE_STATUS';
export const WS_CATALOG_ITEMS_ASK = 'WS_CATALOG_ITEMS_ASK';
export const WS_CATALOG_ITEMS_ADD = 'WS_CATALOG_ITEMS_ADD';
export const WS_COM_OBJECTS_UPDATE_STATUS = 'WS_COM_OBJECTS_UPDATE_STATUS';
export const WS_COM_OBJECTS_ASK = 'WS_COM_OBJECTS_ASK';
export const WS_COM_OBJECTS_ADD = 'WS_COM_OBJECTS_ADD';
export const WS_ITEM_STRUCTURE_UPDATE_STATUS = 'WS_ITEM_STRUCTURE_UPDATE_STATUS';
export const WS_ITEM_STRUCTURE_ASK = 'WS_ITEM_STRUCTURE_ASK';
export const WS_ITEM_STRUCTURE_ADD = 'WS_ITEM_STRUCTURE_ADD';
export const WS_ITEM_METADATA_UPDATE_STATUS = 'WS_ITEM_METADATA_UPDATE_STATUS';
export const WS_ITEM_METADATA_ASK = 'WS_ITEM_METADATA_ASK';
export const WS_ITEM_METADATA_ADD = 'WS_ITEM_METADATA_ADD';
export const WS_REPORTING_ITEM_PACKETS_UPDATE_STATUS = 'WS_REPORTING_ITEM_PACKETS_UPDATE_STATUS';
export const WS_REPORTING_ITEM_PACKETS_ASK = 'WS_REPORTING_ITEM_PACKETS_ASK';
export const WS_REPORTING_ITEM_PACKETS_ADD = 'WS_REPORTING_ITEM_PACKETS_ADD';

// application process

export const WS_APIDS_ASK = 'WS_APIDS_ASK';
export const WS_APIDS_ADD = 'WS_APIDS_ADD';

export const WS_KNOWNINTERVAL_ADD = 'WS_KNOWNINTERVAL_ADD';
export const WS_KNOWNINTERVAL_DELETE = 'WS_KNOWNINTERVAL_DELETE';
export const RESET_KNOWN_RANGES = 'RESET_KNOWN_RANGES';

export const WS_KNOWN_PUS_INTERVAL_ADD = 'WS_KNOWN_PUS_INTERVAL_ADD';
export const WS_KNOWN_PUS_INTERVAL_DELETE = 'WS_KNOWN_PUS_INTERVAL_DELETE';
export const RESET_KNOWN_PUS = 'RESET_KNOWN_PUS';

export const WS_OBSOLETE_EVENT_ADD = 'WS_OBSOLETE_EVENT_ADD';
export const WS_OBSOLETE_EVENT_DELETE = 'WS_OBSOLETE_EVENT_DELETE';
export const RESET_OBSOLETE_EVENTS = 'RESET_OBSOLETE_EVENTS';

export const WS_KNOWNINTERVAL_ADD_SAMPLING_ON = 'WS_KNOWNINTERVAL_ADD_SAMPLING_ON';
export const WS_KNOWNINTERVAL_DELETE_SAMPLING_ON = 'WS_KNOWNINTERVAL_DELETE_SAMPLING_ON';
export const RESET_KNOWN_RANGES_SAMPLING_ON = 'RESET_KNOWN_RANGES_SAMPLING_ON';

export const HSS_UPDATE_DC_STATUS = 'HSS_UPDATE_DC_STATUS';
export const HSS_UPDATE_HEALTH_STATUS = 'HSS_UPDATE_HEALTH_STATUS';
export const HSS_UPDATE_MAIN_STATUS = 'HSS_UPDATE_MAIN_STATUS';
export const HSS_UPDATE_WINDOW_STATUS = 'HSS_UPDATE_WINDOW_STATUS';
export const HSS_UPDATE_LAST_PUBSUB_TIMESTAMP = 'HSS_UPDATE_LAST_PUBSUB_TIMESTAMP';

export const HSC_ASK_OPEN_INSPECTOR = 'HSC_ASK_OPEN_INSPECTOR';
export const HSC_IS_INSPECTOR_DISPLAYING_A_TM = 'HSC_IS_INSPECTOR_DISPLAYING_A_TM';
export const HSC_SET_INSPECTOR_GENERAL_DATA = 'HSC_SET_INSPECTOR_GENERAL_DATA';
export const HSC_DELETE_INSPECTOR_GENERAL_DATA = 'HSC_DELETE_INSPECTOR_GENERAL_DATA';
export const HSC_SET_INSPECTOR_STATIC_DATA = 'HSC_SET_INSPECTOR_STATIC_DATA';
export const HSC_IS_INSPECTOR_STATIC_DATA_LOADING = 'HSC_IS_INSPECTOR_STATIC_DATA_LOADING';
export const HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES = 'HSC_TOGGLE_ALL_INSPECTOR_STATIC_DATA_NODES';
export const HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE = 'HSC_UPDATE_INSPECTOR_STATIC_DATA_NODE';
export const HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING = 'HSC_IS_INSPECTOR_STATIC_DATA_NODE_LOADING';
export const HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED = 'HSC_IS_INSPECTOR_STATIC_DATA_NODE_TOGGLED';

export const HSC_UPDATE_FORECAST = 'HSC_UPDATE_FORECAST';

// PROFILING
export const HSC_UPDATE_STRESS = 'HSC_UPDATE_STRESS';

// DATA FLOW

export const INCOMING_LAST_DATA = 'INCOMING_LAST_DATA';
export const INCOMING_RANGE_DATA = 'INCOMING_RANGE_DATA';
export const INCOMING_OBSOLETE_EVENT = 'INCOMING_OBSOLETE_EVENT';
export const INCOMING_PUBSUB_DATA = 'INCOMING_PUBSUB_DATA';
export const INCOMING_PUBSUBALARM_DATA = 'INCOMING_PUBSUBALARM_DATA';

export const NEW_DATA = 'NEW_DATA';

// Is it a good idea to seprate both ?
export const INJECT_DATA_RANGE = 'INJECT_DATA_RANGE';
export const INJECT_DATA_LAST = 'INJECT_DATA_LAST';
export const INJECT_DATA_OBSOLETE_EVENT = 'INJECT_DATA_OBSOLETE_EVENT';

export const DATA_TYPE_RANGE = 'DATA_TYPE_RANGE';
export const DATA_TYPE_LAST = 'DATA_TYPE_LAST';
export const DATA_TYPE_OBSOLETE_EVENT = 'DATA_TYPE_OBSOLETE_EVENT';

export const VIEWS_NEED_LAST = 'VIEWS_NEED_LAST';
export const VIEWS_NEED_RANGE = 'VIEWS_NEED_RANGE';
export const VIEWS_NEED_OBSOLETE_EVENT = 'VIEWS_NEED_OBSOLETE_EVENT';
export const VIEWS_NEED_PUS = 'VIEWS_NEED_PUS';

export const WS_RETRIEVEDATA_RANGE = 'WS_RETRIEVEDATA_RANGE';
export const WS_RETRIEVEDATA_LAST = 'WS_RETRIEVEDATA_LAST';

// BATCH ACTION
export const BATCHING_REDUCER_BATCH = 'BATCHING_REDUCER_BATCH';

// COM OBJECT MAP ACTION

export const SET_COM_OBJECT_MAP = 'SET_COM_OBJECT_MAP';

export const PAGE_DRAG_EVENT = 'PAGE_DRAG_EVENT';

// SAMPLING
export const TOGGLE_SAMPLING_STATUS = 'TOGGLE_SAMPLING_STATUS';
export const TOGGLE_ZOOM_STATE = 'TOGGLE_ZOOM_STATE';
export const SET_SAMPLING_LOCK = 'SET_SAMPLING_LOCK';

// SAMPLING BUTTON STATE ENUM
export const BUTTON_DISABLED_WHILE_SAMPLING_ON = 'BUTTON_DISABLED_WHILE_SAMPLING_ON';
export const BUTTON_ENABLED_WHILE_SAMPLING_ON = 'BUTTON_ENABLED_WHILE_SAMPLING_ON';
export const BUTTON_ENABLED_WHILE_SAMPLING_OFF = 'BUTTON_ENABLED_WHILE_SAMPLING_OFF';
export const BUTTON_STATE_ERROR = 'BUTTON_STATE_ERROR';

// TEMP TEST PUS

export const PUS_TEMP_INITIALIZE = 'PUS_TEMP_INITIALIZE';
export const PUS_TEMP_SUBSCRIBE = 'PUS_TEMP_SUBSCRIBE';
export const PUS_TEMP_UNSUBSCRIBE = 'PUS_TEMP_UNSUBSCRIBE';
export const PUS_TEMP_COMPARE = 'PUS_TEMP_COMPARE';
export const PUS_TEMP_RESET = 'PUS_TEMP_RESET';

export const INCOMING_PUS_DATA = 'INCOMING_PUS_DATA';
export const PUS_MODEL_SAVE_IN_FILE = 'PUS_MODEL_SAVE_IN_FILE';

export const INCOMING_PUS_RANGE_DATA = 'INCOMING_PUS_RANGE_DATA';
export const NEW_PUS_DATA = 'NEW_PUS_DATA';
export const INJECT_PUS_DATA = 'INJECT_PUS_DATA';
export const SAVE_PUS_DATA = 'SAVE_PUS_DATA';

// CUSTOM FORM ACTIONS

export const FORM_CATALOG_CHANGE = 'FORM_CATALOG_CHANGE';

// GENERIC LOADING STATUSES

export const STATUS_LOADING = 'loading';
export const STATUS_LOADED = 'loaded';
