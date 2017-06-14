const dataStub = require('common/protobuf/stubs');
const onFmdCreateData = require('./onFmdCreateData');

describe('controllers/client/onFmdCreateData', () => {
  it('should returns file info if success', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const mySuccessProto = dataStub.getSuccessStatusProtobuf();
    const myFileInfo = dataStub.getFMDFileInfo();
    const myFileInfoProto = dataStub.getFMDFileInfoProtobuf(myFileInfo);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        myFileInfo,
      ]);
      done();
    };
    onFmdCreateData(check, myQueryIdProto, mySuccessProto, myFileInfoProto);
  });
  it('should returns an error if fail', (done) => {
    const myQueryId = 'myQueryId';
    const myQueryIdProto = dataStub.getStringProtobuf(myQueryId);
    const myErrorProto = dataStub.getErrorStatusProtobuf();
    const myReason = 'myReason';
    const myReasonProto = dataStub.getStringProtobuf(myReason);

    const check = (...args) => {
      expect(args).toMatchObject([
        myQueryId,
        {
          err: myReason,
        },
      ]);
      done();
    };
    onFmdCreateData(check, myQueryIdProto, myErrorProto, myReasonProto);
  });
});
