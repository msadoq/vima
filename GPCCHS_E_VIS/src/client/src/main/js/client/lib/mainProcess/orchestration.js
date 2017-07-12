import _isEmpty from 'lodash/isEmpty';
import { series } from 'async';
import { tmpdir } from 'os';
import { get } from '../common/configurationManager';
import {
  IPC_METHOD_CACHE_CLEANUP,
} from '../constants';
import executionMonitor from '../common/logManager/execution';
import getLogger from '../common/logManager';

import { server } from './ipc';
import { getStore } from './store';
import {
  getLastCacheInvalidation,
} from '../store/reducers/hsc';
import {
  updateCacheInvalidation,
  pause,
} from '../store/actions/hsc';
import dataMapGenerator from '../dataManager/map';

let logger;

let nextTick = null;

export function schedule() {
  clear(); // avoid concurrency
  // schedule next tick
  nextTick = setTimeout(tick, get('ORCHESTRATION_FREQUENCY'));
}

export function clear() {
  if (!nextTick) {
    return;
  }

  clearTimeout(nextTick);
  nextTick = null;
}

export function start() {
  logger = getLogger('main:orchestration');

  // TODO dbrugne move in dedicated middleware ///////////////////////////////////////
  if (get('DUMP') === 'on') {
    const dumpDir = (_isEmpty(get('DUMP_DIR')) ? tmpdir() : get('DUMP_DIR'));
    logger.warn(`Received payloads are dumped in ${dumpDir}`);
  }
  // TODO dbrugne move in dedicated middleware ///////////////////////////////////////

  schedule();
}

export function stop() {
  clear();
  try { // TODO dbrugne remove try/catch once lifecycle is stable
    getStore().dispatch(pause());
  } catch (e) {
    if (logger) {
      logger.error(e);
    }
  }
}

export function tick() {
  logger.debug('running tick');
  const execution = executionMonitor('orchestration');
  execution.reset();
  execution.start('global');

  // store
  const { getState, dispatch } = getStore();

  // data map
  execution.start('dataMap generation');
  const dataMap = dataMapGenerator(getState());
  execution.stop('dataMap generation');

  series([
    // cache invalidation
    (callback) => {
      const now = Date.now();
      const lastCacheInvalidation = getLastCacheInvalidation(getState());
      if (now - lastCacheInvalidation >= get('CACHE_INVALIDATION_FREQUENCY')) {
        execution.start('cache invalidation');
        dispatch(updateCacheInvalidation(now)); // schedule next run
        server.message(IPC_METHOD_CACHE_CLEANUP, dataMap); // TODO dbrugne diagnose if this is not the origin of the weird dataMap mutation
        execution.stop('cache invalidation');

        logger.debug('cache invalidation requested, skipping current tick');
      }
      callback(null);
    },
  ], (err) => {
    if (err) {
      logger.error(err);
    }

    execution.stop('global');
    execution.print();

    // schedule next tick
    schedule();
  });
}
