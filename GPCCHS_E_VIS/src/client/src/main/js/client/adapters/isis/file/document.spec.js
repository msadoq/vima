// Produced by Acceleo JavaScript Generator 1.1.2
/* eslint-disable max-len, "DV6 TBC_CNES generated code can't avoid too long lines" */
/* eslint-disable complexity, "DV6 TBC_CNES generated code can't avoid complexity" */
const ProtoBuf = require('protobufjs');
const adapter = require('./document');
const stub = require('./document.stub')();



describe('protobuf/isis/file/Document', () => {
  const builder = new ProtoBuf.Root()
    .loadSync(`${__dirname}/Document.proto`, { keepCase: true })
    .lookup('file.protobuf.Document');
  let buffer;
  test('encode', () => {
    buffer = builder.encode(adapter.encode(stub)).finish();
    expect(buffer.constructor).toBe(Buffer);
  });
  test('decode', () => {
    const decoded = adapter.decode(builder.decode(buffer));
    expect(decoded).toMatchObject({
      lockedBy: (typeof stub.lockedBy === 'undefined')
        ? null
        : {
          login: { type: 'string', value: stub.lockedBy.login },
          password: { type: 'string', value: stub.lockedBy.password },
          profile: { type: 'string', value: stub.lockedBy.profile },
          userTime: { type: 'time', value: stub.lockedBy.userTime },
        },
      dirname: { type: 'uri', value: stub.dirname },
      basename: { type: 'string', value: stub.basename },
      confidentiality: { type: 'uoctet', value: stub.confidentiality },
    });
    expect(decoded.properties).toHaveLength(stub.properties.length);
    for (let i = 0; i < stub.properties.length; i += 1) {
      expect(decoded.properties[i]).toMatchObject({
        name: { type: 'identifier', value: stub.properties[i].name },
        value: { type: 'double', symbol: stub.properties[i].value.toString() },
      });
      
    }
    expect(decoded.usersAccess).toHaveLength(stub.usersAccess.length);
    for (let i = 0; i < stub.usersAccess.length; i += 1) {
      expect(decoded.usersAccess[i]).toMatchObject({
        read: { type: 'boolean', value: stub.usersAccess[i].read },
        changeAccessRight: { type: 'boolean', value: stub.usersAccess[i].changeAccessRight },
        write: { type: 'boolean', value: stub.usersAccess[i].write },
        user: {
          login: { type: 'string', value: stub.usersAccess[i].user.login },
          password: { type: 'string', value: stub.usersAccess[i].user.password },
          profile: { type: 'string', value: stub.usersAccess[i].user.profile },
          userTime: { type: 'time', value: stub.usersAccess[i].user.userTime },
        },
      });
      
    }
    expect(decoded.profilesAccess).toHaveLength(stub.profilesAccess.length);
    for (let i = 0; i < stub.profilesAccess.length; i += 1) {
      expect(decoded.profilesAccess[i]).toMatchObject({
        read: { type: 'boolean', value: stub.profilesAccess[i].read },
        changeAccessRight: { type: 'boolean', value: stub.profilesAccess[i].changeAccessRight },
        write: { type: 'boolean', value: stub.profilesAccess[i].write },
        profile: {
          login: { type: 'string', value: stub.profilesAccess[i].profile.login },
          password: { type: 'string', value: stub.profilesAccess[i].profile.password },
          profile: { type: 'string', value: stub.profilesAccess[i].profile.profile },
          userTime: { type: 'time', value: stub.profilesAccess[i].profile.userTime },
        },
      });
      
    }
  });
});