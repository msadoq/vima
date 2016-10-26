const debug = require('../io/debug')('models:subscriptions');
const database = require('../io/loki');
const {
  remove: _remove,
  values: _values,
  assign: _assign,
  keys: _keys,
  omit: _omit,
} = require('lodash');
const flattenDataId = require('../utils/flattenDataId');

const collection = database.addCollection('subscriptions',
  {
    unique: 'flatDataId',
  }
);

collection.getFlatDataIdIndex = () => collection.constraints.unique.flatDataId;

collection.getAll = () => _remove(_values(collection.getFlatDataIdIndex().keyMap), undefined);

collection.getByDataId = dataId => collection.by('flatDataId', flattenDataId(dataId));

collection.addFilters = (dataId, filters, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  debug.debug('before update', sub);
  sub.filters = _assign({}, sub.filters, filters);
  debug.debug('update', sub);
  // collection.update(subscription);
  // TODO This update operation could be not needed
  return sub;
};

collection.getRemoteIds = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  return _keys(sub.filters);
};

collection.getFilters = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  return sub.filters;
};

collection.addRecord = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  const subscription = collection.by('flatDataId', flatDataId);
  if (typeof subscription !== 'undefined') {
    return subscription;
  }
  debug.debug('insert', dataId);
  return collection.insert({
    flatDataId,
    dataId,
    filters: {},
  });
};

collection.removeByDataId = (dataId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return;
    }
  }

  collection.remove(sub);
};

collection.exists = (dataId) => {
  const flatDataId = flattenDataId(dataId);
  if (!collection.by('flatDataId', flatDataId)) {
    return false;
  }
  return true;
};

collection.removeRemoteId = (dataId, remoteId, subscription) => {
  let sub = subscription;
  if (!sub) {
    const flatDataId = flattenDataId(dataId);
    sub = collection.by('flatDataId', flatDataId);
    if (!sub) {
      return undefined;
    }
  }
  sub.filters = _omit(sub.filters, remoteId);
  // collection.update(subscription);
  // TODO This update operation could be not needed
  return sub;
};

collection.cleanup = () => {
  debug.debug('subscription cleared');
  collection.clear();
  collection.getFlatDataIdIndex().clear();
};

module.exports = collection;
