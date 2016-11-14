const debug = require('../io/debug')('utils:registeredQueries');

// eslint-disable-next-line no-underscore-dangle
const _isString = require('lodash/isString');
// eslint-disable-next-line no-underscore-dangle
const _isEmpty = require('lodash/isEmpty');
// eslint-disable-next-line no-underscore-dangle
const _has = require('lodash/has');
// eslint-disable-next-line no-underscore-dangle
const _omit = require('lodash/omit');

let queries = {};

function set(queryId, remoteId) {
  if (!_isString(queryId) || _isEmpty(queryId)) {
    throw new Error(`setting a new query require a string id '${queryId}'`);
  }
  if (_has(queries, queryId)) {
    throw new Error(`a query is already registered for this id '${queryId}'`);
  }
  if (!_isString(remoteId) || _isEmpty(remoteId)) {
    throw new Error(`setting a new remoteId require a string id '${queryId}'`);
  }

  debug.debug(`query registered for '${queryId}'`);
  queries[queryId] = remoteId;
}

function get(queryId) {
  return queries[queryId];
}

function getAll() {
  return queries;
}

function remove(queryId) {
  queries = _omit(queries, [queryId]);
}

function removeMulti(queryIds) {
  queries = _omit(queries, queryIds);
}

function clear() {
  debug.debug('queries cleared');
  queries = {};
}

module.exports = {
  set,
  get,
  getAll,
  remove,
  removeMulti,
  clear,
};
