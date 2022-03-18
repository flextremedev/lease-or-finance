import { fireEvent, screen } from '@testing-library/react';

import messagesDE from '../messages/de.json';
import { createMatchRegexSeparatedByTags } from '../test/matchRegexSeparatedByTags';

import Home, { getStaticProps } from '~/pages';
import { renderPage } from '~/test/renderPage';

const matchTextSeparatedByTags = createMatchRegexSeparatedByTags(
  /You want to know whether financing or leasing is the better option for you\? Find out here!/
);

describe('Home', () => {
  it('should work', () => {
    const { routerMock } = renderPage(<Home />, { pathname: '/' });

    expect(
      screen.getByRole('heading', { name: 'Find the best option' })
    ).toBeInTheDocument();
    expect(screen.queryByText(matchTextSeparatedByTags)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /compare now/i }));
    expect(routerMock.push).toHaveBeenCalledTimes(1);
    expect(routerMock.push).toHaveBeenLastCalledWith({
      pathname: '/compare',
      query: { step: 'fin' },
    });
  });
  it('should inject messages', async () => {
    expect(await getStaticProps({ locale: 'de' })).toEqual({
      props: { messages: messagesDE },
    });
  });
});
