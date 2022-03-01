import { render, screen } from '@testing-library/react';

import { createMatchRegexSeparatedByTags } from '../test/matchRegexSeparatedByTags';

import Home from '~/pages';

const matchTextSeparatedByTags = createMatchRegexSeparatedByTags(
  /Sie möchten wissen, ob Finanzierung oder Leasing die bessere Option für Sie ist?.*Hier finden Sie es heraus!/
);

describe('Home', () => {
  it('should work', () => {
    render(<Home />);

    expect(
      screen.queryByText('Finden Sie die beste Option')
    ).toBeInTheDocument();
    expect(screen.queryByText(matchTextSeparatedByTags)).toBeInTheDocument();
  });
});
