import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Financing } from '~/components/pages/Financing';
import { Leasing } from '~/components/pages/Leasing';

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
          leasCarPrice,
          leasEndingRate,
          leasInitialPayment,
          leasMonthlyRate,
          leasRuntime,
        }) => {
          router.push(
            {
              query: {
                ...router.query,
                leasCarPrice,
                leasEndingRate,
                leasInitialPayment,
                leasMonthlyRate,
                leasRuntime,
              },
            },
            undefined,
            { shallow: true }
          );
        }}
        onBack={() => router.push({ query: { ...router.query, step: 'fin' } })}
      />
    );
  }
  return null;
};

export default Compare;
