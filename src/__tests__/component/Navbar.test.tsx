import { screen } from '@testing-library/react';

import Navbar from '@/components/Navbar';

import { renderWithProviders } from '@/__mocks__/wrapper';
/**
 * Test scenario for Navbar component
 *
 *  - Should display Leaderboard, Home, Forum, Sign In when render is correctly
 */

describe('Navbar test', () => {
  it('Should display Leaderboard, Home, Forum, Sign In when render is correctly', async () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Forum')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
