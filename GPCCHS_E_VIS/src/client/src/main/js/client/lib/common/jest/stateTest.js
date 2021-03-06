// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 28/07/2017 : Creation of store observer and test state
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : fix datamap for collapsed view add filter on mimic
//  entry point fix computation of missing last interval Add filter on tbdId computation for plot
//  view
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add entryPoints with offset in state for test
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Update state for unit tests
// VERSION : 1.1.2 : DM : #6700 : 31/07/2017 : Add unit test on missing interval computing
// VERSION : 1.1.2 : DM : #6700 : 02/08/2017 : Update unit tests for Plot View store
// VERSION : 1.1.2 : DM : #6700 : 04/08/2017 : Update unit tests and add view reducers to action
//  viewData_clean
// VERSION : 1.1.2 : FA : ISIS-FT-2138 : 05/09/2017 : New extensions. Updated extensions of data
//  files, updated config.sample.json.
// VERSION : 1.1.2 : FA : #7814 : 18/09/2017 : Update plot view data structure to improve json
//  patch
// VERSION : 2.0.0 : DM : #6127 : 20/09/2017 : Update of history view data store
// VERSION : 2.0.0 : FA : ISIS-FT-1992 : 31/10/2017 : Fix broken TUs . .
// VERSION : 2.0.0 : FA : ISIS-FT-2159 : 20/03/2018 : editeur champ flowType VIMA JS
// VERSION : 2.0.0.2 : FA : #11628 : 18/04/2018 : core implementation of dealing with sessions
// VERSION : 2.0.0.3 : FA : ISIS-FT-3174 : 30/05/2018 : disable background color on view header for
//  multisat handle
// VERSION : 2.0.0.3 : FA : ISIS-FT-3152 : 30/05/2018 : comportement multisat VIMA . .
// END-HISTORY
// ====================================================================

