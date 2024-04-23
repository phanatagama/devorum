import { DataLeaderboard } from '@/lib/features/leaderboards/type';
import logger from '@/lib/logger';
import { AppDispatch } from '@/lib/store';

import { localhostUrl } from '@/constant/env';

export const ActionTypes = {
  FETCH_LEADERBOARDS: 'FETCH_LEADERBOARDS',
  FAILED_FETCH_LEADERBOARD: 'FAILED_FETCH_LEADERBOARD',
};

const fetchLeaderboardActionCreator = ({
  data: { leaderboards },
}: {
  data: DataLeaderboard;
}) => {
  return {
    type: ActionTypes.FETCH_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
};

const failedFetchLeaderboardActionCreator = () => {
  return {
    type: ActionTypes.FAILED_FETCH_LEADERBOARD,
  };
};

export function asyncfetchLeaderboard() {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await fetch(localhostUrl + '/leaderboards');
      const data = await res.json();
      if (data.status === 'fail') {
        dispatch(failedFetchLeaderboardActionCreator());
        return;
      }
      dispatch(fetchLeaderboardActionCreator(data));
    } catch (error) {
      // dispatch(failedFetchLeaderboardActionCreator());
      logger(error);
    }
  };
}
