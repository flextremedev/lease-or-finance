import { Box, Flex, HStack, Text } from '@chakra-ui/react';

const steps = [
  { step: 1, label: 'Finanzierung' },
  { step: 2, label: 'Leasing' },
  { step: 3, label: 'Ergebnis' },
];

type StepperProps = {
  activeStep: number;
};

export const Stepper = ({ activeStep }: StepperProps) => {
  return (
    <HStack
      w="full"
      spacing={12}
      pb={8}
      borderBottom="1px solid"
      borderBottomColor="gray.200"
      display={{ base: 'none', md: 'flex' }}
    >
      {steps.map(({ label, step }) => {
        const isActiveStep = step === activeStep;
        return (
          <Flex key={step} align="center" flex={1}>
            <Box
              px={4}
              py={2}
              bgColor={isActiveStep ? 'brand.500' : 'brand.100'}
              color={isActiveStep ? 'white' : 'black'}
              borderRadius="md"
              fontWeight="semibold"
              mr={4}
            >
              {step}
            </Box>
            <Text fontSize="sm" fontWeight="bold">
              {label}
            </Text>
          </Flex>
        );
      })}
    </HStack>
  );
};
