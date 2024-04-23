import { ActionTypes, Leaderboard } from '@/lib/features/leaderboards/action';

type ActionReducer = {
  type: string;
  payload?: {
    leaderboards: Leaderboard[];
  };
};

export const leaderboardsReducer = (
  state: Leaderboard[] = [],
  action: ActionReducer
) => {
  switch (action.type) {
    case ActionTypes.FETCH_LEADERBOARDS:
      return action.payload?.leaderboards || state;
  }
  return state;
};
