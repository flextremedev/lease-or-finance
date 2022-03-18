import * as React from 'react';

import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Layout } from '~/components/Layout';
import { ResultImage } from '~/components/ResultImage';
import { Stepper } from '~/components/Stepper';

const calculateTotalPrice = (
  monthlyRate: number,
  runtime: number,
  initialPayment: number,
  endingRate: number
) => {
  return runtime * monthlyRate + initialPayment + endingRate;
};

const calculateValueAfterMonths = (value: number, months: number) => {
  const years = Math.round(months / 12);
  let valueTemp = value;
  for (let i = 1; i <= years; i++) {
    valueTemp = i === 1 ? valueTemp * 0.75 : valueTemp * 0.95;
  }
  return valueTemp;
};

type ResultProps = {
  onRestart: () => void;
  onBack: () => void;
};

export const Result = ({ onBack, onRestart }: ResultProps) => {
  const t = useTranslations('Result');
  const tC = useTranslations('Common');

  const { query } = useRouter();

  const {
    finCarPrice,
    finEndingRate,
    finInitialPayment,
    finMonthlyRate,
    finRuntime,
    leasEndingRate,
    leasInitialPayment,
    leasMonthlyRate,
    leasRuntime,
  } = query as Record<string, string>;

  const finResidualValue = calculateValueAfterMonths(
    Number(finCarPrice),
    Number(finRuntime)
  );

  const leasTotalPrice = calculateTotalPrice(
    Number(leasMonthlyRate),
    Number(leasRuntime),
    Number(leasInitialPayment),
    Number(leasEndingRate)
  );

  const finTotalPrice = calculateTotalPrice(
    Number(finMonthlyRate),
    Number(finRuntime),
    Number(finInitialPayment),
    Number(finEndingRate)
  );

  const finCostsEffective = (
    (finTotalPrice - finResidualValue) /
    Number(finRuntime)
  ).toFixed();
  const leasCostsEffective = (leasTotalPrice / Number(leasRuntime)).toFixed();

  const results = [
    {
      label: t('totalPayment'),
      leas: '-',
      fin: finCarPrice,
      isComparable: false,
    },
    {
      label: t('residualValueAfterTerm'),
      leas: '-',
      fin: finResidualValue,
      isComparable: false,
    },
    {
      label: t('costsForTerm'),
      leas: leasTotalPrice,
      fin: finTotalPrice - finResidualValue,
    },
    {
      label: t('monthlyCosts'),
      leas: leasCostsEffective,
      fin: finCostsEffective,
    },
  ];
  const winner =
    Number(finCostsEffective) < Number(leasCostsEffective) ? 'fin' : 'leas';
  const winnerMonthlyRate = winner === 'fin' ? finMonthlyRate : leasMonthlyRate;
  const winnerRuntime = winner === 'fin' ? finRuntime : leasRuntime;
  const winnerLabel = { fin: tC('financing'), leas: tC('leasing') }[winner];
  const loser = { leas: 'fin', fin: 'leas' }[winner];
  const loserLabel = { fin: tC('financing'), leas: tC('leasing') }[loser];
  const winnerCostsEffective =
    winner === 'fin' ? finCostsEffective : leasCostsEffective;
  const loserCostsEffective =
    winner !== 'fin' ? finCostsEffective : leasCostsEffective;

  const difference = Number(loserCostsEffective) - Number(winnerCostsEffective);

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <Layout backgroundImage={<ResultImage />}>
        <Stepper activeStep={3} />
        <Heading
          as="h1"
          size="2xl"
          mt={{ base: 0, md: '1em' }}
          mb="1em"
          fontWeight="black"
        >
          {t('title')}
        </Heading>
        <Box borderRadius="md" bgColor="brand.500" color="white" p={6} mb={8}>
          {t.rich('summary', {
            winnerMonthlyRate,
            winnerRuntime,
            winnerLabel,
            loserCostsEffective,
            winnerCostsEffective,
            difference,
            loserLabel,
            strong: (children) => <strong>{children}</strong>,
          })}
        </Box>
        <Flex justify="space-between" mb={4}>
          <Heading as="h2" size="md">
            {tC('financing')}
          </Heading>
          <Heading as="h2" size="md">
            {tC('leasing')}
          </Heading>
        </Flex>
        {results.map(({ fin, label, leas, isComparable }) => {
          return (
            <Box
              key={label}
              borderBottom="1px solid"
              borderBottomColor="gray.200"
            >
              <Flex h="16" alignItems="center">
                <Flex
                  flex={1}
                  color={
                    isComparable === false
                      ? 'black'
                      : winner === 'fin'
                      ? 'green.700'
                      : 'red.500'
                  }
                  data-testid={`${label
                    .replaceAll(' ', '-')
                    .replaceAll('.', '')}-${tC('financing')}`.toLowerCase()}
                >
                  {fin}
                </Flex>
                <Flex>
                  <Heading as="h3" size="xs">
                    {label}
                  </Heading>
                </Flex>
                <Flex
                  flex={1}
                  color={
                    isComparable === false
                      ? 'black'
                      : winner === 'leas'
                      ? 'green.700'
                      : 'red.500'
                  }
                  data-testid={`${label
                    .replaceAll(' ', '-')
                    .replaceAll('.', '')}-${tC('leasing')}`.toLowerCase()}
                  justify="flex-end"
                >
                  {leas}
                </Flex>
              </Flex>
            </Box>
          );
        })}
        <HStack spacing={4} justify="end" alignSelf="stretch" mt={8}>
          <Button variant="ghost" colorScheme="brand" onClick={onBack}>
            {tC('back')}
          </Button>
          <Button variant="outline" colorScheme="brand" onClick={onRestart}>
            {t('restart')}
          </Button>
        </HStack>
      </Layout>
    </>
  );
};
