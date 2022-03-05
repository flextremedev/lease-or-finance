import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { Financing } from '~/components/pages/Financing';

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
  }
  return null;
};

export default Compare;
