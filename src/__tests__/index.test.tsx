import { fireEvent, screen } from '@testing-library/react';

import { createMatchRegexSeparatedByTags } from '../test/matchRegexSeparatedByTags';

import Home from '~/pages';
import { renderPage } from '~/test/renderPage';

const matchTextSeparatedByTags = createMatchRegexSeparatedByTags(
  /Sie möchten wissen, ob Finanzierung oder Leasing die bessere Option für Sie ist?.*Hier finden Sie es heraus!/
);

describe('Home', () => {
  it('should work', () => {
    const { routerMock } = renderPage(<Home />, { pathname: '/' });

    expect(
      screen.getByRole('heading', { name: 'Finden Sie die beste Option' })
    ).toBeInTheDocument();
    expect(screen.queryByText(matchTextSeparatedByTags)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Jetzt vergleichen' }));
    expect(routerMock.push).toHaveBeenCalledTimes(1);
    expect(routerMock.push).toHaveBeenLastCalledWith({
      pathname: '/compare',
      query: { step: 'fin' },
    });
  });
});
