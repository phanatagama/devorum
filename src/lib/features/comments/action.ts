import { hideLoading, showLoading } from '@/lib/features/loading/action';
import { asyncfetchThreads } from '@/lib/features/threads/action';
import { asyncfetchThread } from '@/lib/features/threads_detail/action';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export function asyncPostComments({
  params,
  content,
}: {
  params: { id: string };
  content: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(showLoading());
    try {
      const response = await fetch(
        localhostUrl + `/threads/${params.id}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            content,
          }),
        }
      );
      if (response.ok) {
        // Handle successful form submission
        dispatch(asyncfetchThread(params.id));
        dispatch(asyncfetchThreads());
      } else {
        // Handle error
        alert('Failed to create comment');
      }
    } catch (error) {
      // Handle error
      alert('Failed to create comment');
    }
    dispatch(hideLoading());
  };
}
