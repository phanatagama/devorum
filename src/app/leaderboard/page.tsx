'use client';
import { useEffect } from 'react';

import { fetchLeaderboard } from '@/lib/features/leaderboards/action';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

import Navbar from '@/components/Navbar';
import UserCardList from '@/components/UserCardList';

export default function LeaderboardPage() {
  const leaderboards = useAppSelector((state) => state.leaderboards);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <>
      <div className='pt-4'>
        <Navbar />
        <UserCardList leaderboards={leaderboards} />
      </div>
    </>
  );
}
