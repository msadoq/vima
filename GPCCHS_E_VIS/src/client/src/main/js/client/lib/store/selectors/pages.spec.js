import {
  getPageViews,
  isAnyEditorOpened,
  isAnyInspectorOpened,
} from './pages';

describe('store:page:selectors', () => {
  test('getPageViews', () => {
    const state = {
      pages: {
        myPageId: {
          views: ['view1'],
        },
      },
      views: {
        views1: {},
        views2: {},
      },
    };

    expect(getPageViews(state, { pageId: 'myPageId' })).toEqual([
      { viewId: 'view1' },
    ]);
  });
  test('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorIsMinimized: false,
            editorWidth: 250,
          },
        },
        page2: {
          panels: {
            editorIsMinimized: true,
            editorWidth: 250,
          },
        },
      },
    };
    expect(isAnyEditorOpened(state)).toEqual(true);
  });
  test('notice if any view is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            editorWidth: 250,
            editorIsMinimized: true,
          },
        },
      },
    };
    expect(isAnyEditorOpened(state)).toEqual(false);
  });
  test('notice if any inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: false,
            explorerTab: 'inspector',
          },
        },
      },
    };
    expect(isAnyInspectorOpened(state)).toEqual(true);
  });
  test('notice if no inspector is opened', () => {
    const state = {
      pages: {
        page1: {
          panels: {
            explorerIsMinimized: true,
            explorerTab: 'inspector',
          },
        },
      },
    };
    expect(isAnyInspectorOpened(state)).toEqual(false);
  });
});
