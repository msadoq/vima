/* eslint-disable no-unused-expressions */
import { join } from 'path';
import rimraf from 'rimraf';
import {
  mkdirSync,
  writeFileSync,
  accessSync,
  constants,
  chmodSync,
} from 'fs';

import { should, getTmpPath } from '../common/test';
import fs from './fs';

describe('common/fs', () => {
  const tmpFolder = getTmpPath();
  const file = fs.resolve(tmpFolder, '/foo.txt');
  const json = fs.resolve(tmpFolder, '/foo.json');
  const unreadable = fs.resolve(tmpFolder, '/unreadable.txt');
  const notExists = fs.resolve(tmpFolder, '/not-exists.txt');
  const unavailableFolder = fs.resolve(tmpFolder, '/unavailableFolder');
  before(() => {
    try {
      accessSync(tmpFolder, constants.F_OK);
    } catch (e) {
      mkdirSync(tmpFolder);
    }
    try {
      accessSync(file, constants.F_OK);
    } catch (e) {
      writeFileSync(file, 'my content');
    }
    try {
      accessSync(json, constants.F_OK);
    } catch (e) {
      writeFileSync(json, '{"foo":"bar"}');
    }
    try {
      accessSync(unreadable, constants.F_OK);
    } catch (e) {
      writeFileSync(unreadable, 'my content');
      chmodSync(unreadable, 0);
    }
    try {
      accessSync(unavailableFolder, constants.F_OK);
    } catch (e) {
      mkdirSync(unavailableFolder);
      chmodSync(unavailableFolder, 0);
    }
  });
  after((done) => {
    try {
      rimraf(tmpFolder, done);
    } catch (e) {
      console.warn(e); // eslint-disable-line no-console
    }
  });

  it('resolve', () => {
    fs.resolve('/foo/bar', '/baz/file.json').should.equal('/foo/bar/baz/file.json');
    fs.resolve('/foo/bar', 'file.json').should.equal('/foo/bar/file.json');
  });

  describe('isExists', () => {
    it('file exists', (done) => {
      fs.isExists(file, (exists) => {
        exists.should.equal(true);
        done();
      });
    });
    it('file not exists', (done) => {
      fs.isExists(notExists, (exists) => {
        exists.should.equal(false);
        done();
      });
    });
  });

  describe('isReadable', () => {
    it('readable', (done) => {
      fs.isReadable(file, (readable) => {
        readable.should.equal(true);
        done();
      });
    });
    it('not readable', (done) => {
      fs.isReadable(unreadable, (readable) => {
        readable.should.equal(false);
        done();
      });
    });
  });

  describe('read', () => {
    it('works', (done) => {
      fs.read(file, (err, content) => {
        should.not.exist(err);
        content.should.equal('my content');
        done();
      });
    });
    it('error', (done) => {
      fs.read(unreadable, (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('parse', () => {
    it('valid', (done) => {
      fs.parse('{"foo":"bar"}', (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('invalid', (done) => {
      fs.parse('"{"foo":"bar""', (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('readJsonFromAbsPath', () => {
    it('works', (done) => {
      fs.readJsonFromAbsPath(getTmpPath('foo.json'), (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('readJsonFromAbsPath error', (done) => {
      fs.readJsonFromAbsPath(getTmpPath('not-exists.txt'), (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('readJsonFromRelativePath', () => {
    it('works', (done) => {
      fs.readJsonFromRelativePath(getTmpPath(), 'foo.json', (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('readJsonFromRelativePath error', (done) => { // dc stub send oid as filepath
      fs.readJsonFromRelativePath(getTmpPath(), 'not-exists.txt', (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('readJsonFromFmdPath', () => {
    it('works', (done) => {
      fs.readJsonFromFmdPath(getTmpPath('foo.json'), (err, content) => {
        should.not.exist(err);
        content.should.eql({ foo: 'bar' });
        done();
      });
    });
    it('readJsonFromFmdPath error', (done) => { // dc stub send oid as filepath
      fs.readJsonFromFmdPath(getTmpPath('not-exists.txt'), (err, content) => {
        err.should.be.an('error');
        should.not.exist(content);
        done();
      });
    });
  });

  describe('checkPath', () => {
    it('path exists', () => (
      fs.checkPath('/')
        .then((res) => {
          res.should.be.true;
        })
    ));
    it('path does not exists', () => (
      fs.checkPath('/unknownPath')
        .then(() => { throw new Error('This path is not supposed to exist'); })
        .catch((res) => {
          if (res instanceof Error) {
            throw res;
          }
          res.should.be.false;
        })
    ));
  });

  describe('createFolder', () => {
    it('folder already exists', () => (
      fs.createFolder('/')
        .then((res) => {
          res.should.be.true;
        })
    ));
    it('folder does not exists', () => {
      const path = join(tmpFolder, 'a/b/c/d');
      return fs.createFolder(path)
        .then((res) => {
          res.should.be.true;
          fs.isExists(path, (exist) => {
            exist.should.be.true;
          });
        });
    });
    it('fails when cannot mkdirp', () => {
      const path = join(unavailableFolder, 'a/b/c/d');
      return fs.createFolder(path)
        .catch((err) => {
          err.should.be.an('error');
          fs.isExists(path, (exist) => {
            exist.should.be.false;
          });
        });
    });
  });
});