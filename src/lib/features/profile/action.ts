import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from '@/lib/features/api';

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async () => {
    const res = await api.getProfile();
    return res;
  }
);

export const getProfile = createSlice({
  name: 'profile',
  initialState: {
    user: {
      id: '',
      name: '',
      email: '',
      avatar: '',
    },
  },
  reducers: {
    addProfile(state, action) {
      return {
        user: action.payload.user,
      };
    },
    fetchProfileError(state) {
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      if (action.payload.data === undefined) {
        return state;
      }
      return {
        user: action.payload.data.user,
      };
    });
    builder.addCase(fetchProfile.rejected, (state) => {
      return state;
    });
    builder.addCase(fetchProfile.pending, (state) => {
      return state;
    });
  },
});

export const profileReducer = getProfile.reducer;
export const { addProfile, fetchProfileError } = getProfile.actions;
