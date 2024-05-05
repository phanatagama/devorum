import { hideLoading, showLoading } from '@/lib/features/loading/action';
import { DataThread } from '@/lib/features/threads/type';
import { showAlert } from '@/lib/helper';
import logger from '@/lib/logger';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export const ActionTypes = {
  FETCH_THREADS: 'FETCH_THREADS',
};

export const fetchThreadsActionCreator = ({
  data: { threads },
}: {
  data: DataThread;
}) => {
  return {
    type: ActionTypes.FETCH_THREADS,
    payload: {
      threads,
    },
  };
};

export function asyncfetchThreads() {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const res = await fetch(localhostUrl + '/threads');
      const data = await res.json();
      dispatch(fetchThreadsActionCreator(data));
    } catch (error) {
      logger(error, `failed to fetch threads ${process.env.PROJECT_URL}`);
      showAlert(
        `failed to fetch threads ${localhostUrl}/threads || vercel: ${process.env.PROJECT_URL}`,
      );
    }
    dispatch(hideLoading());
  };
}
