import { Owner } from '@/lib/features/threads_detail/type';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export const ActionTypes = {
  FETCH_PROFILE: 'FETCH_PROFILE',
  FETCH_PROFILE_ERROR: 'FETCH_PROFILE_ERROR',
};

export const fetchProfileActionCreator = ({ user }: { user: Owner }) => ({
  type: ActionTypes.FETCH_PROFILE,
  payload: { user },
});

export const fetchProfileErrorActionCreator = () => ({
  type: ActionTypes.FETCH_PROFILE_ERROR,
});

export function asyncGetProfile() {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(localhostUrl + '/users/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await res.json();
      dispatch(fetchProfileActionCreator(data.data));
    } catch (error) {
      dispatch(fetchProfileErrorActionCreator());
    }
  };
}
