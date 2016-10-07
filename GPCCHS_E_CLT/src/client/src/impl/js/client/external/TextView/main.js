const schema = require('./TextView.schema.json');
const common = require('../common');
const _ = require('lodash');

module.exports = {
  getSchemaJson: () => schema,
  getConnectedDataFromViewDocument: function(viewContent) { // TODO aleal missing test
    const cdList = [];
    if (_.has(viewContent, 'configuration')) {
      _.forEach(viewContent.configuration.textViewEntryPoints, (value, index, source) => {
        const data = common.moveConnectedData(value.connectedData);
        cdList.push(data.dataToStore);
        source[index].connectedData = data.connectedData; // eslint-disable-line no-param-reassign
      });
    }
    return cdList;
  },
  getConnectedDataFromState: function(state, viewId) {
    const entryPoints = _.get(state, `views.${viewId}.configuration.textViewEntryPoints`);
    if (!entryPoints || !entryPoints.length) {
      return [];
    }

    const connectedData = _.get(state, 'connectedData');
    if (!connectedData || !Object.keys(connectedData).length) {
      return [];
    }

    const connectedDataIds = [];
    _.each(entryPoints, ep => {
      if (!ep) {
        return;
      }

      if (ep.connectedData && ep.connectedData.uuid) {
        connectedDataIds.push(ep.connectedData.uuid);
      }
    });

    return _.reduce(connectedDataIds, (list, id) => {
      return connectedData[id]
        ? list.concat(connectedData[id])
        : list;
    } , []);
  },
  getUsedValues: function(stateLocalId, field, visuWindow, offset, remoteIdPayload) {
    const current = visuWindow.current - offset;

    let final;
    if (stateLocalId) {
      final = Object.assign({}, stateLocalId);
    } else {
      final = { data: {}, index: []};
    }

    _.each(remoteIdPayload, (val, time) => {
      if (time <= current) {
        const oldTime = _.head(Object.keys(final.data));
        if (!oldTime || oldTime < time) {
          final.data = {};
          final.data[time] = val[field] ;
          final.index = [ time ];
        }
      }
    });
    return final;
  }
};
