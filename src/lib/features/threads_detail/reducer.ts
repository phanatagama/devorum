import { DetailThread } from '@/lib/features/threads_detail/type';
import logger from '@/lib/logger';

import { ActionTypes } from './action';

type ActionReducer = {
  type: string;
  payload?: {
    detailThread: DetailThread;
  };
};

export const initialDetailThreadState: DetailThread = {
  id: '',
  title: '',
  body: '',
  category: '',
  createdAt: '',
  totalComments: 0,
  ownerId: '',
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
  owner: {
    id: '',
    name: '',
    avatar: '',
    email: '',
  },
};
export default function threadDetailReducer(
  state: DetailThread = initialDetailThreadState,
  action: ActionReducer
): DetailThread {
  switch (action.type) {
    case ActionTypes.FETCH_THREADS:
      logger(action.payload?.detailThread);
      return action.payload?.detailThread || state;
    case ActionTypes.FAILED_FETCH_THREAD:
      return initialDetailThreadState;
  }
  return state;
}
