import { screen } from '@testing-library/react';

import { renderWithProviders } from '@/__mocks__/wrapper';
import HomePage from '@/app/page';

/**
 * Test scenario for Homepage
 *
 * - Should display navbar component like Forum, Home, Leaderboard
 */

describe('Homepage test', () => {
  it('Should display navbar component like Forum, Home, Leaderboard', () => {
    renderWithProviders(<HomePage />);

    const forum = screen.getByText('Forum');
    const home = screen.getByText('Home');
    const leaderboard = screen.getByText('Leaderboard');
    const login = screen.getByText('Sign In');

    expect(forum).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(leaderboard).toBeInTheDocument();
    expect(login).toBeInTheDocument();
  });
});
