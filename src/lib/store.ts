import { configureStore } from '@reduxjs/toolkit';

import { leaderboardsReducer } from '@/lib/features/leaderboards/reducer';
import { loadingReducer } from '@/lib/features/loading/reducer';
import profileReducer from '@/lib/features/profile/reducer';
import threadsReducer from '@/lib/features/threads/reducer';
import threadDetailReducer from '@/lib/features/threads_detail/reducer';
import { usersReducer } from '@/lib/features/users/reducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      threads: threadsReducer,
      detailThread: threadDetailReducer,
      leaderboards: leaderboardsReducer,
      users: usersReducer,
      profile: profileReducer,
      isLoading: loadingReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
