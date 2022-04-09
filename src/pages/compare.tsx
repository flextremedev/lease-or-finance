import type { GetStaticPropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';

import { Financing } from '~/components/pages/Financing';
import { Leasing } from '~/components/pages/Leasing';
import { Result } from '~/components/pages/Result';

const Compare: NextPage = () => {
  const router = useRouter();

  if (router.query.step === 'fin') {
    return (
      <Financing
        onNext={({
          finCarPrice,
          finEndingRate,
          finInitialPayment,
          finMonthlyRate,
          finRuntime,
        }) => {
          router.push(
            {
              query: {
                ...router.query,
                step: 'leas',
                finCarPrice,
                finEndingRate,
                finInitialPayment,
                finMonthlyRate,
                finRuntime,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        onBack={() => router.push('/')}
      />
    );
  } else if (router.query.step === 'leas') {
    return (
      <Leasing
        onNext={({
          leasEndingRate,
          leasInitialPayment,
          leasMonthlyRate,
          leasRuntime,
        }) => {
          router.push(
            {
              query: {
                ...router.query,
                leasEndingRate,
                leasInitialPayment,
                leasMonthlyRate,
                leasRuntime,
                step: 'result',
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        onBack={() => router.push({ query: { ...router.query, step: 'fin' } })}
      />
    );
  } else if (router.query.step === 'result') {
    return (
      <Result
        onRestart={() => router.push({ query: { step: 'fin' } })}
        onBack={() => router.push({ query: { ...router.query, step: 'leas' } })}
      />
    );
  }
  return null;
};

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default,
    },
  };
}

export default Compare;
