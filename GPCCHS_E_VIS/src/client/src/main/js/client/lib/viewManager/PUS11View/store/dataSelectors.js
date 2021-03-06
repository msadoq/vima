import { getViewTitle } from 'store/reducers/views/index';
import _getOr from 'lodash/fp/getOr';
import { VM_VIEW_PUS11 } from '../../constants';

const getFullTitle = getViewTitle;
const PUS11Data = `${VM_VIEW_PUS11}Data`;
const PUS11Configuration = `${VM_VIEW_PUS11}Configuration`;

export const getData = (state, { viewId }) => state[PUS11Data][viewId];

const getEntryPointsByViewId = (state, { viewId }) => (
  _getOr([], [PUS11Configuration, viewId, 'entryPoints'], state)
);

export default {
  getEntryPointsByViewId,
  getFullTitle,
};
