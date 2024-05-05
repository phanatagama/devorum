import { render } from '@testing-library/react';

import Skeleton from '@/components/Skeleton';

describe('Skeleton test', () => {
  it('Should render correctly', () => {
    const { container } = render(<Skeleton />);
    expect(container).toMatchSnapshot();
  });
});
