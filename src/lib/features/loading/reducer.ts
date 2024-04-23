import { ActionTypes } from '@/lib/features/loading/action';

type ActionReducer = {
  type: string;
  payload?: {
    isLoading: boolean;
  };
};

export function loadingReducer(state = false, action: ActionReducer): boolean {
  switch (action.type) {
    case ActionTypes.SHOW_LOADING:
      return true;
    case ActionTypes.HIDE_LOADING:
      return false;
    default:
      return state;
  }
}
