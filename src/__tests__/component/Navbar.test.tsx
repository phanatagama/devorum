import { screen } from '@testing-library/react';

import Navbar from '@/components/Navbar';

import { renderWithProviders } from '@/__mocks__/wrapper';

describe('test navbar', () => {
  it('should render correctly', async () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Leaderboard')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Forum')).toBeInTheDocument();
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
