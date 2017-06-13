import startsWith from 'lodash/fp/startsWith';
import fs from 'fs';
import { relative, join, basename, dirname } from 'path';

import parameters from 'common/parameters';
import globalConstants, { MIME_TYPES } from 'common/constants';

import ipcApi from '../mainProcess/ipc';

const checkPath = (path, cb) => (
  fs.exists(path, pathExist => cb(null, !!pathExist))
);

export const getRootDir = () => parameters.get('ISIS_DOCUMENTS_ROOT');
export const isInFmd = path => startsWith(getRootDir(), path);
export const getRelativeFmdPath = path => `/${relative(getRootDir(), path)}`;

export const resolveDocument = (oId, callback) => {
  ipcApi.server.requestFmdGet(oId, ({ err, type, detail }) => {
    if (err) {
      return callback(err);
    }
    if (type !== globalConstants.FMDFILETYPE_DOCUMENT) {
      return callback(new Error('document is not a file'));
    }
    return callback(
      null,
      join(getRootDir(), detail.dirname.value, detail.basename.value),
      detail.properties
    );
  });
};

export const createDocument = (path, documentType, callback) => {
  const mimeType = MIME_TYPES[documentType];
  if (!mimeType) {
    return callback(new Error(`Unknown documentType : ${documentType}`));
  }
  const fileName = basename(path);
  const folder = dirname(getRelativeFmdPath(path));
  return checkPath(path, (pathErr, pathExist) => {
    if (pathExist) {
      return callback(null);
    }
    return ipcApi.server.requestFmdCreate(folder, fileName, mimeType, ({ err, serializedOid }) => {
      if (err) {
        return callback(err);
      }
      return callback(null, serializedOid);
    });
  });
};
