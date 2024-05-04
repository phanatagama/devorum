import { configureStore } from '@reduxjs/toolkit';

import { ApiResponse } from '@/lib/features/leaderboards/type';
import { fetchProfile, profileReducer } from '@/lib/features/profile/action';
import { Owner } from '@/lib/features/threads_detail/type';
import logger from '@/lib/logger';

describe('thunk', () => {
  const user: Owner = {
    id: 'user-aROWej8yYA1sOfHN',
    name: 'Dicoding',
    email: 'admin@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
  };

  const response: ApiResponse<{ user: Owner }> = {
    message: 'success',
    status: 'success',
    data: { user },
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return data profile', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve(response),
      });
    });

    const store = configureStore({
      reducer: {
        profile: profileReducer,
      },
    });
    const rest = await store.dispatch(fetchProfile());
    logger(rest);
    const currentThread = store.getState().profile;

    expect(rest.type).toEqual('profile/fetchProfile/fulfilled');
    expect(currentThread).toEqual(response.data);
  });

  it('name should empty when fetch is rejected', async () => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.reject(response),
      });
    });

    const store = configureStore({
      reducer: {
        profile: profileReducer,
      },
    });
    const rest = await store.dispatch(fetchProfile());
    const currentThread = store.getState().profile;
    expect(rest.type).toEqual('profile/fetchProfile/rejected');
    expect(currentThread.user.name).toEqual('');
  });
});
