// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6794 : 18/07/2017 : Factorization of dumpBuffer module to call only one
//  function
// VERSION : 1.1.2 : DM : #6700 : 30/08/2017 : move dumpBuffer use in a specific middleware
// VERSION : 2.0.0 : DM : #9217 : 13/11/2017 : Add error log to dump mechanism
// VERSION : 2.0.0 : DM : #9217 : 13/11/2017 : Add extensions for dump buffer
// END-HISTORY
// ====================================================================

const { tmpdir } = require('os');
const { join } = require('path');
const { writeFile, mkdirSync } = require('fs');
const _isEmpty = require('lodash/isEmpty');
const { get } = require('../../common/configurationManager');
const getLogger = require('../../common/logManager');

const logger = getLogger('utils:dumpBuffer');

let dumpFolder;
const dataFolder = {};

const createDumpFolder = (dataId) => {
  // check validity of dataId
  if (!dataId) {
    logger.error('Cannot create/get dump folder, dataId is undefined');
    return;
  }

  if (!dataId.parameterName) {
    logger.error('Cannot create/get dump folder, dataId has no property "parameterName"');
    return;
  }
  // Check if folder already exists
  if (dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)]) {
    return;
  }
  if (!dumpFolder) {
    dumpFolder = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
  }
  // create folders:
  // dumpFolder
  //  - catalog
  //    - comObject
  //      - parameterName
  try {
    mkdirSync(dumpFolder);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${dumpFolder}`);
      return;
    }
  }
  const catalogDir = join(dumpFolder, dataId.catalog);
  try {
    mkdirSync(catalogDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${catalogDir}`);
      return;
    }
  }
  const comObjectDir = join(catalogDir, dataId.comObject);
  try {
    mkdirSync(comObjectDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${comObjectDir}`);
      return;
    }
  }

  const paramDir = join(comObjectDir, dataId.parameterName);
  try {
    mkdirSync(paramDir);
  } catch (error) {
    if (error.code !== 'EEXIST') {
      logger.warn(`Unable to create folder ${paramDir}`);
    }
  }
  // Remember data folder
  dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)] =
    join(dumpFolder, dataId.catalog, dataId.comObject, dataId.parameterName);
};

// if dump is activated, it is written in log
const dumpLog = () => {
  if (get('DUMP') === 'on') {
    const dumpDir = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
    logger.warn(`Received payloads are dumped in ${dumpDir}`);
  }
};

/* write buffer in a file with timestamp as name
 * @param dataId: defines folder hierarchy
 * @param timestamp: buffer corresponding timestamp in ms
 * @param buffer: the buffer to save in file
 * */
const dumpBuffer = (dataId, timestamp, buffer, extension) => {
  // check dump activation
  if (get('DUMP') === 'on') {
    // Create dump folder if it doesn't exist
    createDumpFolder(dataId);
    // get path
    const dumpPath = dataFolder[join(dataId.catalog, dataId.comObject, dataId.parameterName)];
    if (dumpPath) {
      // save a file per timestamp with binary payload
      writeFile(join(dumpPath, `${timestamp.toString()}.${extension}`), buffer, (err) => {
        if (err) {
          logger.warn(`Error writing dump file ${timestamp}`);
        }
      });
    } else {
      logger.error('Could not get path of dump folder, dataId may be in cause');
      logger.error(`dataId : ${dataId}`);
    }
  }
};

const isDumpActivated = () => get('DUMP') === 'on';

module.exports = { dumpBuffer, dumpLog, createDumpFolder, isDumpActivated };
