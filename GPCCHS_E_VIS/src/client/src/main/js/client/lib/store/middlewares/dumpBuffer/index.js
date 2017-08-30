import pipeMiddlewares from '../../helpers/pipeMiddlewares';
import dumpBufferArchive from './dumpBufferArchive';
import dumpBufferPubSub from './dumpBufferPubSub';

const createDumpBufferMiddleware = () => pipeMiddlewares(
  dumpBufferArchive(),
  dumpBufferPubSub()
);

export default createDumpBufferMiddleware;
