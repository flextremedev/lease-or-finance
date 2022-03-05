import * as React from 'react';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  NumberInput,
  NumberInputField,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { BlueCarImage } from '../BlueCarImage';
import { Layout } from '../Layout';
import { Stepper } from '../Stepper';

type FinancingProps = {
  onNext: (finData: FormData) => void;
  onBack: () => void;
};

type FormData = {
  finCarPrice: string;
  finRuntime: string;
  finMonthlyRate: string;
  finInitialPayment: string;
  finEndingRate: string;
};

const NOT_EMPTY_ERROR = 'Bitte tragen Sie einen Wert ein';

export const Financing = ({ onBack, onNext }: FinancingProps) => {
  const [finRuntime, setFinRuntime] = React.useState(6);
  const { query } = useRouter();

  /* istanbul ignore next */
  const handleFinRuntime = (value: number) => {
    setFinRuntime(value);
    setValue('finRuntime', String(value));
  };

  const {
    finCarPrice: finCarPriceFromQuery,
    finEndingRate: finEndingRateFromQuery,
    finInitialPayment: finInitialPaymentFromQuery,
    finMonthlyRate: finMonthlyRateFromQuery,
    finRuntime: finRuntimeFromQuery,
  } = query as Record<string, string | undefined>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      finCarPrice: finCarPriceFromQuery,
      finEndingRate: finEndingRateFromQuery,
      finInitialPayment: finInitialPaymentFromQuery,
      finMonthlyRate: finMonthlyRateFromQuery,
      finRuntime: finRuntimeFromQuery,
    },
  });

  const submit = handleSubmit(onNext);

  return (
    <Layout backgroundImage={<BlueCarImage />}>
      <Stepper activeStep={1} />
      <Heading as="h1" size="2xl" mt={{ base: 0, md: '1em' }} mb="0.5em">
        Finanzierung
      </Heading>
      <VStack as="form" spacing={8} onSubmit={submit}>
        <FormControl isInvalid={Boolean(errors.finCarPrice)}>
          <FormLabel htmlFor="finCarPrice" id="finCarPriceLabel">
            Kaufpreis
          </FormLabel>
          <NumberInput id="finCarPrice">
            <NumberInputField
              {...register('finCarPrice', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.finCarPrice && errors.finCarPrice.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="finRuntime" id="finRuntimeLabel">
            Zahlungsdauer
          </FormLabel>
          <Slider
            colorScheme="brand"
            {...register('finRuntime')}
            min={6}
            max={60}
            step={6}
            value={finRuntime}
            aria-labelledby="finRuntimeLabel"
            onChange={handleFinRuntime}
          >
            <SliderMark value={60} mt={4} ml={-20} fontSize="sm">
              {finRuntime} Monate
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.finMonthlyRate)}>
          <FormLabel htmlFor="finMonthlyRate" id="finMonthlyRateLabel">
            Monatliche Rate
          </FormLabel>
          <NumberInput id="finMonthlyRate">
            <NumberInputField
              {...register('finMonthlyRate', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.finMonthlyRate && errors.finMonthlyRate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.finInitialPayment)}>
          <FormLabel htmlFor="finInitialPayment" id="finInitialPaymentLabel">
            Anzahlung
          </FormLabel>
          <NumberInput id="finInitialPayment">
            <NumberInputField
              {...register('finInitialPayment', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.finInitialPayment && errors.finInitialPayment.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.finEndingRate)}>
          <FormLabel htmlFor="finEndingRate" id="finEndingRateLabel">
            Schlusszahlung
          </FormLabel>
          <NumberInput id="finEndingRate">
            <NumberInputField
              {...register('finEndingRate', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.finEndingRate && errors.finEndingRate.message}
          </FormErrorMessage>
        </FormControl>
        <HStack spacing={4} justify="end" alignSelf="stretch">
          <Button onClick={onBack}>Zurück</Button>
          <Button variant="solid" colorScheme="brand" type="submit">
            Weiter
          </Button>
        </HStack>
      </VStack>
    </Layout>
  );
};
