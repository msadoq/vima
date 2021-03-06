// ====================================================================
// HISTORY
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Modify querySingleton => pass queryId as a parameter
// VERSION : 1.1.2 : DM : #6700 : 21/07/2017 : Create registeredArchiveQueriesSingleton models (
//  and its test)
// END-HISTORY
// ====================================================================

const { add,
  get,
  pop,
  getAll,
  remove,
  clear } = require('./registeredArchiveQueriesSingleton');

describe('models/registeredArchiveQueriesSingleton', () => {
  beforeEach(() => clear());
  test('add/get', () => {
    const queryId = 'myQueryID';
    add(queryId, 'myTbdId', 'range', 'myDataId', 45);
    expect(get(queryId)).toMatchObject({ tbdId: 'myTbdId', type: 'range', dataId: 'myDataId', samplingNumber: 45 });
  });
  test('pop', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range', 'myDataId1', 57);
    add(queryId2, 'myTbdId2', 'last');
    const queryPoped = pop(queryId1);
    expect(queryPoped).toMatchObject({ tbdId: 'myTbdId1', type: 'range', dataId: 'myDataId1', samplingNumber: 57 });
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('getAll', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range', 'myDataId1', 39);
    add(queryId2, 'myTbdId2', 'last');
    const expectedCollection = {};
    expectedCollection[queryId1] = { tbdId: 'myTbdId1', type: 'range', dataId: 'myDataId1', samplingNumber: 39 };
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('remove', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range', 'myDataId1', 13);
    add(queryId2, 'myTbdId2', 'last');
    remove(queryId1);
    const expectedCollection = {};
    expectedCollection[queryId2] = { tbdId: 'myTbdId2', type: 'last' };
    expect(getAll()).toMatchObject(expectedCollection);
  });
  test('clear', () => {
    const queryId1 = 'myQueryID1';
    const queryId2 = 'myQueryID2';
    add(queryId1, 'myTbdId1', 'range', 'range', 'myDataId1', 90);
    add(queryId2, 'myTbdId2', 'last');
    clear();
    expect(getAll()).toMatchObject({});
  });
});
