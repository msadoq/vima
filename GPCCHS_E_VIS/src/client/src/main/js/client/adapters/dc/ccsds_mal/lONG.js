// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #7453 : 07/08/2017 : Move adapters folder in client folder
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'long', symbol: data.value.toString() }),
  encodeRaw: (data, buffer, offset = 0) => {
    const long = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    long.writeInt64(data, offset);
    return long.buffer;
  },
  decodeRaw: (data, buffer, offset = 0) => {
    const long = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'long', symbol: long.readInt64(offset).toString() };
  },
};
