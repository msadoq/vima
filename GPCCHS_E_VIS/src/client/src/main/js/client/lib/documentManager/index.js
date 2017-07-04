import {
  reloadView,
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,
  savePage,
} from './actions';
import { saveView, saveViewAs } from './saveView';
import { saveWorkspace } from './saveWorkspace';
import { readDocumentType } from './io';

export default {
  // save
  saveView,
  saveViewAs,
  savePage,
  saveWorkspace,

  // open
  openView,
  openPage,
  openWorkspace,
  openBlankWorkspace,

  // reload
  reloadView,

  // io
  readDocumentType,
};
