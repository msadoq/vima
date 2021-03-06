// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

const _isInteger = require('lodash/isInteger');
const _isBuffer = require('lodash/isBuffer');
const _isNumber = require('lodash/isNumber');
const _isUndefined = require('lodash/isUndefined');
const _isNull = require('lodash/isNull');
const _isString = require('lodash/isString');
const Long = require('long');
const ByteBuffer = require('bytebuffer');

const ushortToBytes = (number) => {
  if (_isUndefined(number) || _isNull(number)) {
    return undefined;
  }

  if (!_isNumber(number)) {
    throw new Error(`Unable to convert '${number}' to short buffer`);
  }
  return new ByteBuffer(null, true).writeUint16(number).flip().buffer;
};
const bytesToUshort = (buffer) => {
  if (!buffer || !buffer.buffer) {
    return undefined;
  }
  // Buffer is associated with key buffer
  if (!_isBuffer(buffer)) {
    return undefined;
  }
  return buffer.readUInt16LE();
};
const shortToBytes = (number) => {
  if (_isUndefined(number) || _isNull(number)) {
    return undefined;
  }

  if (!_isNumber(number)) {
    throw new Error(`Unable to convert '${number}' to short buffer`);
  }

  return new ByteBuffer(null, true).writeInt16(number).flip().buffer;
};
const bytesToShort = (buffer) => {
  if (!buffer || !buffer.buffer) {
    return undefined;
  }
  // Buffer is associated with key buffer
  if (!_isBuffer(buffer)) {
    return undefined;
  }
  return buffer.readInt16LE();
};
const uoctetToBytes = (number) => {
  if (_isUndefined(number) || _isNull(number)) {
    return undefined;
  }

  if (!_isNumber(number)) {
    throw new Error(`Unable to convert '${number}' to int buffer`);
  }
  return new ByteBuffer(null, true).writeUint8(number).flip().buffer;
};
const bytesToUoctet = (buffer) => {
  if (!buffer || !buffer.buffer) {
    return undefined;
  }
  // Buffer is associated with key buffer
  if (!_isBuffer(buffer)) {
    return buffer;
  }
  return buffer.readUInt8();
};
const octetToBytes = (number) => {
  if (_isUndefined(number) || _isNull(number)) {
    return undefined;
  }

  if (!_isNumber(number)) {
    throw new Error(`Unable to convert '${number}' to int buffer`);
  }

  return new ByteBuffer(null, true).writeInt8(number).flip().buffer;
};
const bytesToOctet = (buffer) => {
  if (!buffer || !buffer.buffer) {
    return undefined;
  }
  // Buffer is associated with key buffer
  if (!_isBuffer(buffer)) {
    return buffer;
  }
  return buffer.readInt8();
  // return buffer.buffer.toString('ascii');
};
const stringToBytes = (string) => {
  if (_isUndefined(string) || _isNull(string)) {
    return undefined;
  }

  if (!_isString(string)) {
    throw new Error(`unable to convert '${string}' to byte buffer`);
  }
  // return new ProtoBuf.BufferWriter().string(string).finish();
  return new ByteBuffer(null, true).writeString(string).flip().buffer;
};
const bytesToString = (buffer) => {
  if (!buffer || !buffer.buffer) {
    return undefined;
  }
  if (!_isBuffer(buffer)) {
    return undefined;
  }
  return buffer.toString();
};

module.exports = {
  encodeAttribute: (attribute) => {
    const mixedType = typeof attribute;
    if (
      attribute === null
      || mixedType === 'undefined'
      || (mixedType === 'number' && isNaN(attribute))) {
      return undefined;
    }

    let type;
    let value;

    switch (mixedType) {
      case 'string':
        type = '_string';
        value = attribute;
        break;
      case 'number': {
        if (_isInteger(attribute)) {
          type = (attribute >= 0)
            ? '_ulong'
            : '_long';
        } else {
          type = '_double';
        }

        value = attribute;
        break;
      }
      case 'boolean':
        type = '_boolean';
        value = attribute;
        break;
      case 'object': {
        if (_isBuffer(attribute)) {
          type = '_blob';
          value = attribute;
        }
        break;
      }
      default:
        throw new Error(`Unknown data type ${mixedType}`);
    }
    return { [type]: { value } };
  },
  // eslint-disable-next-line complexity, "DV6 TBC_CNES Un-avoidable complexity due to MAL sub-type"
  decodeAttribute: (attribute) => {
    if (attribute === null || typeof attribute === 'undefined') {
      return undefined;
    }
    let value = null;
    let type = null;
    let symbol = null;
    if (attribute._blob != null) {
      if (ByteBuffer.isByteBuffer(attribute._blob.value)) {
        value = attribute._blob.value.toBuffer();
      } else {
        value = attribute._blob.value;
      }
      type = 'blob';
    } else if (attribute._boolean != null) {
      value = attribute._boolean.value;
      type = 'boolean';
    } else if (attribute._float != null) {
      value = attribute._float.value;
      type = 'float';
    } else if (attribute._double != null) {
      // value = attribute._double.value;
      symbol = attribute._double.value.toString();
      type = 'double';
    } else if (attribute._identifier != null) {
      value = bytesToString(attribute._identifier.value);
      type = 'identifier';
    } else if (attribute._octet != null) {
      value = bytesToOctet(attribute._octet.value);
      type = 'octet';
    } else if (attribute._uoctet != null) {
      value = bytesToUoctet(attribute._uoctet.value);
      type = 'uoctet';
    } else if (attribute._short != null) {
      value = bytesToShort(attribute._short.value);
      type = 'short';
    } else if (attribute._ushort != null) {
      value = bytesToUshort(attribute._ushort.value);
      type = 'ushort';
    } else if (attribute._integer != null) {
      value = attribute._integer.value;
      type = 'integer';
    } else if (attribute._uinteger != null) {
      value = attribute._uinteger.value;
      type = 'uinteger';
    } else if (attribute._long != null) {
      if (attribute._long.value.constructor === Long) {
        symbol = attribute._long.value.toString();
      } else {
        value = attribute._long.value;
      }
      type = 'long';
    } else if (attribute._ulong != null) {
      if (attribute._ulong.value.constructor === Long) {
        symbol = attribute._ulong.value.toString();
      } else {
        value = attribute._ulong.value;
      }
      type = 'ulong';
    } else if (attribute._string != null) {
      value = attribute._string.value;
      type = 'string';
    } else if (attribute._time != null) {
      value = (attribute._time.value.constructor === Long)
        ? attribute._time.value.toNumber()
        : attribute._time.value;
      type = 'time';
    } else if (attribute._finetime != null) {
      value = (attribute._finetime.value.ms.constructor === Long)
        ? attribute._finetime.value.ms.toNumber()
        : attribute._finetime.value.ms;
      type = 'finetime';
    } else if (attribute._uri != null) {
      value = bytesToString(attribute._uri.value);
      type = 'uri';
    }

    return (type) ? { type, value, symbol } : null;
  },
  ushortToBytes,
  bytesToUshort,
  shortToBytes,
  bytesToShort,
  uoctetToBytes,
  bytesToUoctet,
  octetToBytes,
  bytesToOctet,
  stringToBytes,
  bytesToString,
};
