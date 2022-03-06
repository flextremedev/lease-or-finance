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

import { Layout } from '../Layout';
import { RedCarImage } from '../RedCarImage';
import { Stepper } from '../Stepper';

type LeasingProps = {
  onNext: (leasData: FormData) => void;
  onBack: () => void;
};

type FormData = {
  leasCarPrice: string;
  leasMonthlyRate: string;
  leasInitialPayment: string;
  leasEndingRate: string;
  leasRuntime: string;
};

const NOT_EMPTY_ERROR = 'Bitte tragen Sie einen Wert ein';

export const Leasing = ({ onBack, onNext }: LeasingProps) => {
  const { query } = useRouter();
  const {
    leasCarPrice: leasCarPriceFromQuery,
    leasEndingRate: leasEndingRateFromQuery,
    leasInitialPayment: leasInitialPaymentFromQuery,
    leasMonthlyRate: leasMonthlyRateFromQuery,
    leasRuntime: leasRuntimeFromQuery,
  } = query as Record<string, string | undefined>;

  const [leasRuntime, setLeasRuntime] = React.useState<string>(
    leasRuntimeFromQuery || '6'
  );

  /* istanbul ignore next */
  const handleLeasRuntime = (value: number) => {
    setLeasRuntime(String(value));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      leasCarPrice: leasCarPriceFromQuery,
      leasEndingRate: leasEndingRateFromQuery,
      leasInitialPayment: leasInitialPaymentFromQuery,
      leasMonthlyRate: leasMonthlyRateFromQuery,
    },
  });

  const submit = handleSubmit((formData) =>
    onNext({ ...formData, leasRuntime })
  );

  return (
    <Layout backgroundImage={<RedCarImage />}>
      <Stepper activeStep={2} />
      <Heading as="h1" size="2xl" mt={{ base: 0, md: '1em' }} mb="0.5em">
        Leasing
      </Heading>
      <VStack as="form" spacing={8} onSubmit={submit}>
        <FormControl isInvalid={Boolean(errors.leasCarPrice)}>
          <FormLabel htmlFor="leasCarPrice" id="leasCarPriceLabel">
            Kaufpreis
          </FormLabel>
          <NumberInput id="leasCarPrice">
            <NumberInputField
              {...register('leasCarPrice', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasCarPrice && errors.leasCarPrice.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="leasRuntime" id="leasRuntimeLabel">
            Zahlungsdauer
          </FormLabel>
          <Slider
            colorScheme="brand"
            value={Number(leasRuntime)}
            min={6}
            max={60}
            step={6}
            aria-labelledby="leasRuntimeLabel"
            onChange={handleLeasRuntime}
          >
            <SliderMark value={60} mt={4} ml={-20} fontSize="sm">
              {leasRuntime} Monate
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasMonthlyRate)}>
          <FormLabel htmlFor="leasMonthlyRate" id="leasMonthlyRateLabel">
            Monatliche Rate
          </FormLabel>
          <NumberInput id="leasMonthlyRate">
            <NumberInputField
              {...register('leasMonthlyRate', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasMonthlyRate && errors.leasMonthlyRate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasInitialPayment)}>
          <FormLabel htmlFor="leasInitialPayment" id="leasInitialPaymentLabel">
            Anzahlung
          </FormLabel>
          <NumberInput id="leasInitialPayment">
            <NumberInputField
              {...register('leasInitialPayment', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasInitialPayment && errors.leasInitialPayment.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasEndingRate)}>
          <FormLabel htmlFor="leasEndingRate" id="leasEndingRateLabel">
            Schlusszahlung
          </FormLabel>
          <NumberInput id="leasEndingRate">
            <NumberInputField
              {...register('leasEndingRate', {
                required: NOT_EMPTY_ERROR,
              })}
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasEndingRate && errors.leasEndingRate.message}
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
