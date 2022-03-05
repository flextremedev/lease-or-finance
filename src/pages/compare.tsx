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
            `/compare?step=fin&finCarPrice=${finCarPrice}&finEndingRate=${finEndingRate}&finInitialPayment=${finInitialPayment}&finMonthlyRate=${finMonthlyRate}&finRuntime=${finRuntime}`,
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
