import getLogger from 'common/log';

import omit from 'lodash/omit';
import compose from 'lodash/fp/compose';
import join from 'lodash/fp/join';
import async from 'async';
import validation from './validation';

import extractTimebars from './extractTimebars';
import extractTimelines from './extractTimelines';
import extractWindows from './extractWindows';
import { extractPages } from './extractPages';
import { extractViews } from './extractViews';

import { readDocument } from './io';

const logger = getLogger('documents:workspace');

const formattedValidation = compose(join('\n'), validation);

export default {
  readWorkspace: fmdApi => (folder, relativePath, callback) => {
    logger.info(`reading workspace ${folder}/${relativePath}`);
    async.waterfall([
      cb => readDocument(fmdApi)(folder, relativePath, undefined, undefined, cb),
      (workspace, cb) => cb(formattedValidation('workspace', workspace), workspace),
      (workspace, cb) => cb(null, { __original: workspace, __folder: folder }),
      (content, cb) => extractTimebars(content, cb),
      (content, cb) => extractTimelines(content, cb),
      (content, cb) => extractWindows(content, cb),
      (content, cb) => extractPages(fmdApi)(content, cb),
      (content, cb) => extractViews(fmdApi)(content, cb),
      (content, cb) => cb(null, omit(content, ['__folder', '__original'])),
    ], callback);
  }
};