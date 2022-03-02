import { Container, Flex } from '@chakra-ui/react';

import { ChoiceImage } from '~/components/ChoiceImage';

export const Layout: React.FC = ({ children }) => {
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
        {children}
      </Container>
    </Flex>
  );
};
