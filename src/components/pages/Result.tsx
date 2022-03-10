import * as React from 'react';

import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Layout } from '../Layout';
import { ResultImage } from '../ResultImage';
import { Stepper } from '../Stepper';

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
    { label: 'Gesamtpreis', leas: '-', fin: finCarPrice, isComparable: false },
    {
      label: 'Restwert nach Laufzeit',
      leas: '-',
      fin: finResidualValue,
      isComparable: false,
    },
    {
      label: 'Kosten für Laufzeit',
      leas: leasTotalPrice,
      fin: finTotalPrice - finResidualValue,
    },
    {
      label: 'Eff. Kosten pro Monat',
      leas: leasCostsEffective,
      fin: finCostsEffective,
    },
  ];
  const winner =
    Number(finCostsEffective) < Number(leasCostsEffective) ? 'fin' : 'leas';
  const winnerMonthlyRate = winner === 'fin' ? finMonthlyRate : leasMonthlyRate;
  const winnerRuntime = winner === 'fin' ? finRuntime : leasRuntime;
  const winnerLabel = { fin: 'Finanzierung', leas: 'Leasing' }[winner];
  const loser = { leas: 'fin', fin: 'leas' }[winner];
  const loserLabel = { fin: 'Finanzierung', leas: 'Leasing' }[loser];
  const winnerCostsEffective =
    winner === 'fin' ? finCostsEffective : leasCostsEffective;
  const loserCostsEffective =
    winner !== 'fin' ? finCostsEffective : leasCostsEffective;

  return (
    <Layout backgroundImage={<ResultImage />}>
      <Stepper activeStep={3} />
      <Heading as="h1" size="2xl" mt={{ base: 0, md: '1em' }} mb="0.75em">
        Ergebnis
      </Heading>
      <Box borderRadius="md" bgColor="brand.500" color="white" p={6} mb={8}>
        Mit <b>{winnerMonthlyRate}€</b> pro Monat über eine Laufzeit von{' '}
        <b>{winnerRuntime}</b> Monaten sind die effektiven monatlichen Kosten
        bei der Variante <b>{winnerLabel}</b>{' '}
        <b>{Number(loserCostsEffective) - Number(winnerCostsEffective)}</b>€
        günstiger als bei der Variante <b>{loserLabel}</b>.
      </Box>
      <Flex justify="space-between" mb={4}>
        <Heading as="h2" size="md">
          Finanzierung
        </Heading>
        <Heading as="h2" size="md">
          Leasing
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
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('.', '')}-finanzierung`}
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
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('.', '')}-leasing`}
                justify="flex-end"
              >
                {leas}
              </Flex>
            </Flex>
          </Box>
        );
      })}
      <HStack spacing={4} justify="end" alignSelf="stretch" mt={8}>
        <Button onClick={onBack}>Zurück</Button>
        <Button variant="solid" colorScheme="brand" onClick={onRestart}>
          Neu starten
        </Button>
      </HStack>
    </Layout>
  );
};
