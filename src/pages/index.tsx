import * as React from 'react';

import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Home } from '~/components/pages/Home';

const App: NextPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    router.prefetch('/compare');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Home
      onNext={() => {
        router.push({ pathname: '/compare', query: { step: 'fin' } });
      }}
    />
  );
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

export default App;
