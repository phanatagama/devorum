// import { hideLoading, showLoading } from '@/lib/features/loading/action';
import { hideLoading, showLoading } from 'react-redux-loading-bar';

import { asyncfetchThreads } from '@/lib/features/threads/action';
import { DataDetailThread } from '@/lib/features/threads_detail/type';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export const ActionTypes = {
  FETCH_THREADS: 'FETCH_THREADS',
  FAILED_FETCH_THREAD: 'FAILED_FETCH_THREAD',
};

const fetchThreadActionCreator = ({
  data: { detailThread },
}: {
  data: DataDetailThread;
}) => {
  return {
    type: ActionTypes.FETCH_THREADS,
    payload: {
      detailThread,
    },
  };
};

const failedFetchThreadActionCreator = () => {
  return {
    type: ActionTypes.FAILED_FETCH_THREAD,
  };
};

export function asyncfetchThread(id: string) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const res = await fetch(localhostUrl + '/threads/' + id);
      const data = await res.json();
      if (data.status === 'fail') {
        // alert('failed to fetch thread');
        // logger(data, 'asyncfetchThread failed');
        dispatch(failedFetchThreadActionCreator());
        return;
      }
      dispatch(fetchThreadActionCreator(data));
    } catch (error) {
      alert('failed to fetch thread');
    }
    dispatch(hideLoading());
  };
}

export function asyncPostThread({
  title,
  body,
  category,
}: {
  title: string;
  body: string;
  category: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const response = await fetch(localhostUrl + '/threads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title,
          body,
          category,
        }),
      });
      if (response.ok) {
        // Handle successful form submission
        dispatch(asyncfetchThreads());
      } else {
        // Handle error
        alert('Failed to create thread');
      }
    } catch (error) {
      // Handle error
      alert('Failed to create thread');
    }
    dispatch(hideLoading());
  };
}
