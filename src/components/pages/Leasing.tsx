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
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Layout } from '~/components/Layout';
import { RedCarImage } from '~/components/RedCarImage';
import { Stepper } from '~/components/Stepper';

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

export const Leasing = ({ onBack, onNext }: LeasingProps) => {
  const t = useTranslations('Leasing');
  const tC = useTranslations('Common');

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
      <Heading
        as="h1"
        size="2xl"
        mt={{ base: 0, md: '1em' }}
        mb="1em"
        fontWeight="black"
      >
        {t('title')}
      </Heading>
      <VStack as="form" spacing={8} onSubmit={submit}>
        <FormControl isInvalid={Boolean(errors.leasCarPrice)}>
          <FormLabel htmlFor="leasCarPrice" id="leasCarPriceLabel">
            {t('carPrice')}
          </FormLabel>
          <NumberInput id="leasCarPrice">
            <NumberInputField
              {...register('leasCarPrice', {
                required: tC('errors.emptyString'),
              })}
              border="1px solid"
              borderColor="gray.200"
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasCarPrice && errors.leasCarPrice.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="leasRuntime" id="leasRuntimeLabel">
            {t('runtime')}
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
              {t('runtimeMonths', { monthValue: leasRuntime })}
            </SliderMark>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasMonthlyRate)}>
          <FormLabel htmlFor="leasMonthlyRate" id="leasMonthlyRateLabel">
            {t('monthlyRate')}
          </FormLabel>
          <NumberInput id="leasMonthlyRate">
            <NumberInputField
              {...register('leasMonthlyRate', {
                required: tC('errors.emptyString'),
              })}
              border="1px solid"
              borderColor="gray.200"
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasMonthlyRate && errors.leasMonthlyRate.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasInitialPayment)}>
          <FormLabel htmlFor="leasInitialPayment" id="leasInitialPaymentLabel">
            {t('initialPayment')}
          </FormLabel>
          <NumberInput id="leasInitialPayment">
            <NumberInputField
              {...register('leasInitialPayment', {
                required: tC('errors.emptyString'),
              })}
              border="1px solid"
              borderColor="gray.200"
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasInitialPayment && errors.leasInitialPayment.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.leasEndingRate)}>
          <FormLabel htmlFor="leasEndingRate" id="leasEndingRateLabel">
            {t('endingRate')}
          </FormLabel>
          <NumberInput id="leasEndingRate">
            <NumberInputField
              {...register('leasEndingRate', {
                required: tC('errors.emptyString'),
              })}
              border="1px solid"
              borderColor="gray.200"
            />
          </NumberInput>
          <FormErrorMessage>
            {errors.leasEndingRate && errors.leasEndingRate.message}
          </FormErrorMessage>
        </FormControl>
        <HStack spacing={4} justify="end" alignSelf="stretch">
          <Button variant="ghost" colorScheme="brand" onClick={onBack}>
            {tC('back')}
          </Button>
          <Button variant="solid" colorScheme="brand" type="submit">
            {tC('continue')}
          </Button>
        </HStack>
      </VStack>
    </Layout>
  );
};
