import {
  addLeaderboard,
  leaderboardReducer,
} from '@/lib/features/leaderboards/action';
import { Leaderboard } from '@/lib/features/leaderboards/type';

describe('Leaderboards reducer test', () => {
  it('Should return empty when type is not recognized', () => {
    const result = leaderboardReducer([], { type: 'UNKNOWN' });
    expect(result).toEqual([]);
  });

  it('Should return list of leaderboards when action is addLeaderBoard', () => {
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
    const result = leaderboardReducer([], addLeaderboard({ leaderboards }));
    expect(result).toEqual(leaderboards);
  });
});