export default {
  DynamicViewConfiguration: {
    dynamic1: {
      entryPoints: [{
        connectedData: {
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          formula: 'TelemetryPacket.CLCW_TM_NOMINAL<DecommutedPacket>',
          timeline: 'Session 1',
        },
        id: 'dynamic1ep1',
        name: 'dynamicEP',
      }],
    },
  },
  DynamicViewData: {
    dynamic1: {
      index: 399900,
      value: {
        decommutedValues: [{
          convertedValue: {
            symbol: 2,
            type: 'ulong',
            value: 2,
          },
          extractedValue: {
            type: 'blob',
            value: '0c 0c 0c 0c 0c 0c 0c 0c 0c 0c',
          },
          name: {
            type: 'identifier',
            value: 'GENE_AM_CCSDSVERS1',
          },
          rawValue: {
            symbol: 2,
            type: 'ulong',
            value: 2,
          },
          validityState: {
            symbol: 'INVALID',
            type: 'enum',
            value: 'INVALID',
          },
        }, {
          convertedValue: {
            symbol: 0,
            type: 'ulong',
            value: 0,
          },
          extractedValue: {
            type: 'blob',
            value: '01 01 01 01 01 01 01 01 01 01',
          },
          name: {
            type: 'identifier',
            value: 'GENE_AM_CCSDSVERS2',
          },
          rawValue: {
            symbol: 0,
            type: 'ulong',
            value: 0,
          },
          validityState: {
            symbol: 'INVALID',
            type: 'enum',
            value: 'INVALID',
          },
        }],
        groundDate: {
          type: 'time',
          value: '2017-07-28T12:14:45.992Z',
        },
        isNominal: {
          type: 'boolean',
          value: true,
        },
        onboardDate: {
          type: 'time',
          value: '2017-07-28T12:14:45.972Z',
        },
        referenceTimestamp: {
          type: 'time',
          value: '2017-07-28T12:14:45.972Z',
        },
      },
    },
  },
  GroundAlarmViewConfiguration: {
    groundAlarm1: {
      search: { enabled: true },
      entryPoints: [{
        connectedData: {
          domain: 'fr.cnes.isis.simupus',
          timeline: 'Session 1',
          mode: 0,
        },
        id: 'groundAlarm1ep1',
        name: 'groundAlarmEP',
        stateColors: [],
      }],
      tables: {
        main: {
          cols: [
            {
              title: 'timestamp',
              value: 'timestamp',
              position: 0,
              displayed: true,
              group: 0,
            },
            {
              title: 'parameterName',
              value: 'parameterName',
              position: 1,
              displayed: true,
              group: 0,
            },
            {
              title: 'parameterType',
              value: 'parameterType',
              position: 2,
              displayed: true,
              group: 0,
            },
            {
              title: 'firstOccurence',
              value: 'firstOccurence',
              displayed: true,
              position: 3,
              group: 0,
            },
            {
              title: 'lastOccurence',
              value: 'lastOccurence',
              displayed: true,
              position: 4,
              group: 0,
            },
            {
              title: 'durationtimestamp',
              value: 'durationtimestamp',
              displayed: true,
              position: 5,
              group: 0,
            },
            {
              title: 'rawValuetimestamp',
              value: 'rawValuetimestamp',
              displayed: true,
              position: 6,
              group: 0,
            },
            {
              title: 'physicalValue',
              value: 'physicalValue',
              displayed: true,
              position: 7,
              group: 0,
            },
            {
              title: 'satellite',
              value: 'satellite',
              displayed: true,
              position: 8,
              group: 0,
            },
            {
              title: 'ackStatetimestamp',
              value: 'ackStatetimestamp',
              displayed: true,
              position: 9,
              group: 0,
            },
          ],
        },
      },
    },
  },
  PUS11ViewConfiguration: {
    pus11: {
      tables: {
        enabledApids: {
          cols: [
            {
              title: 'apid',
              displayed: true,
            },
            {
              title: 'name',
              displayed: true,
            },
            {
              title: 'updateType',
              displayed: true,
            },
            {
              title: 'updateTime',
              displayed: true,
            },
          ],
        },
        subSchedules: {
          cols: [
            {
              title: 'ssid',
              displayed: true,
            },
            {
              title: 'ssidLabel',
              displayed: true,
            },
            {
              title: 'name',
              displayed: true,
            },
            {
              title: 'status',
              displayed: true,
            },
            {
              title: 'firstTcTime',
              displayed: true,
            },
            {
              title: 'updateType',
              displayed: true,
            },
            {
              title: 'updateTime',
              displayed: true,
            },
            {
              title: 'nbTc',
              displayed: true,
            },
          ],
        },
        commands: {
          cols: [
            {
              title: 'apid',
              displayed: true,
            },
            {
              title: 'ssid',
              displayed: true,
            },
            {
              title: 'cmdName',
              displayed: true,
            },
            {
              title: 'cmdShortDescription',
              displayed: true,
            },
            {
              title: 'cmdApName',
              displayed: true,
            },
            {
              title: 'seqCount',
              displayed: true,
            },
            {
              title: 'sourceId',
              displayed: true,
            },
            {
              title: 'cmdStatus',
              displayed: true,
            },
            {
              title: 'groundStatus',
              displayed: true,
            },
            {
              title: 'initExecTime',
              displayed: true,
            },
            {
              title: 'curExecTime',
              displayed: true,
            },
            {
              title: 'totTimeShift',
              displayed: true,
            },
            {
              title: 'updateType',
              displayed: true,
            },
            {
              title: 'updateTime',
              displayed: true,
            },
          ],
        },
      },
      entryPoints: [{
        connectedData: {
          apidName: 'TIMEPACKET,POWERMGT',
          apidRawValue: null,
          apids: [
            {
              apidName: 'TIMEPACKET',
              apidRawValue: 0,
            },
            {
              apidName: 'POWERMGT',
              apidRawValue: 3,
            },
          ],
          domain: 'fr.cnes.isis.station.hbk',
          formula: 'PusGroundModelDefinition.Pus011Model<Pus011Model>',
          session: '*',
          timeline: 'Session 1',
        },
      }],
    },
  },
  PUS11ViewData: {},
  PUS14ViewConfiguration: {
    pus14: {
      tables: {
        packetForwarding: {
          name: 'Tm Packets',
          sorting: {
            colName: 'packetApid',
            direction: 'DESC',
          },
          cols: [
            { title: 'packetApid', displayed: true }, // A afficher dans le tableau de packets
            { title: 'forwardingStatus', displayed: true }, // A afficher dans le tableau de packets
            { title: 'lastUpdateModeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
            { title: 'lastUpdateTimeFwdStatus', displayed: true }, // Tooltip sur forwardingStatus
            { title: 'packetApidName', displayed: true }, // A afficher dans le tableau de packets
            { title: 'serviceApid', displayed: true }, // Inutilisé dans la vue
            { title: 'packetName', displayed: true }, // A afficher dans le tableau de packets
            { title: 'serviceApidName', displayed: true }, // Inutilisé dans la vue
            { title: 'lastUpdateModeRid', displayed: true }, // Tooltip sur rid / ridLabel
            { title: 'lastUpdateTimeRid', displayed: true }, // Tooltip sur rid / ridLabel
            { title: 'rid', displayed: true }, // A afficher dans le tableau de packets
            { title: 'ridLabel', displayed: true }, // A afficher dans le tableau de packets
            { title: 'lastUpdateModeSid', displayed: true }, // Tooltip sur sid, sidLabel
            { title: 'lastUpdateTimeSid', displayed: true }, // Tooltip sur sid, sidLabel
            { title: 'lastUpdateModeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
            { title: 'lastUpdateTimeSubSamplingRatio', displayed: true }, // Tooltip sur subsamplingRatio
            { title: 'subsamplingRatio', displayed: true }, // A afficher dans le tableau de packets
            { title: 'sid', displayed: true }, // A afficher dans le tableau de packets
            { title: 'sidLabel', displayed: true }, // A afficher dans le tableau de packets
            { title: 'lastUpdateModeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
            { title: 'lastUpdateTimeTypeSubType', displayed: true }, // Tooltip sur serviceType, serviceSubType
            { title: 'serviceType', displayed: true }, // A afficher dans le tableau de packets
            { title: 'serviceSubType', displayed: true }, // A afficher dans le tableau de packets
            // { title: 'uniqueId', displayed: true }, // Inutilisé dans la vue
            { title: 'status', displayed: true }, // Non affiché dans la vue.  Si 3 (DELETED), supprimer l’entrée du state
          ],
        },
      },
    },
  },
  PUS14ViewData: {},
  PUS15ViewConfiguration: {
    pus15: {
      tables: {
        onBoardStorages: {
          name: 'On-Board Storages',
          sorting: {
            colName: 'serviceApidName',
            direction: 'DESC',
          },
          cols: [
            { label: 'Apid Name', title: 'serviceApidName', displayed: true },
            { label: 'Store ID', title: 'storeId', displayed: true },
            { label: 'HK Status Parameter', title: 'hkStoreStatusParameterName', displayed: true },
            { label: 'Dump Enabled', title: 'dumpEnabled', displayed: true },
            { label: 'Storage Status', title: 'storeStatus', displayed: true },
            { label: 'Downlink Status', title: 'downlinkStatus', displayed: true },
            { label: 'Type', title: 'storageType', displayed: true },
            { label: 'Name', title: 'storeName', displayed: true },
            { label: 'HK Downlink Status Param. Name', title: 'hkDownlinkStatusParameterName', displayed: true },
          ],
        },
        storageDef: {
          name: 'Storage Definitions',
          sorting: {
            colName: 'serviceApidName',
            direction: 'DESC',
          },
          cols: [
            { label: 'Apid Name', title: 'serviceApidName', displayed: true },
            { label: 'APID', title: 'packetApid', displayed: true },
            { label: 'AP. Name', title: 'packetApidName', displayed: true },
            { label: 'Type', title: 'serviceType', displayed: true },
            { label: 'SubType', title: 'serviceSubType', displayed: true },
            { label: 'SID', title: 'sid', displayed: true },
            { label: 'SID Label', title: 'sidLabel', displayed: true },
            { label: 'SID Name', title: 'sidName', displayed: true },
            { label: 'Sampling Ratio', title: 'subsamplingRatio', displayed: true },
          ],
        },
      },
    },
  },
  PUS15ViewData: {},
  PUSMMEViewConfiguration: {
    '9a057132-aa02-43b1-99e7-5d870a3af609': {
      entryPoints: [
        {
          connectedData: {
            apidName: 'TIMEPACKET,ORBIT,POWERMGT',
            apidRawValue: null,
            domain: 'fr.cnes.isis.simupus',
            formula: 'PusGroundModelDefinition.PusMmeModel<PusMmeModel>',
            session: '*',
            apids: [
              {
                apidName: 'TIMEPACKET',
                apidRawValue: '0',
              },
              {
                apidName: 'ORBIT',
                apidRawValue: '2',
              },
              {
                apidName: 'POWERMGT',
                apidRawValue: '3',
              },
            ],
            timeline: 'Session 1',
          },
          id: 'eee5f2d0-2cc4-4513-9a8a-f049b1631787',
          name: 'PUSMMEEP',
        },
      ],
      tables: {
        packets: {
          cols: [
            {
              displayed: true,
              title: 'sid',
            },
            {
              displayed: true,
              title: 'validityParameterId',
            },
            {
              displayed: true,
              title: 'validityParameterMask',
            },
            {
              displayed: true,
              title: 'validityParameterExpectedValue',
            },
            {
              displayed: true,
              title: 'collectionInterval',
            },
            {
              displayed: true,
              title: 'sidLabel',
            },
            {
              displayed: true,
              title: 'packetName',
            },
            {
              displayed: true,
              title: 'validityParameterName',
            },
            {
              displayed: true,
              title: 'packetApid',
            },
            {
              displayed: true,
              title: 'packetApidName',
            },
            {
              displayed: true,
              title: 'serviceApid',
            },
            {
              displayed: true,
              title: 'serviceApidName',
            },
            {
              displayed: true,
              title: 'generationMode',
            },
            {
              displayed: true,
              title: 'packetType',
            },
            {
              displayed: true,
              title: 'forwardingStatusTypeSubtype',
            },
            {
              displayed: true,
              title: 'forwardingStatusRidSid',
            },
            {
              displayed: true,
              title: 'subsamplingRatio',
            },
          ],
          name: 'Packets',
          sorting: {
            colName: 'sid',
            direction: 'DESC',
          },
        },
      },
    },
  },
  PUSMMEViewData: {},
  HistoryViewConfiguration: {
    hist1: {
      entryPoints: [{
        connectedData: {
          domain: 'fr.cnes.isis.simupus',
          formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>',
          timeline: 'Session 1',
          filter: [{
            field: 'rawValue',
            operator: '>',
            operand: '100',
          }],
        },
        id: 'hist1ep1',
        name: 'TMMGT_BC_VIRTCHAN3',
        stateColors: [],
      }, {
        connectedData: {
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          formula: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>',
          timeline: 'Session 1',
        },
        id: 'hist1ep2',
        name: 'ATT_BC_REVTCOUNT1',
        stateColors: [],
      }],
      sorting: {
        colName: 'extractedValue',
        direction: 'SORTING_UP',
      },
      allCols: ['convertedValue', 'extractedValue', 'groundDate', 'isNominal', 'isObsolete',
        'monitoringState', 'onboardDate', 'rawValue', 'referenceTimestamp', 'triggerOnCounter',
        'triggerOffCounter', 'validityState'],
      hiddenCols: [],
    },
  },
  HistoryViewData: {
    hist1: {
      cols: ['referenceTimestamp', 'extractedValue', 'rawValue', 'monitoringState'],
      lines: ['ATT_BC_REVTCOUNT1 100020', 'ATT_BC_REVTCOUNT1 200020', 'ATT_BC_REVTCOUNT1 300020',
        'ATT_BC_REVTCOUNT1 400020', 'ATT_BC_REVTCOUNT1 500020'],
      indexes: {
        ATT_BC_REVTCOUNT1: ['100020', '200020', '300020', '400020', '500020'],
      },
      data: {
        ATT_BC_REVTCOUNT1: {
          100020: {
            monitoringState: 'valid',
            masterTime: 100020,
            rawValue: 149.30028143545633,
            extractedValue: 149.30028143545633,
            referenceTimestamp: 100000,
          },
          200020: {
            monitoringState: 'valid',
            masterTime: 200020,
            rawValue: 154.3002814355,
            extractedValue: 154.3002814355,
            referenceTimestamp: 200000,
          },
          300020: {
            monitoringState: 'invalid',
            masterTime: 300020,
            rawValue: 159.3002814355,
            extractedValue: 159.3002814355,
            referenceTimestamp: 300000,
          },
          400020: {
            monitoringState: 'obsolete',
            masterTime: 400020,
            rawValue: 164.3002814355,
            extractedValue: 164.3002814355,
            referenceTimestamp: 400000,
          },
          500020: {
            monitoringState: 'valid',
            masterTime: 500020,
            rawValue: 169.3002814355,
            extractedValue: 169.3002814355,
            referenceTimestamp: 500000,
          },
        },
      },
    },
  },
  MimicViewConfiguration: {
    mimic1: {
      content: "<!-- HORIZONTAL GAUGE -->\n<g transform=\"translate(540,310)\">\n  <path d=\"M1,16 l200,0 l0,24 l-200,0 z\" style=\" fill:#DDD\" />\n  <g isis_animation=\"scaleX\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_fixed=\"left\">\n    <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\" isis_operators=\"&lt;=$118$#ddb065*&gt;$118$#b8835e\">\n      <path d=\"M1,16 l200,0 l0,24 l-200,0 z\" style=\" fill:#ddb065\" />\n    </g>\n  </g>\n  <g isis_animation=\"translateX\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_width=\"200\" isis_direction=\"right\">\n    <path d=\"M0,13 l3,0 l0,30 l-3,0 z\" style=\" fill: #666\" />\n  </g>\n  <text x=\"0\" y=\"4\" fill=\"#666\" style=\"font-size:10px\">117</text>\n  <text x=\"184\" y=\"4\" fill=\"#666\" style=\"font-size:10px\">120</text>\n  <text x=\"52\" y=\"4\" fill=\"#666\" style=\"font-weight:bold;font-size:11px;\">AGA_AM_PRIORITY</text>\n  <g isis_x=\"90\" isis_y=\"32\" isis_animation=\"textBox\" isis_ep=\"AGA_AM_PRIORITY\" isis_textcolor=\"0$#FFF\">-</g>\n</g>\n\n\n<!-- VERTICAL GAUGE -->\n<g transform=\"translate(40,100)\">\n  <path d=\"M26,1 l24,0 l0,200 l-24,0 z\" style=\" fill:#DDD\" />\n  <g isis_animation=\"scaleY\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_fixed=\"bottom\">\n    <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\" isis_operators=\"&lt;=$118$#96ceaa*&gt;$118$#78a388\">\n      <path d=\"M26,1 l24,0 l0,200 l-24,0 z\" style=\" fill:#96ceaa\" />\n    </g>\n  </g>\n  <g isis_animation=\"translateY\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_width=\"200\" isis_direction=\"top\">\n    <path d=\"M23,198 l0,3 l30,0 l0,-3 z\" style=\" fill: #666\" />\n  </g>\n  <text x=\"0\" y=\"200\" fill=\"#666\" style=\"font-size:10px\">117</text>\n  <text x=\"0\" y=\"6\" fill=\"#666\" style=\"font-size:10px\">120</text>\n  <text x=\"12\" y=\"150\" fill=\"#666\" style=\"font-weight:bold;font-size:11px;\" transform=\"rotate(-90, 12, 150)\">AGA_AM_PRIORITY</text>\n</g>\n\n\n<!-- HORIZONTAL SLIDER -->\n<g transform=\"translate(252,320)\">\n  <path d=\"M10,10 l200,0 l0,6 l-200,0 z\" style=\" fill: #DDD; stroke: #BBB;\" />\n  <g isis_animation=\"translateX\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_width=\"200\">\n    <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\" isis_operators=\"&lt;=$118$#EEE*&gt;$118$#F70*&gt;$119$#F11\">\n      <ellipse cx=\"10\" cy=\"13\" rx=\"8\" ry=\"8\" style=\"fill: #EEE; stroke: #BBB;\" />\n    </g>\n  </g>\n  <text x=\"2\" y=\"34\" fill=\"#666\" style=\"font-size:10px\">117</text>\n  <text x=\"192\" y=\"34\" fill=\"#666\" style=\"font-size:10px\">120</text>\n  <text x=\"54\" y=\"34\" fill=\"#666\" style=\"font-weight:bold;font-size:11px;\">AGA_AM_PRIORITY</text>\n</g>\n\n\n<!-- VERTICAL SLIDER -->\n<g transform=\"translate(140,90)\">\n  <path d=\"M28,10 l6,0 l0,200, l-6,0 z\" style=\" fill: #DDD; stroke: #BBB;\" />\n  <g isis_animation=\"translateY\" isis_ep=\"AGA_AM_PRIORITY\" isis_domain=\"117,120\" isis_width=\"200\" isis_direction=\"top\">\n    <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\" isis_operators=\"&lt;=$118$#EEE*&gt;$118$#F70*&gt;$119$#F11\">\n      <ellipse cx=\"31\" cy=\"210\" rx=\"8\" ry=\"8\" style=\"fill: #EEE; stroke: #BBB;\" />\n    </g>\n  </g>\n  <text x=\"0\" y=\"212\" fill=\"#666\" style=\"font-size:10px\">117</text>\n  <text x=\"0\" y=\"14\" fill=\"#666\" style=\"font-size:10px\">120</text>\n  <text x=\"14\" y=\"160\" fill=\"#666\" style=\"font-weight:bold;font-size:11px;\" transform=\"rotate(-90, 14, 160)\">AGA_AM_PRIORITY</text>\n</g>\n\n\n<!-- DIODE -->\n\n<g isis_animation=\"show\" isis_ep=\"AGA_AM_PRIORITY\" isis_thresholds=\"<=$119$show;>$119$hide;<$118$hide\">\n  <g transform=\"translate(560,-770)\">\n    <path style=\"fill:#000;fill-rule:evenodd;stroke:#000;stroke-width:4;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" d=\"m 0.09962822,952.36218 59.19999778,0\" id=\"path3782\" />\n    <path id=\"path3788\" d=\"m 141.10364,952.36218 58.8264,0\" style=\"fill:#000;fill-rule:evenodd;stroke:#000;stroke-width:4;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n    <path style=\"fill:#fff;stroke:#000000;stroke-width:3.99281930999999980;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"path2998\" d=\"M 105.22681,50 63.8067,73.913909 22.386597,97.827818 l 0,-47.827819 0,-47.8278165 41.420106,23.9139095 z\"\n      transform=\"matrix(1,0,0,1.0036,38.749817,902.18218)\" />\n    <rect style=\"fill:#000;fill-opacity:1;stroke:#000;stroke-width:4;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"rect3016\" width=\"12.835206\" height=\"96\" x=\"145\" y=\"904.36218\" />\n  </g>\n</g>\n\n\n<!-- TRANSISTOR -->\n<g isis_animation=\"show\" isis_ep=\"AGA_AM_PRIORITY\" isis_thresholds=\"<=$118$show;>$118$hide\">\n  <g id=\"layer1\" transform=\"translate(550,-770)\">\n    <path style=\"fill:none;stroke:#000000;stroke-width:5.83175421;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"path2987\" d=\"m 200,100 a 100,100 0 1 1 -200,0 100,100 0 1 1 200,0 z\" transform=\"matrix(0.857375,0,0,0.857375,14.2625,866.62468)\"\n    />\n    <rect style=\"fill:#000000;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;fill-opacity:1\" id=\"rect3757\" width=\"15\" height=\"100\" x=\"50\" y=\"50\" transform=\"translate(0,852.36218)\" />\n    <path style=\"fill:#000000;fill-rule:evenodd;stroke:#000000;stroke-opacity:1;stroke-width:5;stroke-miterlimit:4;stroke-dasharray:none\" d=\"m 0,100 45,0 5,0\" id=\"path3759\" transform=\"translate(0,852.36218)\" />\n    <path style=\"fill:none;fill-rule:evenodd;stroke:#000000;stroke-opacity:1;stroke-width:5;stroke-miterlimit:4;stroke-dasharray:none\" d=\"M 55,90 150,50 150,0\" id=\"path3765\" transform=\"translate(0,852.36218)\" />\n    <path id=\"path3777\" d=\"m 55,962.36218 95,40.00002 0,50\" style=\"fill:none;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n    <path style=\"fill:#000000;fill-opacity:1;stroke:none\" id=\"path3783\" d=\"M 130,125 118.16987,121.83013 106.33975,118.66025 115,110 l 8.66025,-8.66025 3.16988,11.83012 z\" transform=\"matrix(0.9519072,-0.30638649,0.30638649,0.9519072,-27.062848,917.63429)\"\n    />\n  </g>\n</g>\n\n\n<!-- CIRCUIT BREAKER -->\n<g isis_animation=\"show\" isis_ep=\"AGA_AM_PRIORITY\" isis_thresholds=\"<$119$hide;>=$119$show\">\n  <g transform=\"translate(550,-770)\">\n    <rect style=\"fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" id=\"rect3780\" width=\"155.00168\" height=\"56.170212\" x=\"22.499161\" y=\"924.2771\" />\n    <path style=\"fill:#000000;fill-rule:evenodd;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1\" d=\"m 0,100 20,0\" transform=\"translate(0,852.36218)\" />\n    <path d=\"m 180,952.36218 20,0\" style=\"fill:#000000;fill-rule:evenodd;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n    <path style=\"fill:#000000;fill-rule:evenodd;stroke:#000000;stroke-opacity:1;stroke-width:5;stroke-miterlimit:4;stroke-dasharray:none\" d=\"m 50,70 0,60\" id=\"path3794\" transform=\"translate(0,852.36218)\" />\n    <path id=\"path3800\" d=\"m 150,922.36218 0,60\" style=\"fill:#000000;fill-rule:evenodd;stroke:#000000;stroke-width:5;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none\" />\n  </g>\n</g>\n\n<!-- KNOBE -->\n<g transform=\"translate(260,90)\">\n  <circle r=\"80\" cx=\"100\" cy=\"100\" stroke=\"#FDE47F\" transform=\"rotate(126, 100, 100)\" stroke-width=\"10\" fill=\"none\" stroke-dasharray=\"402\"></circle>\n  <g isis_animation='rotate' isis_ep='AGA_AM_PRIORITY' isis_domain='117,121' isis_angle='292' isis_center='100,100'>\n    <path d=\"M100,30 l6,70 q-6,6 -12,0 z\" style=\"fill: #666\" transform=\"rotate(-146, 100, 100)\" />\n  </g>\n  <text x=\"50\" y=\"130\" fill=\"#999\" style=\"font-weight:bold;font-size:11px;\">AGA_AM_PRIORITY</text>\n  <text x=\"14\" y=\"170\" fill=\"#999\" style=\"font-weight:bold;font-size:11px\">117</text>\n  <text x=\"92\" y=\"8\" fill=\"#999\" style=\"font-weight:bold;font-size:11px\">119</text>\n  <text x=\"168\" y=\"170\" fill=\"#999\" style=\"font-weight:bold;font-size:11px\">121</text>\n</g>\n\n<!-- DIGITAL DISPLAY -->\n<g transform=\"translate(350,60)\">\n  <g isis_x=\"0\" isis_y=\"0\" isis_animation=\"textBox\" isis_ep=\"AGA_AM_PRIORITY\" isis_textcolor=\"0$#0C0;119$#E00\" isis_font=\"Digital\" isis_size=\"96px\">-</g>\n</g>\n\n\n<!-- TEXT BOX -->\n<g transform=\"translate(580,40)\">\n  <g isis_x=\"0\" isis_y=\"0\" isis_animation=\"textBox\" isis_ep=\"AGA_AM_PRIOR_MS\" isis_size=\"32\" isis_textcolor_regex=\"info=#00F|warning=#daa520|outOfRange=#14bfb2|severe=#f80|critical=#f00|obsol=#d0a0ff\">-</g>\n</g>\n\n<!-- Multistate switch -->\n<g transform=\"translate(40,0)\">\n\n  <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\" isis_operators=\"&lt;$118$#28f42b*&gt;=$118$#EEE\">\n    <circle cx=\"30\" cy=\"12\" r=\"10\" stroke=\"#444\" stroke-width=\"2\" fill=\"#EEE\" />\n  </g>\n  <text x=\"20\" y=\"44\" fill=\"#666\" style=\"font-size:12px\">St 1</text>\n  <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\"  isis_operators=\"&lt;$118$#EEE*&gt;=$118$#28f42b*&gt;=$119$#EEE\">\n    <circle cx=\"80\" cy=\"12\" r=\"10\" stroke=\"#444\" stroke-width=\"2\" fill=\"#EEE\" />\n  </g>\n  <text x=\"70\" y=\"44\" fill=\"#666\" style=\"font-size:12px\">St 2</text>\n  <g isis_animation=\"colour\" isis_ep=\"AGA_AM_PRIORITY\"  isis_operators=\"&lt;$119$#EEE*&gt;=$119$#28f42b\">\n    <circle cx=\"130\" cy=\"12\" r=\"10\" stroke=\"#444\" stroke-width=\"2\" fill=\"#EEE\" />\n  </g>\n  <text x=\"120\" y=\"44\" fill=\"#666\" style=\"font-size:12px\">St 3</text>\n</g>",
      entryPoints: [{
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [{
            field: 'raw',
            operator: '>',
            operand: '100',
          }],
          format: 'decimal',
          formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>.extractedValue',
          timeline: 'Session 1',
          unit: 'V',
        },
        id: 'mimic1ep1',
        name: 'TMMGT_BC_VIRTCHAN3',
      }, {
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.extractedValue',
          timeline: 'Session 1',
          unit: 'V',
        },
        id: 'mimic1ep2',
        name: 'AGA_AM_PRIORITY',
      }, {
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.monitoringState',
          timeline: 'Session 1',
          unit: '',
        },
        id: 'mimic1ep3',
        name: 'AGA_AM_PRIOR_MS',
      }],
    },
  },
  MimicViewData: {
    mimic1: {
      index: {
        AGA_AM_PRIORITY: 399920,
        AGA_AM_PRIOR_MS: 399900,
        TMMGT_BC_VIRTCHAN3: 399980,
      },
      values: {
        AGA_AM_PRIORITY: {
          color: '#FF0000',
          value: 119.31828185696496,
        },
        AGA_AM_PRIOR_MS: {
          color: '#FF0000',
          value: 'severe',
        },
        TMMGT_BC_VIRTCHAN3: {
          value: 139.30028143545633,
        },
      },
    },
  },
  PacketViewConfiguration: {},
  PacketViewData: {},
  PlotViewConfiguration: {
    plot1: {
      axes: {
        VBat: {
          autoLimits: false,
          autoTick: false,
          id: 'VBat',
          label: 'VBat',
          logSettings: {
            base: 10,
            max: 1000000000,
            min: 0.1,
          },
          logarithmic: false,
          max: 300,
          min: -300,
          showAxis: true,
          showLabels: true,
          showTickLabels: true,
          showTicks: true,
          style: {
            align: 'left',
            bold: false,
            color: '#000000',
            font: 'Arial',
            italic: false,
            size: 12,
            strikeOut: false,
            underline: false,
          },
          tickStep: 50,
          unit: 'V',
        },
        time: {
          autoLimits: true,
          autoTick: true,
          id: 'time',
          label: 'Time',
          logSettings: {
            base: 10,
            max: 1000000000,
            min: 0.1,
          },
          logarithmic: false,
          max: 10,
          min: 0,
          showAxis: true,
          showLabels: true,
          showTickLabels: true,
          showTicks: true,
          style: {
            align: 'left',
            bold: false,
            color: '#000000',
            font: 'Arial',
            italic: false,
            size: 12,
            strikeOut: false,
            underline: false,
          },
          tickStep: 0.5,
          unit: 's',
        },
      },
      entryPoints: [
        {
          connectedData: {
            axisId: 'VBat',
            digits: 5,
            domain: 'fr.cnes.isis.simupus',
            fieldX: 'groundDate',
            filter: [{
              field: 'extractedValue',
              operand: '100',
              operator: '<',
            }],
            format: 'decimal',
            formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>.extractedValue',
            timeline: 'Session 1',
            unit: 'V',
          },
          id: 'plot1ep1',
          name: 'TMMGT_BC_VIRTCHAN3',
          objectStyle: {
            curveColor: '#FFBF00',
            line: {
              size: 2,
              style: 'Continuous',
            },
            points: {
              size: 0,
              style: 'None',
            },
          },
          stateColors: [{
            color: '#000000',
            condition: {
              field: 'monitoringState',
              operand: 'waiting',
              operator: '=',
            },
          }],
          timeBasedData: true,
        }, {
          connectedData: {
            axisId: 'VBat',
            digits: 5,
            domain: 'fr.cnes.isis.simupus',
            fieldX: 'groundDate',
            filter: [],
            format: 'decimal',
            formula: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>.extractedValue',
            timeline: 'Session 1',
            unit: 'V',
          },
          id: 'plot1ep2',
          name: 'ATT_BC_REVTCOUNT1',
          objectStyle: {
            curveColor: '#ff9800',
            line: {
              size: 3,
              style: 'Continuous',
            },
            points: {
              size: 3,
              style: 'None',
            },
          },
          stateColors: [],
          timeBasedData: true,
        }, {
          connectedData: {
            axisId: 'VBat',
            digits: 5,
            domain: 'fr.cnes.isis.simupus',
            fieldX: 'groundDate',
            filter: [],
            format: 'decimal',
            formula: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>.extractedValue',
            timeline: 'Session Offset',
            unit: 'V',
          },
          id: 'plot1ep3',
          name: 'ATT_BC_REVTCOUNT1_Offset',
          objectStyle: {
            curveColor: '#ff9800',
            line: {
              size: 3,
              style: 'Continuous',
            },
            points: {
              size: 3,
              style: 'None',
            },
          },
          stateColors: [],
          timeBasedData: true,
        }],
      grids: [{
        line: {
          size: 1,
          style: 'Continuous',
        },
        showGrid: true,
        xAxisId: 'time',
        yAxisId: 'VBat',
      }],
      legend: {
        location: 'top',
        style: {
          align: 'left',
          bold: false,
          color: '#000000',
          font: 'Arial',
          italic: false,
          size: 12,
          strikeOut: false,
          underline: false,
        },
      },
      markers: [{
        kind: 'Text',
        label: 'VBAT',
        relativePosX: 5.6,
        relativePosY: 8.9,
        style: {
          align: 'left',
          bold: false,
          color: '#000000',
          font: 'Arial',
          italic: false,
          size: 12,
          strikeOut: false,
          underline: true,
        },
      }],
      search: '',
      showLegend: false,
      showYAxes: 'left',
    },
    plotCollapsed: {
      axes: {
        time: {
          autoTick: true,
          id: 'time',
          label: 'Time',
          showTicks: true,
          style: {
            align: 'center',
            font: 'Arial',
            size: 12,
          },
          tickStep: 0.5,
        },
        ep_1: {
          autoLimits: true,
          autoTick: true,
          id: 'ep_1',
          label: 'ep1',
          logSettings: {
            base: 10,
            max: 1000000000,
            min: 0.1,
          },
          logarithmic: false,
          max: 300,
          min: -300,
          showAxis: true,
          showLabels: true,
          unit: 'v',
        },
      },
      entryPoints: [{
        axisId: '',
        connectedData: {
          axisId: 'ep_1',
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          fieldX: 'onboardDate',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>.extractedValue',
          timeline: 'Session 1',
          unit: 'V',
        },
        id: 'plotCollapsedep1',
        name: 'ep1',
        objectStyle: {
          curveColor: '#cddc39',
          line: {
            size: 3,
            style: 'Continuous',
          },
          points: {
            size: 3,
            style: 'None',
          },
        },
        stateColors: [],
        unit: '',
      }],
      grids: [{
        line: {
          size: 1,
          style: 'Dashed',
        },
        showGrid: true,
      }],
      legend: {
        location: 'bottom',
      },
      markers: [],
      showLegend: false,
      showYAxes: 'left',
      search: '',
    },
  },
  PlotViewData: {
    plot1: {
      indexes: {
        TMMGT_BC_VIRTCHAN3: [100020, 200020, 300020, 400020, 500020],
        ATT_BC_REVTCOUNT1: [100020, 200020, 300020, 400020, 500020],
      },
      lines: {
        TMMGT_BC_VIRTCHAN3: {
          100020: {
            color: 'darkred',
            masterTime: 100020,
            symbol: 139.30028143545633,
            value: 139.30028143545633,
            x: 100000,
          },
          200020: {
            color: 'blue',
            masterTime: 200020,
            symbol: 144.3002814355,
            value: 144.3002814355,
            x: 200000,
          },
          300020: {
            color: 'green',
            masterTime: 300020,
            symbol: 149.3002814355,
            value: 149.3002814355,
            x: 300000,
          },
          400020: {
            color: 'green',
            masterTime: 400020,
            symbol: 154.3002814355,
            value: 154.3002814355,
            x: 400000,
          },
          500020: {
            color: 'green',
            masterTime: 500020,
            symbol: 159.3002814355,
            value: 159.3002814355,
            x: 500000,
          },
        },
        ATT_BC_REVTCOUNT1: {
          100020: {
            color: 'darkred',
            masterTime: 100020,
            symbol: 149.30028143545633,
            value: 149.30028143545633,
            x: 100000,
          },
          200020: {
            color: 'blue',
            masterTime: 200020,
            symbol: 154.3002814355,
            value: 154.3002814355,
            x: 200000,
          },
          300020: {
            color: 'green',
            masterTime: 300020,
            symbol: 159.3002814355,
            value: 159.3002814355,
            x: 300000,
          },
          400020: {
            color: 'green',
            masterTime: 400020,
            symbol: 164.3002814355,
            value: 164.3002814355,
            x: 400000,
          },
          500020: {
            color: 'green',
            masterTime: 500020,
            symbol: 169.3002814355,
            value: 169.3002814355,
            x: 500000,
          },
        },
      },
      max: {
        TMMGT_BC_VIRTCHAN3: 159.30028143545633,
        ATT_BC_REVTCOUNT1: 169.3002814355,
      },
      maxTime: {
        TMMGT_BC_VIRTCHAN3: 500020,
        ATT_BC_REVTCOUNT1: 500020,
      },
      min: {
        TMMGT_BC_VIRTCHAN3: 139.30028143545633,
        ATT_BC_REVTCOUNT1: 149.30028143545633,
      },
      minTime: {
        TMMGT_BC_VIRTCHAN3: 100020,
        ATT_BC_REVTCOUNT1: 100020,
      },
    },
  },
  TextViewConfiguration: {
    text1: {
      content: "<style>  .myTextView {float: left; font-size: 1.2rem; }  .myTextView .myContener { background-color: #0f1051; margin-top: 4px; margin-left: 6px; padding:2px; float: left; border-radius: 1px; border: 1px ridge #0f0041; height: 51px; width: 180px; }  .myContener .name {display: block;  overflow: hidden; background-color: white; color: black; font-weight: bolder; font-size: 11px; padding: 2px; text-align: center;}  .myContener .value { text-align: center; display: block; overflow: hidden; background-color: #0f0041; color: #00ff00; font-weight: bold; padding: 10px; margin-bottom: 10px; }</style><div class='myTextView'>    <div class='myContener'><span class='name'>AGA_AM_PRIORITY</span><span class='value'>{{AGA_AM_PRIORITY}}</span></div>    <div class='myContener'><span class='name'>TMMGT_BC_VIRTCHAN3</span><span class='value'>{{TMMGT_BC_VIRTCHAN3}}</span></div></div>",
      entryPoints: [{
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.extractedValue',
          timeline: 'Session 1',
          unit: 'V',
        },
        id: 'text1ep1',
        name: 'AGA_AM_PRIORITY',
      }, {
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.AGA_AM_PRIORITY<ReportingParameter>.extractedValue',
          timeline: 'Session Offset',
          unit: 'V',
        },
        id: 'text1ep10',
        name: 'AGA_AM_PRIOR_OFFSET',
      }, {
        connectedData: {
          digits: 5,
          domain: 'fr.cnes.isis.simupus',
          filter: [],
          format: 'decimal',
          formula: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>.extractedValue',
          timeline: 'Session 1',
          unit: 'V',
        },
        id: 'text1ep2',
        name: 'TMMGT_BC_VIRTCHAN3',
      }, {
        connectedData: {
          digits: 5,
          domain: '*',
          filter: [],
          format: 'decimal',
          formula: '',
          timeline: '*',
          unit: 's',
        },
        id: 'text1ep3',
        name: 'TMMGT_AC_APP',
      }],
      search: '',
    },
  },
  TextViewData: {
    text1: {
      index: {
        AGA_AM_PRIORITY: 499900,
        TMMGT_BC_VIRTCHAN3: 499920,
      },
      values: {
        AGA_AM_PRIORITY: {
          color: '#FF0000',
          value: 119.31828185696496,
        },
        TMMGT_BC_VIRTCHAN3: {
          value: 139.30028143545633,
        },
      },
    },
  },
  codeEditor: {
    viewId: null,
  },
  domains: [
    {
      domainId: 1,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis',
      oid: '0051525005151000565215465660515',
      parentDomainId: 0,
    }, {
      domainId: 4,
      itemNamespace: 'Domains',
      name: 'fr.cnes.isis.simupus',
      oid: '0051525005151000565215465660515',
      parentDomainId: 1,
    },
  ],
  form: {},
  health: {
    dcStatus: 'HEALTHY',
    hssStatus: 'HEALTHY',
    lastPubSubTimestamp: null,
    mainStatus: 'HEALTHY',
    stress: {
      main: false,
      server: false,
      window: false,
    },
    windowsStatus: {
      myWindow: 'HEALTHY',
    },
  },
  hsc: {
    file: 'dev.workspace.viws',
    focusWindow: 'myWindow',
    folder: '/mydata/data',
    forecast: {},
    isModified: true,
    isWorkspaceOpening: false,
    lastCacheInvalidation: 1501244084031,
    sessionName: 'Master',
    playingTimebarId: null,
    windowsOpened: true,
  },
  inspector: {
    generalData: {
      dataId: null,
      displayingTM: false,
      epId: null,
      epName: null,
      field: null,
      viewId: null,
      viewType: null,
    },
    staticData: null,
  },
  knownRanges: {
    'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::extractedValue.<.100:': {
      flatDataId: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4::extractedValue.<.100:',
      filters: [{
        field: 'extractedValue',
        operand: '100',
        operator: '<',
      }],
      intervals: [[2, 6], [100000, 500000]],
    },
    'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:::': {
      flatDataId: 'Reporting.TMMGT_BC_VIRTCHAN3<ReportingParameter>:0:4:::',
      intervals: [[90000, 490000]],
    },
    'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1:::': {
      flatDataId: 'Reporting.ATT_BC_REVTCOUNT1<ReportingParameter>:0:1::extractedValue.=.2:',
      filters: [{ field: 'extractedValue', operator: '=', operand: '2' }],
      intervals: [[0, 60], [100000, 500000]],
    },
  },
  ObsoleteEvents: {
    'TMMGT_BC_VIRTCHAN3:0:4:::': {
      flatDataId: 'TMMGT_BC_VIRTCHAN3:0:4:::',
      filters: [],
      intervals: [[2, 6], [100000, 500000]],
    },
    'ATT_BC_REVTCOUNT1:0:1:::': {
      flatDataId: 'ATT_BC_REVTCOUNT1:0:1:::',
      filters: [],
      intervals: [[0, 60], [100000, 500000]],
    },
  },
  masterSession: {
    sessionId: 0,
  },
  messages: {
    global: [],
  },
  modals: {
    myWindow: {
      opened: false,
      type: 'addEntryPoint',
      viewId: 'plotCollapsed',
      viewType: 'PlotView',
    },
  },
  pages: {
    page1: {
      absolutePath: '/mydata/data/pages/dev.page1.json',
      domainName: 'fr.cnes.isis.simupus',
      isModified: true,
      layout: [
        {
          h: 3,
          i: 'text1',
          maxH: 100,
          maxW: 100,
          w: 6,
          x: 0,
          y: 0,
        }, {
          h: 24,
          i: 'plot1',
          maxH: 100,
          maxW: 100,
          w: 6,
          x: 6,
          y: 0,
        }, {
          h: 8,
          i: 'dynamic1',
          w: 6,
          x: 0,
          y: 16,
        }, {
          collapsed: false,
          h: 13,
          i: 'mimic1',
          maximized: false,
          w: 6,
          x: 0,
          y: 3,
        }, {
          h: 5,
          i: 'plotCollapsed',
          w: 5,
          x: 0,
          y: 0,
          collapsed: true,
        },
      ],
      panels: {
        editorIsMinimized: true,
        editorWidth: 250,
        explorerIsMinimized: false,
        explorerWidth: 250,
        timebarHeight: 130,
        timebarIsMinimized: false,
        editorViewId: 'plotCollapsed',
        explorerTab: 'store',
      },
      path: 'pages/dev.page1.json',
      properties: [],
      sessionName: 'Master',
      timebarCollapsed: false,
      timebarHeight: 135,
      timebarUuid: 'tb1',
      title: 'Local page',
      type: 'Page',
      uuid: 'page1',
      views: [
        'text1',
        'plot1',
        'dynamic1',
        'mimic1',
        'plotCollapsed',
        'hist1',
        'groundAlarm1',
        'pus11',
      ],
    },
  },
  rte: {
    catalogs: {},
    domains: [],
    focusedInfo: {
      catalog: '',
      domain: '',
      name: '',
      namespace: '',
      session: '',
      version: '',
    },
    focusedItem: null,
    itemNames: {},
    openedItems: {},
    sessions: [],
  },
  sessions: [
    {
      id: 0,
      name: 'Master',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    }, {
      id: 42,
      name: 'Session #42',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    }, {
      id: 181,
      name: 'Session# 181',
      timestamp: {
        ms: 1420106890818,
        ps: 0,
      },
    },
  ],
  timebarTimelines: {
    tb1: ['tl1', 'tlOffset'],
  },
  timebars: {
    tb1: {
      id: 'TB1',
      masterId: 'Session 1',
      mode: 'Normal',
      realTime: false,
      rulerResolution: 1500,
      rulerStart: 80000,
      slideWindow: {
        lower: 100000,
        upper: 500000,
      },
      speed: 1,
      uuid: 'tb1',
      visuWindow: {
        lower: 100000,
        upper: 500000,
        current: 400000,
        defaultWidth: 900000,
      },
    },
  },
  timelines: {
    tl1: {
      color: null,
      id: 'Session 1',
      kind: 'Session',
      offset: 0,
      sessionName: 'Master',
      uuid: 'tl1',
    },
    tlOffset: {
      color: null,
      id: 'Session Offset',
      kind: 'Session',
      offset: 10000,
      sessionName: 'Master',
      uuid: 'tlOffset',
    },
    truc: {
      color: null,
      id: 'Session du bois',
      kind: 'Session',
      offset: 10000,
      sessionName: 'Session# 181',
      uuid: 'tlOffset',
    },
  },
  ui: {
    dialog: {},
    editor: {},
  },
  views: {
    plot1: {
      absolutePath: '/mydata/data/views/plot.json',
      backgroundColor: '#FFFFFF',
      defaultRatio: {
        length: 50,
        width: 50,
      },
      domainName: '*',
      isModified: false,
      links: [{
        name: 'page4',
        path: './pages/page4.json',
      }],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/plot.json',
      procedures: [],
      showLinks: false,
      title: 'Plot view',
      titleStyle: {
        align: 'center',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'PlotView',
      uuid: 'plot1',
      sampling: {
        samplingLock: 'off',
        samplingStatus: 'off',
        zoomState: 'out',
      },
    },
    text1: {
      absolutePath: '/mydata/data/views/text.json',
      defaultRatio: {
        length: 5,
        width: 5,
      },
      isModified: false,
      links: [{
        name: 'page.exe2.workspace',
        path: '/mydata/data/pages/pbf.page.json',
      }, {
        name: 'view.pbf.plot',
        path: '/mydata/data/views/pbf.text.json',
      }],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/text.json',
      showLinks: false,
      title: 'New Text View',
      titleStyle: {
        align: 'center',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'TextView',
      uuid: 'text1',
    },
    mimic1: {
      absolutePath: '/mydata/data/views/mimic.json',
      defaultRatio: {
        length: 5,
        width: 5,
      },
      isModified: false,
      links: [],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/mimic.json',
      showLinks: false,
      title: 'New Mimic View',
      titleStyle: {
        align: 'center',
        color: '#FFFFF',
        underline: true,
      },
      type: 'MimicView',
      uuid: 'mimic1',
    },
    dynamic1: {
      absolutePath: '/mydata/data/views/dynamicView.json',
      defaultRatio: {
        length: 5,
        width: 3,
      },
      domainName: 'fr.cnes.isis.simupus',
      isModified: false,
      links: [],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/dynamicView.json',
      sessionName: 'Master',
      showLinks: false,
      title: 'Dynamic view',
      titleStyle: {
        align: 'center',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'DynamicView',
      uuid: 'dynamic1',
    },
    groundAlarm1: {
      absolutePath: '/mydata/data/views/ground-alarm.viga',
      defaultRatio: {
        length: 5,
        width: 5,
      },
      isModified: false,
      links: [],
      pageFolder: '/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/data/pages',
      path: '/mydata/data/views/ground-alarm.viga',
      showLinks: 'false',
      title: 'Ground Alarm View',
      titleStyle: {
        align: 'center',
        bgColor: '#E91E63',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'GroundAlarmView',
      uuid: 'groundAlarm1',
    },
    hist1: {
      absolutePath: '/mydata/data/views/historyView.json',
      defaultRatio: {
        length: 5,
        width: 3,
      },
      domainName: 'fr.cnes.isis.simupus',
      isModified: false,
      links: [],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/historyView.json',
      sessionName: 'Master',
      showLinks: false,
      title: 'History view',
      titleStyle: {
        align: 'center',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'HistoryView',
      uuid: 'hist1',
      stateColors: [{
        color: '#000000',
        condition: {
          field: 'monitoringState',
          operand: 'waiting',
          operator: '=',
        },
      }],
    },
    pus11: {
      absolutePath: '/mydata/data/views/pus11.json',
      defaultRatio: {
        length: 5,
        width: 3,
      },
      domainName: 'fr.cnes.isis.simupus',
      isModified: false,
      links: [],
      pageFolder: '/mydata/data/pages',
      path: '/mydata/data/views/pus11.json',
      sessionName: 'Master',
      showLinks: false,
      title: 'Pus 11',
      titleStyle: {
        align: 'center',
        bold: false,
        color: '#ffffff',
        font: 'Arial',
        italic: false,
        size: 12,
        strikeOut: false,
        underline: true,
      },
      type: 'PUS11View',
      uuid: 'pus11',
      stateColors: [{
        color: '#000000',
        condition: {
          field: 'monitoringState',
          operand: 'waiting',
          operator: '=',
        },
      }],
    },
    plotCollapsed: {
      backgroundColor: '#FFFFFF',
      defaultRatio: {
        length: 5,
        width: 5,
      },
      isModified: true,
      links: [],
      showLinks: false,
      title: 'minimized plot view',
      type: 'PlotView',
      uuid: 'plotCollapsed',
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
    },
  },
  windows: {
    myWindow: {
      displayHelp: false,
      focusedPage: 'page1',
      geometry: {
        h: 820,
        kind: 'Absolute',
        w: 1596,
        x: 2,
        y: 51,
      },
      isLoaded: true,
      minimized: false,
      pages: ['page1'],
      title: 'Development workspace',
      type: 'documentWindow',
      uuid: 'myWindow',
    },
  },
};
