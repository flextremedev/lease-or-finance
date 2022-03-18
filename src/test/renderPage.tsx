import { render } from '@testing-library/react';
import { IntlProvider } from 'next-intl';
import { useRouter } from 'next/router';

import messages from '../messages/en.json';

import { buildRouterMock, Options } from './routerMock';

export type RenderPageResult = {
  routerMock: ReturnType<typeof buildRouterMock>;
};

export const renderPage = (
  ui: React.ReactElement,
  routerOptions: Options
): RenderPageResult => {
  const routerMock = buildRouterMock(routerOptions);
  (useRouter as jest.Mock).mockReturnValue(routerMock);

  render(
    <IntlProvider locale="en" messages={messages}>
      {ui}
    </IntlProvider>
  );

  return { routerMock };
};
