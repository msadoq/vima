import _omit from 'lodash/omit';
import prepareViewForFile from './prepareViewForFile';

const props = {
  type: 'PUS11View',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'On-Board Scheduling Service Ground Model (PUS11)',
  titleStyle: {
    align: 'left',
    bold: false,
    color: '#000000',
    font: 'Arial',
    italic: false,
    size: 12,
    strikeOut: false,
    underline: false,
  },
  uuid: 'e90097c0-6ca8-4f28-a1e0-6434168fc197',
  isModified: true,
  showLinks: false,
  domainName: '*',
  sessionName: '*',
  domain: '*',
  session: '*',
  configuration: {
    tables: {
      enabledApids: {
        cols: [
          {
            title: 'apid',
            value: 'apid',
            position: 0,
            displayed: true,
            group: 0,
          },
          {
            title: 'name',
            value: 'name',
            position: 1,
            displayed: true,
            group: 0,
          },
          {
            title: 'updateType',
            value: 'updateType',
            position: 2,
            displayed: true,
            group: 0,
          },
          {
            title: 'updateTime',
            value: 'updateTime',
            displayed: true,
            position: 3,
            group: 0,
          },
        ],
      },
      subSchedules: {
        cols: [
          {
            title: 'ssid',
            value: 'ssid',
            position: 0,
            displayed: true,
            group: 0,
          },
          {
            title: 'ssidLabel',
            value: 'ssidLabel',
            position: 1,
            displayed: true,
            group: 0,
          },
          {
            title: 'name',
            value: 'name',
            position: 2,
            displayed: true,
            group: 0,
          },
          {
            title: 'status',
            value: 'status',
            displayed: true,
            position: 3,
            group: 0,
          },
          {
            title: 'firstTcTime',
            value: 'firstTcTime',
            displayed: true,
            position: 4,
            group: 0,
          },
          {
            title: 'updateType',
            value: 'updateType',
            displayed: true,
            position: 5,
            group: 0,
          },
          {
            title: 'updateTime',
            value: 'updateTime',
            displayed: true,
            position: 6,
            group: 0,
          },
          {
            title: 'nbTc',
            value: 'nbTc',
            displayed: true,
            position: 7,
            group: 0,
          },
        ],
      },
      commands: {
        cols: [
          {
            title: 'apid',
            value: 'apid',
            position: 0,
            displayed: true,
            group: 0,
          },
          {
            title: 'ssid',
            value: 'ssid',
            position: 1,
            displayed: true,
            group: 0,
          },
          {
            title: 'cmdName',
            value: 'cmdName',
            position: 2,
            displayed: true,
            group: 0,
          },
          {
            title: 'cmdShortDescription',
            value: 'cmdShortDescription',
            displayed: true,
            position: 3,
            group: 0,
          },
          {
            title: 'cmdApName',
            value: 'cmdApName',
            displayed: true,
            position: 4,
            group: 0,
          },
          {
            title: 'seqCount',
            value: 'seqCount',
            displayed: true,
            position: 5,
            group: 0,
          },
          {
            title: 'sourceId',
            value: 'sourceId',
            displayed: true,
            position: 6,
            group: 0,
          },
          {
            title: 'cmdStatus',
            value: 'cmdStatus',
            displayed: true,
            position: 7,
            group: 0,
          },
          {
            title: 'groundStatus',
            value: 'groundStatus',
            displayed: true,
            position: 8,
            group: 0,
          },
          {
            title: 'initExecTime',
            value: 'initExecTime',
            displayed: true,
            position: 9,
            group: 0,
          },
          {
            title: 'curExecTime',
            value: 'curExecTime',
            displayed: true,
            position: 10,
            group: 0,
          },
          {
            title: 'totTimeShift',
            value: 'totTimeShift',
            displayed: true,
            position: 11,
            group: 0,
          },
          {
            title: 'updateType',
            value: 'updateType',
            displayed: true,
            position: 12,
            group: 0,
          },
          {
            title: 'updateTime',
            value: 'updateTime',
            displayed: true,
            position: 13,
            group: 0,
          },
        ],
      },
    },
    entryPoints: [{
      foo: 'foo',
    }],
  },
};

describe('viewManager/PUS11View/prepareViewForFile', () => {
  it('should remove correctly entryPoints key, and copy it as entryPoint', () => {
    expect(prepareViewForFile(props)).toEqual({
      ...props,
      configuration: {
        ..._omit(props.configuration, ['entryPoints']),
        entryPoint: { foo: 'foo' },
      },
    });
  });
});