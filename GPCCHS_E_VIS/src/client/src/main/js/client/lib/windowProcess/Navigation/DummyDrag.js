import React from 'react';
import _ from 'lodash/fp';

import { getRandomColor } from '../common/colors';

const s = {
  container: {
    float: 'right',
    right: '4em',
    margin: '0.5em',
  },
  box: {
    padding: '0.2em 0.5em',
    color: 'white',
    display: 'inline-block',
    marginRight: '1em',
  },
};

const items = [
  {
    name: 'Text view',
    mimeType: 'ViewDoc',
    filePath: '/views/text.vitv',
    mime: 'application/json',
  },
  {
    name: 'page',
    mimeType: 'PageDoc',
    filePath: '/pages/dev.page1.vipg',
    mime: 'application/json',
  },
  {
    name: 'workspace',
    mimeType: 'WorkspaceDoc',
    filePath: '/dev.workspace.viws',
    mime: 'application/json',
  },
  {
    name: 'EntryPoint',
    sessionName: '',
    catalogName: 'Reporting',
    nameSpace: '',
    item: 'ATT_BC_REVTCOUNT1',
    comObjects: ['ReportingParameter'],
    mime: 'application/json',
  },
];

const dragStart = (item, e) => {
  e.dataTransfer.setData(
    item.mime,
    _.pipe(
      _.dissoc('mime'),
      JSON.stringify
    )(item)
  );
};

const dragStartFactory = _.memoize(item => e => dragStart(item, e));

const DummyDrag = () => (
  <div style={s.container} >
    <span className="DragMe" style={{ marginRight: '1em' }}>Drag-moi</span>
    {items.map(item =>
      <div
        key={item.name}
        style={{ ...s.box, backgroundColor: getRandomColor() }}
        draggable
        onDragStart={dragStartFactory(item)}
      >
        {item.name}
      </div>
    )}
  </div>
);

export default DummyDrag;
