import {
  Button,
  Container,
  Flex,
  Heading,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import type { NextPage } from 'next';

import { ChoiceImage } from '~/components/ChoiceImage';

const Home: NextPage = () => {
  const isButtonFullWidth = useBreakpointValue({
    base: true,
    xl: false,
  });

  return (
    <Flex
      direction={{ base: 'column', xl: 'row-reverse' }}
      minHeight="100%"
      width="100%"
    >
      <Flex
        minHeight={{ base: '55%', xl: '100%' }}
        maxHeight={{ base: '55%', xl: '100%' }}
        background="gray.200"
        width={{ base: '100%', xl: '50%' }}
      >
        <Container
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <ChoiceImage />
        </Container>
      </Flex>
      <Container
        paddingY={[8]}
        bg=""
        minHeight={{ base: '45%', xl: '100%' }}
        width={{ base: '100%', xl: '50%' }}
        display="flex"
        flexDirection="column"
      >
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
              <strong>Leasing</strong> die bessere Option für Sie ist? Hier
              finden Sie es heraus!
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
      </Container>
    </Flex>
  );
};

export default Home;
