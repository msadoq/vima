// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create loki model and its test
// VERSION : 1.1.2 : DM : #6700 : 26/07/2017 : update of loki manager .
// VERSION : 1.1.2 : DM : #6700 : 01/08/2017 : Branch full cycle mechanism for rangeData
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Update some tests . . .
// VERSION : 1.1.2 : DM : #6700 : 17/08/2017 : Major changes : all data consumption is now plugged
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update tests and implementation . .
// VERSION : 1.1.2 : DM : #6700 : 18/08/2017 : Update multiple test and implementation
// VERSION : 1.1.2 : DM : #6700 : 21/08/2017 : Fix forecast error and fix related tests
// VERSION : 1.1.2 : DM : #6700 : 23/08/2017 : Update cache clean mechanism in dev tools
// VERSION : 1.1.2 : DM : #6700 : 24/08/2017 : Clean console log . . .
// VERSION : 2.0.0 : FA : #9883 : 08/01/2018 : Add DISABLE_LOKI_CACHE config variable .
// END-HISTORY
// ====================================================================

import _noop from 'lodash/noop';
import { get } from 'common/configurationManager';
import {
  getCollection as getCollectionGeneric,
  displayCollection as displayCollectionGeneric,
  removeCollection as removeCollectionGeneric,
  removeAllCollections as removeAllCollectionsGeneric,
  addRecord as addRecordGeneric,
  addRecords as addRecordsGeneric,
  getOrCreateCollection as getOrCreateCollectionGeneric,
} from './lokiGeneric';

const database = require('./loki');

const isCacheDisabled = String(get('DISABLE_LOKI_CACHE')) === 'true';

const cacheId = 'knownRanges';

// List of the tbdId indexing a lokiJs collection
const tbdIds = [];

/* ============================= Generic function overload ============================= */

/**
 * Get a collection indexed by the given tbdId
 * @param string tbdId
 */
const getCollection = tbdId => getCollectionGeneric(cacheId, tbdId);

const displayCollection = tbdId => displayCollectionGeneric(cacheId, tbdId);

const removeCollection = (tbdId) => {
  removeCollectionGeneric(cacheId, tbdId);
  const index = tbdIds.indexOf(tbdId);
  if (index > -1) {
    tbdIds.splice(index, 1);
  }
};

const addRecord = (tbdId, value) => {
  if (tbdIds.indexOf(tbdId) === -1) {
    tbdIds.push(tbdId);
  }
  return addRecordGeneric(cacheId, tbdId, value);
};

const addRecords = (tbdId, records) => {
  if (tbdIds.indexOf(tbdId) === -1) {
    tbdIds.push(tbdId);
  }
  return addRecordsGeneric(cacheId, tbdId, records);
};


const getOrCreateCollection = (tbdId) => {
  if (tbdIds.indexOf(tbdId) === -1) {
    tbdIds.push(tbdId);
  }
  return getOrCreateCollectionGeneric(cacheId, tbdId);
};

const removeAllCollections = () => {
  tbdIds.splice(0, tbdIds.length);
  return removeAllCollectionsGeneric();
};
/* ============================= Generic function overload ============================= */

/**
 * Create mongoDb-like query to find data between a lower and an upper value
 * @param number lower
 * @param number upper
 */
const createIntervalQuery = (lower, upper) => {
  const query = { $and: [] };
  if (lower) {
    query.$and.push({ timestamp: { $gte: lower } });
  }
  if (upper) {
    query.$and.push({ timestamp: { $lte: upper } });
  }
  return query;
};

/**
 * Create query to get data outside the list of intervals
 * @param [interval] interval
 * @return Object query
 */
const createDiffQuery = (intervals) => {
  const query = { $or: [] };
  for (let i = 0; i < intervals.length; i += 1) {
    const $and = [];
    if (i === 0) {
      query.$or.push({ timestamp: { $lt: intervals[i][0] } });
    }
    if (i === intervals.length - 1) {
      query.$or.push({ timestamp: { $gt: intervals[i][1] } });
    } else {
      $and.push({ timestamp: { $gt: intervals[i][1] } });
      $and.push({ timestamp: { $lt: intervals[i + 1][0] } });
      query.$or.push({ $and });
    }
  }
  return query;
};

/**
 * Returns an interval of values for a given collection, and for a given range
 * @param lokiJsCollection collection
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const searchInterval = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  return collection.find(query);
};

const searchLast = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  return collection.chain()
                   .find(query)
                   .simplesort('timestamp', true)
                   .limit(1)
                   .data(); // TODO pgaucher Optimize this query ?
};

/**
 * Delete an interval of values for a given collection, and for a given range
 * @param lokiJsCollection collection
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const deleteInterval = (collection, lower, upper) => {
  const query = createIntervalQuery(lower, upper);
  collection.chain().find(query).remove();
};

/**
 * Get last record fot a given tbdId and interval
 * @param string tbdId
 * @param Array interval
 */
const getLastRecords = (tbdId, interval) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
  const lastRecords = { [tbdId]: {} };
  if (isNew) return lastRecords;

  const searched = searchLast(collection, interval[0], interval[1]);
  if (searched.length === 0) return lastRecords;

  lastRecords[tbdId][searched[0].timestamp] = searched[0].payload;
  return lastRecords;
};

/**
 * Get all the data present in a collection for a given tbdId between a lower and an upper value
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const getRangesRecords = (tbdId, intervals) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
  const rangesRecords = { [tbdId]: {} };
  if (isNew) return rangesRecords;
  for (let i = 0; i < intervals.length; i += 1) {
    const searched = searchInterval(collection, intervals[i][0], intervals[i][1]);
    for (let j = 0; j < searched.length; j += 1) {
      const currentSearch = searched[j];
      rangesRecords[tbdId][currentSearch.timestamp] = currentSearch.payload;
    }
  }
  return rangesRecords;
};

/**
 * Remove all the data present in a collection for a given tbdId between a lower and an upper value
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const removeRecords = (tbdId, lower, upper) => {
  const { collection } = getCollection(tbdId);
  deleteInterval(collection, lower, upper);
};

/**
 * Remove all data per tbdIds, except those present in the list of interval to preserve
 * @param string tbdId
 * @param Array<interval> intervals
 */
const removeAllExceptIntervals = (toKeep) => {
  const tbdIdsTemp = [...tbdIds];
  for (let i = 0; i < tbdIdsTemp.length; i += 1) {
    if (toKeep[tbdIdsTemp[i]]) {
      const query = createDiffQuery(toKeep[tbdIdsTemp[i]].interval);
      const { collection } = getCollection(tbdIdsTemp[i]);
      if (collection) collection.chain().find(query).remove();
    } else {
      removeCollection(tbdIdsTemp[i]);
    }
  }
};

/**
 * List all the ids present in the store
 */
const listCachedCollections = () => tbdIds;


const getDb = () => database;

export default {
  getCollection,
  getLastRecords,
  getRangesRecords,
  removeRecords,
  addRecord: isCacheDisabled ? _noop : addRecord,
  addRecords,
  listCachedCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
  removeAllExceptIntervals,
  getDb,
};
