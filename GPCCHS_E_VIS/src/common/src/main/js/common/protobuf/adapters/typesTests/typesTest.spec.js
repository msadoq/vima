/* eslint import/no-dynamic-require:0 global-require:0 */
const _each = require('lodash/each');
const Long = require('long');
require('../../../utils/test');
const fs = require('fs');
const protobuf = require('../../');
const {
  bytesToOctet,
  bytesToUoctet,
  bytesToShort,
  bytesToUshort,
  bytesToString,
  decodeAttribute,
} = require('../lpisis/types');

const rootpath = `${__dirname}`;

// TODO add missing MAL types
const decoders = {
  ATTRIBUTE: arg => decodeAttribute(arg).value,
  BLOB: arg => arg.value.toBuffer(),
  BOOLEAN: arg => arg.value,
  DURATION: arg => arg.value,
  FLOAT: arg => arg.value,
  DOUBLE: arg => arg.value,
  FINETIME: arg => ({
    millisec: new Long(arg.millisec.low, arg.millisec.high, arg.unsigned).toNumber(),
    pico: arg.pico,
  }),
  IDENTIFIER: arg => bytesToString(arg.value),
  INTEGER: arg => arg.value,
  LONG: arg => new Long(arg.value.low, arg.value.high, arg.unsigned).toNumber(),
  OCTET: arg => bytesToOctet(arg.value),
  UOCTET: arg => bytesToUoctet(arg.value),
  SHORT: arg => bytesToShort(arg.value),
  USHORT: arg => bytesToUshort(arg.value),
  STRING: arg => arg.value,
  TIME: arg => arg.value.toNumber(),
  UINTEGER: arg => arg.value,
  ULONG: arg => arg.value.toNumber(),
  URI: arg => bytesToString(arg.value),
};

const checkBuffer = (type, file, value, decoder) => {
  const data = fs.readFileSync(file);
  // console.log(type, value, 'BUF', data);
  const buf = protobuf.decode(protobuf.getType(type), data);
  //console.log(type, value, 'BUF', buf);
  const json = decoder(buf);
   //console.log(type, value, 'JSON', json);
  json.should.deep.equal(value);
};

describe('protobuf/lpisis/CCSDS_MAL_TYPES', () => {
  _each(decoders, (decoder, type) => {
    describe(`${type}`, () => {
      const index = require(`./${type}`);
      _each(index, (value, fileName) => {
        it(`${value}`, () => checkBuffer(type, `${rootpath}/${type}/${fileName}`, value, decoder));
      });
    });
  });
});