import { render, screen } from '@testing-library/react';

import Skeleton from '@/components/Skeleton';
/**
 * Test scenario for Skeleton component
 *
 * - Should display element with class animate-shimmer when render is correctly
 */
describe('Skeleton test', () => {
  it('Should display element with class animate-shimmer when render is correctly', () => {
    render(<Skeleton />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveClass('animate-shimmer');
  });
});
