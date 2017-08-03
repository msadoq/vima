import _ from 'lodash/fp';
import fs from 'fs';

import { read, parse } from '../../common/fs';

import * as fmd from './fmd';
import resolvePath from './pathResolver';

export const readDocument = (
  { pageFolder, workspaceFolder, viewFolder, documentFolder, path, oId, absolutePath }, cb
) => {
  const folder = viewFolder || pageFolder || workspaceFolder || documentFolder;
  const relativePath = path;
  resolvePath({ folder, relativePath, oId, absolutePath }, (err, { resolvedPath, properties }) => {
    if (err) {
      return cb(err, {});
    }
    return read(resolvedPath, (readErr, content) => {
      if (readErr) {
        return cb(readErr);
      }
      return parse(content, (parseErr, parsedJson) => {
        if (parseErr) {
          return cb(parseErr);
        }
        return cb(null, parsedJson, properties, resolvedPath);
      });
    });
  });
};

export const readDocumentType = (docInfo, cb) => {
  readDocument(docInfo, (err, doc) => {
    if (err) {
      return cb(err);
    }
    if (!_.has('type', doc)) {
      return cb(new Error('The given document has no type'));
    }
    return cb(null, doc.type);
  });
};

export const writeDocument = (path, json, cb) => {
  const spaces = 2; // beautify json with 2 spaces indentations
  const data = JSON.stringify(json, null, spaces);
  if (!_.startsWith('/', path)) {
    return cb(new Error('path should be absolute'));
  }
  if (fmd.isInFmd(path)) {
    return fmd.createDocument(path, json.type, (err, oid) => {
      if (err) {
        return cb(err);
      }
      return fs.writeFile(path, data, (errWriting) => {
        if (errWriting) {
          return cb(errWriting);
        }
        return cb(null, oid);
      });
    });
  }
  return fs.writeFile(path, data, (errWriting) => {
    if (errWriting) {
      return cb(errWriting);
    }
    return cb(null);
  });
};