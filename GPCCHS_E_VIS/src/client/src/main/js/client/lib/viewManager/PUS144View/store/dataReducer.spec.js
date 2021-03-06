import pus144DataReducer from 'viewManager/PUS144View/store/dataReducer';
import { INJECT_PUS_DATA } from '../../../store/types';

describe('viewManager/PUS144View/store/dataReducer', () => {
  it('should replace constants', () => {
    const state = {
      PUS144ViewData: {},
    };
    const action = {
      type: INJECT_PUS_DATA,
      payload: {
        viewId: 'PUS144View',
        data: {
          PUS144View: {
            foo: 'foo',
            bar: 'bar',
            pus144OnboardFiles: [
              {
                partitionId: 'mySTRING',
                fileId: 100,
                fileType: 'mySTRING',
                fileSize: 100,
                isFileSizeSet: false,
                lastUpdateModeFileSize: '1',
                lastUpdateTimeFileSize: 'mySTRING',
                fileCreationTime: 'mySTRING',
                fileProtectionStatus: '2',
                fileMode: '2',
                fileAddress: 'mySTRING',
                uploadedFileChecksum: 'mySTRING',
                computedFileChecksum: 'mySTRING',
                lastUpdateModeOnBoardFileId: '1',
                lastUpdateModeFileProtectionStatus: '1',
                lastUpdateModeFileAddress: '1',
                lastUpdateModeFileMode: '1',
                lastUpdateModeFileType: '1',
                lastUpdateModeUploadedChecksum: '2',
                lastUpdateModeFileCreationTime: '3',
                lastUpdateModeComputedChecksum: '4',
                lastUpdateTimeOnBoardFileId: 'mySTRING',
                lastUpdateTimeFileProtectionStatus: 'mySTRING',
                lastUpdateTimeFileAddress: 'mySTRING',
                lastUpdateTimeFileMode: 'mySTRING',
                lastUpdateTimeFileType: 'mySTRING',
                lastUpdateTimeUploadedChecksum: 'mySTRING',
                lastUpdateTimeFileCreationTime: 'mySTRING',
                lastUpdateTimeComputedChecksum: 'mySTRING',
              },
              {
                partitionId: 'mySTRING',
                fileId: 100,
                fileType: 'mySTRING',
                fileSize: 100,
                isFileSizeSet: true,
                lastUpdateModeFileSize: '2',
                lastUpdateTimeFileSize: 'mySTRING',
                fileCreationTime: 'mySTRING',
                fileProtectionStatus: '1',
                fileMode: '1',
                fileAddress: 'mySTRING',
                uploadedFileChecksum: 'mySTRING',
                computedFileChecksum: 'mySTRING2',
                lastUpdateModeOnBoardFileId: '2',
                lastUpdateModeFileProtectionStatus: '2',
                lastUpdateModeFileAddress: '2',
                lastUpdateModeFileMode: '2',
                lastUpdateModeFileType: '2',
                lastUpdateModeUploadedChecksum: '3',
                lastUpdateModeFileCreationTime: '4',
                lastUpdateModeComputedChecksum: '200',
                lastUpdateTimeOnBoardFileId: 'mySTRING',
                lastUpdateTimeFileProtectionStatus: 'mySTRING',
                lastUpdateTimeFileAddress: 'mySTRING',
                lastUpdateTimeFileMode: 'mySTRING',
                lastUpdateTimeFileType: 'mySTRING',
                lastUpdateTimeUploadedChecksum: 'mySTRING',
                lastUpdateTimeFileCreationTime: 'mySTRING',
                lastUpdateTimeComputedChecksum: 'mySTRING',
              },
            ],
          },
        },
      },
    };
    expect(pus144DataReducer(state, action)).toEqual({
      PUS144ViewData: {
        foo: 'foo',
        bar: 'bar',
        tables: {
          onBoardPartitions: {
            data: [
              {
                partitionId: 'mySTRING',
                fileId: 100,
                fileType: 'mySTRING',
                fileSize: '',
                isFileSizeSet: false,
                fileCreationTime: 'mySTRING',
                fileProtectionStatus: 'DELETE ENABLED',
                fileMode: 'CLOSED',
                fileAddress: 'mySTRING',
                uploadedFileChecksum: 'mySTRING',
                computedFileChecksum: 'mySTRING',
                isChecksumOk: true,
                lastUpdateModeOnBoardFileId: 'TC',
                lastUpdateModeFileProtectionStatus: 'TC',
                lastUpdateModeFileAddress: 'TC',
                lastUpdateModeFileMode: 'TC',
                lastUpdateModeFileType: 'TC',
                lastUpdateModeFileSize: '1',
                lastUpdateModeUploadedChecksum: 'TM',
                lastUpdateModeFileCreationTime: 'Default',
                lastUpdateModeComputedChecksum: 'Timer',
                lastUpdateTimeOnBoardFileId: 'mySTRING',
                lastUpdateTimeFileProtectionStatus: 'mySTRING',
                lastUpdateTimeFileAddress: 'mySTRING',
                lastUpdateTimeFileMode: 'mySTRING',
                lastUpdateTimeFileType: 'mySTRING',
                lastUpdateTimeFileSize: 'mySTRING',
                lastUpdateTimeUploadedChecksum: 'mySTRING',
                lastUpdateTimeFileCreationTime: 'mySTRING',
                lastUpdateTimeComputedChecksum: 'mySTRING',
              },
              {
                partitionId: 'mySTRING',
                fileId: 100,
                fileType: 'mySTRING',
                fileSize: 100,
                isFileSizeSet: true,
                lastUpdateModeFileSize: 'TM',
                lastUpdateTimeFileSize: 'mySTRING',
                fileCreationTime: 'mySTRING',
                fileProtectionStatus: 'DELETE DISABLED',
                fileMode: 'OPENED',
                fileAddress: 'mySTRING',
                uploadedFileChecksum: 'mySTRING',
                computedFileChecksum: 'mySTRING2',
                isChecksumOk: false,
                lastUpdateModeOnBoardFileId: 'TM',
                lastUpdateModeFileProtectionStatus: 'TM',
                lastUpdateModeFileAddress: 'TM',
                lastUpdateModeFileMode: 'TM',
                lastUpdateModeFileType: 'TM',
                lastUpdateModeUploadedChecksum: 'Default',
                lastUpdateModeFileCreationTime: 'Timer',
                lastUpdateModeComputedChecksum: '',
                lastUpdateTimeOnBoardFileId: 'mySTRING',
                lastUpdateTimeFileProtectionStatus: 'mySTRING',
                lastUpdateTimeFileAddress: 'mySTRING',
                lastUpdateTimeFileMode: 'mySTRING',
                lastUpdateTimeFileType: 'mySTRING',
                lastUpdateTimeUploadedChecksum: 'mySTRING',
                lastUpdateTimeFileCreationTime: 'mySTRING',
                lastUpdateTimeComputedChecksum: 'mySTRING',
              },
            ],
            keep: [0, 1],
          },
        },
      },
    });
  });
});
