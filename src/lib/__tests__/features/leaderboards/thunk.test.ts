import { configureStore } from '@reduxjs/toolkit';

import {
  fetchLeaderboard,
  leaderboardReducer,
} from '@/lib/features/leaderboards/action';
import {
  ApiResponse,
  DataLeaderboard,
  Leaderboard,
} from '@/lib/features/leaderboards/type';
import logger from '@/lib/logger';

/**
 * Test scenario for fetchLeaderboards thunk
 *
 * - Should return list of leaderboards when fetch is success
 * - Should return empty when fetch is rejected
 */
describe('fetchLeaderboards thunk test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const leaderboards: Leaderboard[] = [
    {
      user: {
        id: 'user-mQhLzINW_w5TxxYf',
        name: 'Dimas Saputra',
        email: 'dimas@dicoding.com',
        avatar:
          'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
      },
      score: 25,
    },
    {
      user: {
        id: 'user-aROWej8yYA1sOfHN',
        name: 'Dicoding',
        email: 'admin@dicoding.com',
        avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
      },
      score: 0,
    },
  ];
  const response: ApiResponse<DataLeaderboard> = {
    message: 'success',
    status: 'success',
    data: { leaderboards },
  };
  it('Should return list of leaderboards when fetch is success', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });
    const store = configureStore({
      reducer: {
        leaderboards: leaderboardReducer,
      },
    });
    const rest = await store.dispatch(fetchLeaderboard());
    logger(rest);
    const currentLeaderboard = store.getState().leaderboards;

    expect(rest.type).toEqual('leaderboards/fetchLeaderboard/fulfilled');
    expect(currentLeaderboard).toEqual(leaderboards);
  });

  it('Should return empty when fetch is rejected', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.reject(response),
      });
    });
    const store = configureStore({
      reducer: {
        leaderboards: leaderboardReducer,
      },
    });
    const rest = await store.dispatch(fetchLeaderboard());
    logger(rest);
    const currentLeaderboard = store.getState().leaderboards;

    expect(rest.type).toEqual('leaderboards/fetchLeaderboard/rejected');
    expect(currentLeaderboard).toEqual([]);
  });
});
