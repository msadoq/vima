import { get } from '../../../common/configurationManager';
import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import cacheClean from './cacheCleanUp';

const createCacheMiddleware = lokiManager => pipeMiddlewares(
  cacheClean(get('CACHE_INVALIDATION_FREQUENCY'), lokiManager)
);

export default createCacheMiddleware;