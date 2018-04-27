/* eslint-disable quote-props */
// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6127 : 12/04/2017 : Prepare minimalistic HistoryView . .
// VERSION : 2.0.0 : DM : #7111 : 20/09/2017 : Add editor in history view data and fix history view
//  data reducer
// END-HISTORY
// ====================================================================

import _ from 'lodash/fp';
import { v4 } from 'uuid';

const getDefaultView = _.merge({
  type: 'HistoryView',
  defaultRatio: { length: 5, width: 5 },
  links: [],
  title: 'New History View',
  configuration: {
    entryPoints: [],
    tables: [
      {
        sorting: {
          colName: 'referenceTimestamp',
          direction: 'DESC',
        },
        dataOffset: 0,
        maxDisplayedRows: 1000,
        columns: [
          [
            'default',
            [
              { field: 'referenceTimestamp', isDisplayed: true },
              { field: 'epName', isDisplayed: true },
              { field: 'unit', isDisplayed: true },
            ],
          ],
        ],
      },
    ],
  },
});

export default _.pipe(
  getDefaultView,
  _.update('configuration.entryPoints', _.map(_.update('id', v4)))
);
