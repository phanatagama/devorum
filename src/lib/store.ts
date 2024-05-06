import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';

// import reducer asfrom '@/lib/features/leaderboards/action';
import { leaderboardReducer } from '@/lib/features/leaderboards/action';
import { loadingReducer } from '@/lib/features/loading/reducer';
import { profileReducer } from '@/lib/features/profile/action';
import threadsReducer from '@/lib/features/threads/reducer';
import threadDetailReducer from '@/lib/features/threads_detail/reducer';
import { usersReducer } from '@/lib/features/users/reducer';

const rootReducer = combineReducers({
  threads: threadsReducer,
  detailThread: threadDetailReducer,
  leaderboards: leaderboardReducer,
  users: usersReducer,
  profile: profileReducer,
  isLoading: loadingReducer,
  loadingBar: loadingBarReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    // middleware: () => new Tuple(loadingBarMiddleware()),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];
