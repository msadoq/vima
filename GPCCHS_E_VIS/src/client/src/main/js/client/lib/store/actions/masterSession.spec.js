import { UNKNOWN_SESSION_ID } from '../../constants';
import * as actions from './masterSession';
import { mockStore } from '../../common/test';

describe('store:actions:masterSession', () => {
  describe('updateMasterSessionIfNeeded', () => {
    it('does nothing with unknown session id', () => {
      const store = mockStore();
      store.dispatch(actions.updateMasterSessionIfNeeded(UNKNOWN_SESSION_ID));
      expect(store.getActions()).toEqual([]);
    });
    it('updates master session', () => {
      const store = mockStore();
      store.dispatch(actions.updateMasterSessionIfNeeded('masterSessionOid'));
      expect(store.getActions()).toEqual([
        {
          type: 'HSS_UPDATE_MASTER_SESSION',
          payload: { masterSessionOid: 'masterSessionOid' },
        },
      ]);
    });
  });
});
