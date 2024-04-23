import { Owner } from '@/lib/features/threads_detail/action';
import { ActionTypes } from '@/lib/features/users/action';

type ActionReducer = {
  type: string;
  payload?: {
    users: Owner[];
  };
};

export const usersReducer = (
  state: Owner[] = [],
  action: ActionReducer
): Owner[] => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return action.payload?.users || state;
    case ActionTypes.FETCH_USERS_ERROR:
      return state;
    default:
      return state;
  }
};
