import { ActionTypes } from '@/lib/features/profile/action';
import { Owner } from '@/lib/features/threads_detail/type';

type ActionReducer = {
  type: string;
  payload?: {
    user: Owner;
  };
};

const initialState: Owner = {
  id: '',
  name: '',
  avatar: '',
};
export default function profileReducer(
  state: Owner = initialState,
  action: ActionReducer
): Owner {
  switch (action.type) {
    case ActionTypes.FETCH_PROFILE:
      return action.payload?.user || state;
    case ActionTypes.FETCH_PROFILE_ERROR:
      return state;
    default:
      return state;
  }
}
