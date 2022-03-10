import { Container, Flex } from '@chakra-ui/react';

type LayoutProps = {
  backgroundImage: JSX.Element;
  direction?: 'row' | 'row-reverse';
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  backgroundImage,
  direction = 'row',
}) => {
  return (
    <Flex
      direction={{ base: 'column', xl: direction }}
      minHeight="100%"
      width="100%"
    >
      <Flex
        minHeight={{ base: '55%', xl: '100%' }}
        maxHeight={{ base: '55%', xl: '100%' }}
        background="gray.200"
        width={{ base: '100%', xl: '45%' }}
      >
        <Container
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          {backgroundImage}
        </Container>
      </Flex>
      <Container
        paddingY={{ base: 8, md: 16 }}
        pb={8}
        minHeight={{ base: '45%', xl: '100%' }}
        width={{ base: '100%', xl: '55%' }}
        display="flex"
        flexDirection="column"
      >
        {children}
      </Container>
    </Flex>
  );
};
