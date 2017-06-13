import fs, { access, accessSync, mkdir, readFileSync } from 'fs';
import rimraf from 'rimraf';
import { join, resolve } from 'path';
import { compose, prop, split } from 'lodash/fp';
import sinon from 'sinon';

import { MIME_TYPES } from '../constants';

import { getTmpPath } from '../common/test';
import * as fmdApi from '../common/fmd';
import { readDocument, writeDocument } from './io';

const mockedCreateDocument = (path, documentType, cb) => {
  const mimeType = MIME_TYPES[documentType];
  if (!mimeType) {
    return cb(new Error(`Unknown documentType : ${documentType}`));
  }
  const oid = `oid:${fmdApi.getRelativeFmdPath(path)}`;
  return cb(null, oid);
};

const mockedResolveDocument = (oid, cb) => {
  const getPathFromOid = compose(prop(1), split(':'));
  const resolvedPath = getPathFromOid(oid);
  if (!resolvedPath) {
    return cb(new Error('no resolved path'));
  }
  return cb(null, resolvedPath, 42);
};

const fileExist = (path) => {
  try {
    accessSync(path, fs.constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
};

describe('documentManager/io', () => {
  const folder = fmdApi.getRootDir();
  let stubCreateDocument;
  let stubResolveDocument;
  beforeAll(() => {
    stubCreateDocument = sinon.stub(fmdApi, 'createDocument').callsFake(mockedCreateDocument);
    stubResolveDocument = sinon.stub(fmdApi, 'resolveDocument').callsFake(mockedResolveDocument);
  });
  afterAll(() => {
    stubCreateDocument.restore();
    stubResolveDocument.restore();
  });
  describe('readDocument', () => {
    it('exists', () => {
      expect(typeof readDocument).toBe('function');
    });

    describe('inside fmd folder', () => {
      it('works with oid', (done) => {
        readDocument({ oId: 'oid:/small.workspace.json' }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toEqual(42);
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknow oid', (done) => {
        readDocument({ oId: 'unknownOid' }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '/views/text1.json';
        readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/views/unknown.json';
        readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });

    describe('outside fmd folder', () => {
      beforeAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = resolve(__dirname, '../../data');
      });
      afterAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = folder;
      });
      it('works with absolute path', (done) => {
        const absolutePath = join(folder, 'pages/page1.json');
        readDocument({ absolutePath }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown absolute path', (done) => {
        const absolutePath = join(folder, 'unknown.json');
        readDocument({ absolutePath }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative path', (done) => {
        const path = 'views/text1.json';
        readDocument({ pageFolder: folder, path }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative path', (done) => {
        const path = 'views/unknown.json';
        readDocument({ pageFolder: folder, path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
      it('works with relative fmd path', (done) => {
        const path = '/../fixtures/views/text1.json';
        readDocument({ path }, (err, data, properties, resolvedPath) => {
          expect(typeof err).not.toBe('error');
          expect(typeof data).toBe('object');
          expect(properties).toBeFalsy();
          expect(typeof resolvedPath).toBe('string');
          expect(fileExist(resolvedPath)).toBe(true);
          done();
        });
      });
      it('fails with unknown relative fmd path', (done) => {
        const path = '/../lib/documentManager/fixtures/views/unknown.json';
        readDocument({ path }, (err) => {
          expect(err).toBeInstanceOf(Error);
          done();
        });
      });
    });
  });
  describe('writeDocument', () => {
    const objectToSave = { type: 'WorkSpace', some: { properties: true } };
    const readJsonFileSync = compose(JSON.parse, readFileSync);

    beforeEach(done => mkdir(getTmpPath(), done));
    afterEach(done => rimraf(getTmpPath(), done));

    it('exists', () => {
      expect(typeof writeDocument).toBe('function');
    });

    describe('inside fmd folder', () => {
      beforeAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = getTmpPath();
      });
      afterAll(() => {
        process.env.ISIS_DOCUMENTS_ROOT = folder;
      });

      const getPath = () => join(fmdApi.getRootDir(), 'document.json');

      it('works with an absolute path', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err) => {
          expect(typeof err).not.toBe('error');
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(typeof err).not.toBe('error');
          expect(oid).toEqual('oid:/document.json');
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(path, (accessErr) => {
            expect(typeof accessErr).toBe('object');
            done();
          });
        });
      });
    });

    describe('outside fmd folder', () => {
      const getPath = () => join(getTmpPath(), 'document.json');

      it('works with an absolute path', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err) => {
          expect(typeof err).not.toBe('error');
          expect(readJsonFileSync(path)).toEqual(objectToSave);
          done();
        });
      });
      it('should give an oid', (done) => {
        const path = getPath();
        writeDocument(path, objectToSave, (err, oid) => {
          expect(typeof err).not.toBe('error');
          expect(oid).toBeUndefined();
          done();
        });
      });
      it('fails with a relative path', (done) => {
        const path = './document.json';
        writeDocument(path, objectToSave, (err) => {
          expect(err).toBeInstanceOf(Error);
          access(path, (accessErr) => {
            expect(typeof accessErr).toBe('object');
            done();
          });
        });
      });
    });
  });
});
