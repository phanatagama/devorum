import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import api from '@/lib/features/api';
import { Leaderboard } from '@/lib/features/leaderboards/type';

export const fetchLeaderboard = createAsyncThunk(
  'leaderboards/fetchLeaderboard',
  async () => {
    const data = await api.getLeaderBoards();
    return data;
  }
);

const leaderboardSlice = createSlice({
  name: 'leaderboards',
  initialState: [] satisfies [] as Leaderboard[],
  reducers: {
    addLeaderboard(
      state,
      action: PayloadAction<{ leaderboards: Leaderboard[] }>
    ) {
      return action.payload.leaderboards;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      return action.payload.data.leaderboards;
    });
    builder.addCase(fetchLeaderboard.rejected, (state) => {
      return state;
    });
    builder.addCase(fetchLeaderboard.pending, (state) => {
      return state;
    });
  },
});
export const { addLeaderboard } = leaderboardSlice.actions;
export const leaderboardReducer = leaderboardSlice.reducer;
