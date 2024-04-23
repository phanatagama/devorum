import { Owner } from '@/lib/features/threads_detail/type';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export const ActionTypes = {
  FETCH_USERS: 'FETCH_USERS',
  FETCH_USERS_ERROR: 'FETCH_USERS_ERROR',
};

export const fetchUsersActionCreator = ({ users }: { users: Owner[] }) => ({
  type: ActionTypes.FETCH_USERS,
  payload: {
    users: users,
  },
});

const fetchUsersFailedActionCreator = () => ({
  type: ActionTypes.FETCH_USERS_ERROR,
});

export const asyncFetchUsers = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const response = await fetch(localhostUrl + '/users');
      const data = await response.json();
      dispatch(fetchUsersActionCreator({ users: data.data.users }));
    } catch (e) {
      dispatch(fetchUsersFailedActionCreator());
    }
  };
};
