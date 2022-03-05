export type Options = {
  pathname: string;
  query?: Record<string, string | string[]>;
};

export const buildRouterMock = (
  { pathname, query = {} }: Options = { pathname: '/' }
) => ({
  query,
  pathname,
  events: { on: jest.fn(), off: jest.fn() },
  replace: jest.fn(),
  push: jest.fn(),
  prefetch: jest.fn(),
});
