import __ from 'lodash/fp';
import * as types from '../../types';

const initialState = {
  title: 'Unknown',
  timebarHeight: 135,
  timebarCollapsed: false,
  timebarUuid: null,
  layout: [],
  views: [],
  editor: {
    isOpened: false,
    viewId: null,
    viewType: null,
  },
  isModified: true,
  properties: [],
};

const page = (statePage = initialState, action) => {
  switch (action.type) {
    case types.WS_PAGE_ADD:
      return {
        ...statePage,
        title: action.payload.title || statePage.title,
        timebarUuid: action.payload.timebarUuid || statePage.timebarUuid,
        timebarHeight: action.payload.timebarHeight || statePage.timebarHeight,
        timebarCollapsed: action.payload.timebarCollapsed || statePage.timebarCollapsed,
        layout: action.payload.layout || statePage.layout,
        views: action.payload.views || statePage.views,
        path: action.payload.path,
        oId: action.payload.oId,
        absolutePath: action.payload.absolutePath,
        isModified: (action.payload.isModified === undefined) ?
          statePage.isModified : action.payload.isModified,
        properties: action.payload.properties || [],
      };
    case types.WS_PAGE_EDITOR_OPEN:
      return __.update('editor', __.merge(__, {
        isOpened: true,
        viewId: action.payload.viewId,
        viewType: action.payload.viewType,
      }), statePage);
    case types.WS_PAGE_EDITOR_CLOSE:
      return __.set('editor.isOpened', false, statePage);
    case types.WS_PAGE_VIEW_MOUNT: {
      return __.merge(statePage, {
        views: [...statePage.views, action.payload.viewId],
        isModified: true,
        layout: action.payload.layout,
      });
    }
    case types.WS_PAGE_VIEW_UNMOUNT: {
      return {
        ...statePage,
        views: __.pull(action.payload.viewId, statePage.views),
        isModified: true,
      };
    }
    case types.WS_PAGE_UPDATE_LAYOUT: {
      return {
        ...statePage,
        layout: action.payload.layout,
        isModified: true,
      };
    }
    case types.WS_PAGE_TIMEBAR_COLLAPSE: {
      return {
        ...statePage,
        timebarCollapsed: action.payload.flag,
        isModified: true,
      };
    }
    case types.WS_PAGE_UPDATEPATH:
      return {
        ...statePage,
        path: action.payload.newPath,
        isModified: true,
      };
    case types.WS_PAGE_UPDATE_ABSOLUTEPATH: {
      return {
        ...statePage,
        absolutePath: action.payload.newPath,
        isModified: true,
      };
    }
    case types.WS_PAGE_SET_OID: {
      return {
        ...statePage,
        oId: action.payload.oid,
        isModified: true,
      };
    }
    case types.WS_PAGE_SETMODIFIED: {
      return __.set('isModified', action.payload.flag, statePage);
    }
    case types.WS_PAGE_UPDATE_TIMEBARID:
      return __.set('timebarUuid', action.payload.timebarUuid, statePage);
    case types.WS_PAGE_UPDATE_TIMEBARHEIGHT:
      return {
        ...statePage,
        isModified: true,
        timebarHeight: action.payload.timebarHeight >= 135 ? action.payload.timebarHeight : 135,
      };
    default:
      return statePage;
  }
};

export default page;