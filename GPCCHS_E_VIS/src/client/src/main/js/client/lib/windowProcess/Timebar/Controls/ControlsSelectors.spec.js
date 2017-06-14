import {
  getMasterTimelineById,
  getTimeSetterMessages,
  getMasterTimelineExists,
  getCurrentSessionExists,
  getCurrentSessionId,
} from './ControlsSelectors';

describe('windowProcess:Timebar:Controls:ControlsSelector', () => {
  describe('getMasterTimelineById', () => {
    it('should return master timeline', () => {
      expect(getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline01',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      )).toEqual({
        id: 'timeline01',
      });
    });
    it('should not find master timeline', () => {
      expect(getMasterTimelineById(
        {
          timebars: {
            myId: {
              masterId: 'timeline04',
            },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      )).toBeFalsy();
    });
    it('no master timeline', () => {
      expect(getMasterTimelineById(
        {
          timebars: {
            myId: { },
          },
          timelines: {
            timeline_01: { id: 'timeline01' },
            timeline_02: { id: 'timeline02' },
            timeline_03: { id: 'timeline03' },
          },
          timebarTimelines: {
            myId: ['timeline_01', 'timeline_02'],
          },
        },
        { timebarUuid: 'myId' }
      )).toBeFalsy();
    });
  });
  describe('getMasterTimelineExists', () => {
    it('returns true', () => {
      const state = {
        timebars: {
          myId: {
            masterId: 'timeline01',
          },
        },
        timelines: {
          timeline_01: { id: 'timeline01' },
          timeline_02: { id: 'timeline02' },
          timeline_03: { id: 'timeline03' },
        },
        timebarTimelines: {
          myId: ['timeline_01', 'timeline_02'],
        },
      };
      expect(getMasterTimelineExists(state, { timebarUuid: 'myId' })).toBe(true);
    });
    it('returns false', () => {
      expect(getMasterTimelineExists({}, {})).toBe(false);
    });
  });
  describe('getCurrentSessionExists', () => {
    it('returns false', () => {
      expect(getCurrentSessionExists({}, {})).toBe(false);
    });
    it('returns true', () => {
      const state = {
        timebars: {
          myId: {
            masterId: 'timeline01',
          },
        },
        timelines: {
          timeline_01: { id: 'timeline01', sessionName: 'mySession' },
        },
        timebarTimelines: {
          myId: ['timeline_01'],
        },
        sessions: [
          { id: 1, name: 'mySession' },
        ],
      };
      expect(getCurrentSessionExists(state, { timebarUuid: 'myId' })).toBe(true);
    });
  });
  describe('getCurrentSessionId', () => {
    const state = {
      timebars: {
        myId: {
          masterId: 'timeline01',
        },
      },
      timelines: {
        timeline_01: { id: 'timeline01', sessionName: 'mySession' },
      },
      timebarTimelines: {
        myId: ['timeline_01'],
      },
      sessions: [
        { id: 1, name: 'mySession' },
      ],
    };
    it('returns 1', () => {
      expect(getCurrentSessionId(state, { timebarUuid: 'myId' })).toEqual(1);
    });
    it('returns null', () => {
      expect(getCurrentSessionId(state, { timebarUuid: 'toto' })).toBeFalsy();
    });
  });
  describe('getTimeSetterMessages', () => {
    const state = {
      messages: {
        'timeSetter-tbuuid': true,
      },
    };
    it('should returns timeSetter messages', () => {
      expect(getTimeSetterMessages(state, { timebarUuid: 'tbuuid' })).toBe(true);
    });
    it('should returns null', () => {
      expect(getTimeSetterMessages(state, { timebarUuid: 'unknown' })).toBeFalsy();
    });
  });
});
