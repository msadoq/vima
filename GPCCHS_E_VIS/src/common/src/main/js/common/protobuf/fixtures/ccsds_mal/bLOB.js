// ====================================================================
// HISTORY
// VERSION : 1.1.2 : FA : #6891 : 19/07/2017 : Rename test folder in common and use jest for tests
// VERSION : 1.1.2 : DM : #6700 : 03/08/2017 : Merge branch 'dev' into dbrugne-data
// END-HISTORY
// ====================================================================

// Produced by Acceleo JavaScript Generator 1.1.2
const ByteBuffer = require('bytebuffer');

module.exports = {
  encode: data => ({ value: data }),
  decode: data => ({ type: 'blob', value: data.value }),
  encodeRaw: (data, buffer, offset = 0, size = 0) => {
    const blob = buffer || new ByteBuffer(null, ByteBuffer.LITTLE_ENDIAN);
    blob.writeString(data + '\0'.repeat(size - data.length), offset);
    return blob.buffer;
  },
  decodeRaw: (data, buffer, offset = 0, size = 0) => {
    const blob = buffer || ByteBuffer.wrap(data, ByteBuffer.LITTLE_ENDIAN);
    return { type: 'blob', value: Buffer.from(blob.readString(size, ByteBuffer.METRICS_BYTES, offset).string) };
  },
};
