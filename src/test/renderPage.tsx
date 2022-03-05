import { render } from '@testing-library/react';
import { useRouter } from 'next/router';

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

  render(ui);

  return { routerMock };
};
