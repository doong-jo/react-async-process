import { MainState, MainAction } from './types';
import { SET_PRODUCT, SET_RESERVATION } from './action';

export default function reducer(
  state: MainState,
  action: MainAction
): MainState {
  switch (action.type) {
    case SET_PRODUCT:
      Object.assign(state.product, action.draftValue);
      return { ...state };

    case SET_RESERVATION:
      Object.assign(state.reservation, action.draftValue);
      return { ...state };

    default:
      throw new Error(`unexpected action.type: ${action.type}`);
  }
}
