import { render, screen } from '@testing-library/react';

import Home from '~/pages';

describe('Home', () => {
  it('should work', () => {
    render(<Home />);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
