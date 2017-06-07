/* eslint no-unused-expressions: 0 */
import '../../common/test';
import filter from './timelines';

describe('viewManager/commonData/timelines', () => {
  const list = [
    { id: 'tl1', sessionName: 'session1', offset: 0 },
    { id: 'tl2', sessionName: 'session2', offset: 10 },
    { id: 'other', sessionName: 'sessionOther', offset: -10 },
    { id: undefined, sessionName: 'invalid', offset: 0 },
  ];
  it('exact', () => {
    expect(filter(list, 'tl1')).toEqual({ sessionName: 'session1', offset: 0 });
  });
  it('wildcard', () => {
    expect(filter(list, '*')).toEqual({ sessionName: '*', offset: 0 });
    expect(filter(list, 'tl*')).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
  it('no timeline', () => {
    expect(filter(undefined, 'tl1')).toEqual({ error: 'invalid entry point, no timeline available' });
    expect(filter([], 'tl1')).toEqual({ error: 'invalid entry point, no timeline available' });
  });
  it('no search', () => {
    expect(filter(list, '')).toEqual({ error: 'invalid entry point, no timeline set' });
  });
  it('no match', () => {
    expect(filter(list, 'unknown')).toEqual({ error: 'invalid entry point, no timeline matches' });
  });
});
