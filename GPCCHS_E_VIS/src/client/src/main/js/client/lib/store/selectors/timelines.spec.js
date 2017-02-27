import { should, getStore } from '../../common/test';
import { getTimeline } from './timelines';

describe('store:timelines:selectors', () => {
  it('getTimeline', () => {
    const { getState } = getStore({
      timelines: {
        myTimelineId: { id: 'Id' },
      },
    });
    getTimeline(getState(), { timelineUuid: 'myTimelineId' }).should.have.property('id', 'Id');
    should.not.exist(getTimeline(getState(), { timelineUuid: 'unknownId' }));
  });
});
