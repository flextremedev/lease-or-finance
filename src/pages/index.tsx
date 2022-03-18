import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Home } from '~/components/pages/Home';

const App: NextPage = () => {
  const router = useRouter();

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
