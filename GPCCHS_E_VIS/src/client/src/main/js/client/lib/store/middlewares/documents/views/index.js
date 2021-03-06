// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Split documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Add helpers in documents middleware + refacto
//  + opti pipeMiddlewares function
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 06/07/2017 : Lint documents middleware . .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onReloadView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveView documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On save view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : Add onSaveViewAsModel documents middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 18/07/2017 : On open view middleware .
// VERSION : 1.1.2 : FA : ISIS-FT-1964 : 21/07/2017 : Rename all create* middleware by make*
// VERSION : 1.1.2 : FA : #7145 : 24/07/2017 : Add "make" prefix to each documents middleware
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// VERSION : 2.0.0 : DM : #5806 : 06/12/2017 : Change all relative imports .
// END-HISTORY
// ====================================================================

import pipeMiddlewares from 'store/helpers/pipeMiddlewares';
import makeOnSaveView from './onSaveView';
import makeOnOpenView from './onOpenView';
import makeOnCloseView from './onCloseView';
import makeOnReloadView from './onReloadView';
import makeOnSaveViewAsModel from './onSaveViewAsModel';
import makeOnExportAsCsv from './onExportAsCsv';
import makeOnExportAsImage from './onExportAsImage';
import makeOnExportAsImageHasFailed from './onExportAsImageHasFailed';


const makeViewsMiddleware = documentManager => pipeMiddlewares(
  makeOnOpenView(documentManager),
  makeOnSaveView(documentManager),
  makeOnCloseView(documentManager),
  makeOnReloadView(documentManager),
  makeOnSaveViewAsModel(documentManager),
  makeOnExportAsCsv(documentManager),
  makeOnExportAsImage(documentManager),
  makeOnExportAsImageHasFailed(documentManager)
);

export default makeViewsMiddleware;
