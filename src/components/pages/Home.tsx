import {
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useTranslations } from 'next-intl';
import Head from 'next/head';

import { ChoiceImage } from '~/components/ChoiceImage';
import { Layout } from '~/components/Layout';

type HomeProps = {
  onNext: () => void;
};

export const Home = ({ onNext }: HomeProps) => {
  const t = useTranslations('Home');
  const isButtonFullWidth = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>
      <Layout backgroundImage={<ChoiceImage />} direction="row-reverse">
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent={{ base: 'space-between', md: 'center' }}
          flex={1}
          position="relative"
        >
          <VStack
            spacing={{ base: 4 }}
            alignItems="flex-start"
            mb={{ base: 16, sm: 0 }}
          >
            <Heading
              as="h1"
              size="xl"
              fontWeight="900"
              fontSize={{ base: '3xl', md: '4xl', xl: '5xl' }}
              textAlign="left"
            >
              {t('title')}
            </Heading>
            <Text fontSize={{ base: 'md', md: 'lg' }}>
              {t.rich('description', {
                strong: (children) => <strong>{children}</strong>,
              })}
            </Text>
          </VStack>
          <Flex
            position={{ base: 'fixed', sm: 'inherit' }}
            bottom={{ base: 8, sm: 0 }}
            left={{ base: 4, sm: 0 }}
            right={{ base: 4, sm: 0 }}
            width={{ base: 'auto', sm: '100%' }}
          >
            <Button
              size="lg"
              isFullWidth={isButtonFullWidth}
              marginTop={{ base: 0, sm: 8 }}
              variant="solid"
              colorScheme="brand"
              onClick={() => onNext()}
            >
              {t('actionLabel')}
            </Button>
          </Flex>
        </Flex>
      </Layout>
    </>
  );
};
