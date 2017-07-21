const logger = require('../../common/logManager')('models:timebasedData');
const database = require('./loki');

// List of the tbdId indexing a lokiJs collection
const tbdIds = [];

/**
 * Get a collection indexed by the given tbdId
 * @param string tbdId
 */
const getCollection = tbdId => ({ collection: database.getCollection(tbdId) });


const displayCollection = tbdId => database.getCollection(tbdId).find();
/**
 * Get or create the collection indexed by the given tbdId
 * @param string tbdId
 */
const getOrCreateCollection = (tbdId) => {
  if (tbdIds.indexOf(tbdId) !== -1) {
    return getCollection(tbdId);
  }
  // register tbdId
  tbdIds.push(tbdId);
  // create collection
  const collection = database.addCollection(
    tbdId,
    { unique: ['timestamp'] }
  );

  return { collection, isNew: true };
};

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
 * Get all the data present in a collection for a given tbdId between a lower and an upper value
 * @param string tbdId
 * @param number lower
 * @param number upper
 */
const getRangeData = (tbdId, lower, upper) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
  if (isNew) return [];
  return searchInterval(collection, lower, upper);
};

const getLastData = (tbdId, lower, upper) => {
  const { collection, isNew } = getOrCreateCollection(tbdId);
  if (isNew) return {};
  return searchLast(collection, lower, upper);
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
 * List all the tbdIds present in the store
 */
const listCollections = () => tbdIds;

/**
 * Remove a collection for a given tbdId
 * @param string tbdId
 */
const removeCollection = (tbdId) => {
  const { collection } = getCollection(tbdId);
  collection.clear();
};

/**
 * Remove all collections present in the store
 */
const removeAllCollections = () => {
  for (let i = 0; i < tbdIds.length; i += 1) removeCollection(tbdIds[i]);
};

/**
 * Add a value (timestamp,payload) for a given collection
 * @param lokiJsCollection collection
 * @param Object value
 */
const addRecord = (collection, value) => {
  const timestamp = value.timestamp;
  const payload = value.payload;
  const record = collection.by('timestamp', timestamp);
  if (typeof record === 'undefined') {
    return collection.insert({
      timestamp,
      payload,
    });
  }
  record.payload = payload;
  return record;
};

/**
 * Add a set of values in a collection for a given tbdId
 * @param string tbdId
 * @param Array<Object> records
 */
const addRecords = (tbdId, records) => {
  logger.silly(`add ${records.length} records`);
  const { collection } = getCollection(tbdId);
  for (let i = 0; i < records.length; i += 1) {
    addRecord(collection, records[i]);
  }
};

export default {
  getLastData,
  getRangeData,
  removeRecords,
  addRecords,
  listCollections,
  removeCollection,
  removeAllCollections,
  getOrCreateCollection,
  displayCollection,
};