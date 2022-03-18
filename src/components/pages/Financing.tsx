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
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { BlueCarImage } from '~/components/BlueCarImage';
import { Layout } from '~/components/Layout';
import { Stepper } from '~/components/Stepper';

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

export const Financing = ({ onBack, onNext }: FinancingProps) => {
  const t = useTranslations('Financing');
  const tC = useTranslations('Common');
  const { query } = useRouter();
  const {
    finCarPrice: finCarPriceFromQuery,
    finEndingRate: finEndingRateFromQuery,
    finInitialPayment: finInitialPaymentFromQuery,
    finMonthlyRate: finMonthlyRateFromQuery,
    finRuntime: finRuntimeFromQuery,
  } = query as Record<string, string | undefined>;
  const [finRuntime, setFinRuntime] = React.useState(
    finRuntimeFromQuery || '6'
  );

  /* istanbul ignore next */
  const handleFinRuntime = (value: number) => {
    setFinRuntime(String(value));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      finCarPrice: finCarPriceFromQuery,
      finEndingRate: finEndingRateFromQuery,
      finInitialPayment: finInitialPaymentFromQuery,
      finMonthlyRate: finMonthlyRateFromQuery,
    },
  });

  const submit = handleSubmit((formData) =>
    onNext({ ...formData, finRuntime })
  );

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <Layout backgroundImage={<BlueCarImage />}>
        <Stepper activeStep={1} />
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
          <FormControl isInvalid={Boolean(errors.finCarPrice)}>
            <FormLabel htmlFor="finCarPrice" id="finCarPriceLabel">
              {t('carPrice')}
            </FormLabel>
            <NumberInput id="finCarPrice">
              <NumberInputField
                {...register('finCarPrice', {
                  required: tC('errors.emptyString'),
                })}
                border="1px solid"
                borderColor="gray.200"
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.finCarPrice && errors.finCarPrice.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="finRuntime" id="finRuntimeLabel">
              {t('runtime')}
            </FormLabel>
            <Slider
              colorScheme="brand"
              min={6}
              value={Number(finRuntime)}
              max={60}
              step={6}
              aria-labelledby="finRuntimeLabel"
              onChange={handleFinRuntime}
            >
              <SliderMark value={60} mt={4} ml={-20} fontSize="sm">
                {t('runtimeMonths', { monthValue: finRuntime })}
              </SliderMark>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.finMonthlyRate)}>
            <FormLabel htmlFor="finMonthlyRate" id="finMonthlyRateLabel">
              {t('monthlyRate')}
            </FormLabel>
            <NumberInput id="finMonthlyRate">
              <NumberInputField
                {...register('finMonthlyRate', {
                  required: tC('errors.emptyString'),
                })}
                border="1px solid"
                borderColor="gray.200"
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.finMonthlyRate && errors.finMonthlyRate.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.finInitialPayment)}>
            <FormLabel htmlFor="finInitialPayment" id="finInitialPaymentLabel">
              {t('initialPayment')}
            </FormLabel>
            <NumberInput id="finInitialPayment">
              <NumberInputField
                {...register('finInitialPayment', {
                  required: tC('errors.emptyString'),
                })}
                border="1px solid"
                borderColor="gray.200"
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.finInitialPayment && errors.finInitialPayment.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.finEndingRate)}>
            <FormLabel htmlFor="finEndingRate" id="finEndingRateLabel">
              {t('endingRate')}
            </FormLabel>
            <NumberInput id="finEndingRate">
              <NumberInputField
                {...register('finEndingRate', {
                  required: tC('errors.emptyString'),
                })}
                border="1px solid"
                borderColor="gray.200"
              />
            </NumberInput>
            <FormErrorMessage>
              {errors.finEndingRate && errors.finEndingRate.message}
            </FormErrorMessage>
          </FormControl>
          <HStack spacing={4} justify="end" alignSelf="stretch">
            <Button onClick={onBack} variant="ghost" colorScheme="brand">
              {tC('back')}
            </Button>
            <Button type="submit" colorScheme="brand">
              {tC('continue')}
            </Button>
          </HStack>
        </VStack>
      </Layout>
    </>
  );
};
