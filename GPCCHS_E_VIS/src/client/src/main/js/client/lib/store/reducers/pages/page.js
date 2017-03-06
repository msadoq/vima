import _ from 'lodash/fp';
import { copyProp } from 'common/utils/fp';
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
    case types.WS_LOAD_DOCUMENTS: {
      const newPage = _.merge(statePage, action.payload.page);
      const pageViews = _.groupBy('pageUuid', action.payload.documents.views)[newPage.uuid];
      if (!pageViews) {
        return newPage;
      }
      const getUuids = _.map('uuid');
      const getLayout = _.map(_.pipe(
        copyProp('uuid', 'geometry.i'),
        _.prop('geometry'),
        _.defaults({ x: 0, y: 0, h: 5, w: 5 })
      ));
      return _.pipe(
        _.update('layout', _.concat(_, getLayout(pageViews))),
        _.update('views', _.concat(_, getUuids(pageViews)))
      )(newPage);
    }
    case types.WS_PAGE_EDITOR_OPEN:
      return _.update('editor', _.merge(_, {
        isOpened: true,
        viewId: action.payload.viewId,
        viewType: action.payload.viewType,
      }), statePage);
    case types.WS_PAGE_EDITOR_CLOSE:
      return _.set('editor.isOpened', false, statePage);
    case types.WS_PAGE_VIEW_MOUNT: {
      const { layout } = action.payload;
      return _.merge(statePage, {
        views: [...statePage.views, action.payload.viewId],
        isModified: true,
        layout: layout && layout.length ? layout : undefined,
      });
    }
    case types.WS_PAGE_VIEW_UNMOUNT: {
      return {
        ...statePage,
        views: _.pull(action.payload.viewId, statePage.views),
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
      return _.set('isModified', action.payload.flag, statePage);
    }
    case types.WS_PAGE_UPDATE_TIMEBARID:
      return _.set('timebarUuid', action.payload.timebarUuid, statePage);
    case types.WS_PAGE_UPDATE_TIMEBARHEIGHT:
      return {
        ...statePage,
        isModified: true,
        timebarHeight: action.payload.timebarHeight >= 135 ? action.payload.timebarHeight : 135,
      };
    case types.WS_VIEW_SETCOLLAPSED:
      return __.set(['layout', __.findIndex(i => i.i === action.payload.viewId, statePage.layout), 'collapsed'],
        action.payload.flag,
        {
          ...statePage,
          isModified: true,
        }
      );
    case types.WS_VIEW_SETMAXIMISED:
      return __.set(['layout', __.findIndex(i => i.i === action.payload.viewId, statePage.layout), 'maximized'],
        action.payload.flag,
        statePage
      );
    default:
      return statePage;
  }
};

export default page;
