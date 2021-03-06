// ====================================================================
// HISTORY
// VERSION : 1.1.0 : : : 28/02/2017 : Initial version
// VERSION : 1.1.2 : DM : #3622 : 07/03/2017 : Snapshot : various fixes, propStubs and mocks.
// VERSION : 1.1.2 : FA : #6670 : 13/06/2017 : Fix Timebar jest snapshots .
// END-HISTORY
// ====================================================================

import TimebarFixture from './Timebar';

const Timelines = [
  {
    id: 'Session 1',
    uuid: '1234',
    offset: 200,
    kind: 'Session',
    sessionName: 'Master',
    color: '#fa1289',
    timelineUuid: 'gfdqsd-456788',
    timebarUuid: TimebarFixture.timebarUuid,
  },
  {
    id: 'Session 2',
    uuid: 'abcd',
    offset: 1000,
    kind: 'Session',
    sessionName: 'Session 2',
    color: null,
    timelineUuid: 'gfdqsd-456789',
    timebarUuid: TimebarFixture.timebarUuid,
  },
];

export default Timelines;
