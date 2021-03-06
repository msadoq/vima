import simple from '../helpers/simpleActionCreator';
import * as types from '../types';

/**
 * Simple actions
 */
export const initialize = simple(types.PUS_TEMP_INITIALIZE, 'forReplay', 'firstTime', 'lastTime', 'continuous');
export const subscribe = simple(types.PUS_TEMP_SUBSCRIBE, 'pusId', 'apId');
export const unsubscribe = simple(types.PUS_TEMP_UNSUBSCRIBE, 'pusId', 'apId');
export const compare =
  simple(
    types.PUS_TEMP_COMPARE,
    'domainId',
    'sessionId',
    'apId',
    'date',
    'shouldStartComparisonTool'
  );
export const reset =
  simple(
    types.PUS_TEMP_RESET,
    'domainId',
    'sessionId',
    'initializationMode',
    'initializationTime'
  );
export const saveInFile = simple(types.PUS_MODEL_SAVE_IN_FILE, 'domainId', 'sessionId', 'apId');
export const injectPusData = simple(types.INJECT_PUS_DATA, 'data');
export const savePusData = simple(types.SAVE_PUS_DATA, 'pusService', 'flattenId', 'groundDate', 'payload', 'isModel', 'dataType');

