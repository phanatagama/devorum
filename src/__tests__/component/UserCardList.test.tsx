import { act, screen } from '@testing-library/react';

import { Leaderboard } from '@/lib/features/leaderboards/type';

import UserCardList from '@/components/UserCardList';

import { renderWithProviders } from '@/__mocks__/wrapper';

/**
 * Test scenario for UserCardList component
 *
 * - Should show text with name and score based on data provided
 */
describe('UserCardList', () => {
  it('Should show text with name and score based on data provided', async () => {
    const leaderboards: Leaderboard[] = [
      {
        score: 25,
        user: {
          id: 'user-aROWej8yYA1sOfHN',
          name: 'Dicoding',
          email: 'admin@dicoding.com',
          avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
        },
      },
    ];
    await act(async () => {
      renderWithProviders(<UserCardList leaderboards={leaderboards} />);
    });
    expect(screen.getByText('Dicoding')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
