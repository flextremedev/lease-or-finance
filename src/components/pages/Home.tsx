import {
  Button,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import { ChoiceImage } from '../ChoiceImage';
import { Layout } from '../Layout';

export const Home = () => {
  const isButtonFullWidth = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <Layout backgroundImage={<ChoiceImage />} direction="row-reverse">
      <Flex
        direction="column"
        alignItems="flex-start"
        justifyContent={{ base: 'space-between', md: 'center' }}
        flex={1}
        position="relative"
      >
        <VStack
          spacing={{ base: 4, md: 6 }}
          alignItems="flex-start"
          mb={{ base: 16, sm: 0 }}
        >
          <Heading
            as="h1"
            size="xl"
            fontSize={{ base: '3xl', md: '4xl', xl: '5xl' }}
            textAlign="left"
          >
            Finden Sie die beste Option
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Sie möchten wissen, ob <strong>Finanzierung</strong> oder{' '}
            <strong>Leasing</strong> die bessere Option für Sie ist? Hier finden
            Sie es heraus!
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
            bg="brand.500"
            color="white"
            size="lg"
            isFullWidth={isButtonFullWidth}
            marginTop={{ base: 0, sm: 8 }}
          >
            Jetzt vergleichen
          </Button>
        </Flex>
      </Flex>
    </Layout>
  );
};
