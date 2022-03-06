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
  } = query as Record<string, string | undefined>;

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

  const results = [
    { label: 'Gesamtpreis', leas: '-', fin: finCarPrice },
    {
      label: 'Restwert nach Laufzeit',
      leas: '-',
      fin: finResidualValue,
    },
    { label: 'Kosten für Laufzeit', leas: leasTotalPrice, fin: finTotalPrice },
    {
      label: 'Eff. Kosten pro Monat',
      leas: (leasTotalPrice / Number(leasRuntime)).toFixed(),
      fin: ((finTotalPrice - finResidualValue) / Number(finRuntime)).toFixed(),
    },
  ];

  return (
    <Layout backgroundImage={<ResultImage />}>
      <Stepper activeStep={3} />
      <Heading as="h1" size="2xl" mt={{ base: 0, md: '1em' }} mb="0.5em">
        Ergebnis
      </Heading>
      {results.map(({ fin, label, leas }) => {
        return (
          <Box key={label}>
            <Flex justify="center">
              <Flex>{label}</Flex>
            </Flex>
            <Flex h="12" alignItems="center">
              <Flex
                flex={1}
                data-testid={`${label
                  .toLowerCase()
                  .replaceAll(' ', '-')
                  .replaceAll('.', '')}-finanzierung`}
              >
                {fin}
              </Flex>
              <Flex
                flex={1}
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
