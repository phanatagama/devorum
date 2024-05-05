import { ThreadData } from '@/lib/features/threads/type';

import { ActionTypes } from './action';

type ActionReducer = {
  type: string;
  payload?: {
    threads: ThreadData[];
  };
};

export default function threadsReducer(
  state: ThreadData[] = [],
  action: ActionReducer
): ThreadData[] {
  switch (action.type) {
    case ActionTypes.FETCH_THREADS:
      return action.payload?.threads || state;
    default:
      return state;
  }
}
