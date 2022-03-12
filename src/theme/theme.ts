import {
  ComponentStyleConfig,
  extendTheme,
  ThemeOverride,
} from '@chakra-ui/react';

const NumberInput: ComponentStyleConfig = {
  defaultProps: {
    focusBorderColor: 'brand.300',
  },
};

const shadows = {
  outline: '0 0 0 3px #8ca9f2',
};

const themeExtension: ThemeOverride = {
  colors: {
    brand: {
      900: '#030817',
      800: '#081945',
      700: '#0d2a73',
      600: '#123aa1',
      500: '#174bce',
      400: '#3165e8',
      300: '#5e87ed',
      200: '#8ca9f2',
      100: '#EDF2F7',
      50: '#e8eefc',
    },
    white: '#F8FAFC',
    black: '#0d2a73',
    gray: {
      100: '#F8FAFC',
      200: '#E6ECFA',
    },
    red: {
      500: '#E84855',
    },
    green: {
      700: '#1A936F',
    },
  },
  fonts: {
    heading: 'Inter',
    body: 'Inter',
  },
  styles: {
    global: {
      html: {
        minH: '100%',
        h: '100%',
      },
      'html, body': {
        color: 'black',
        background: 'white',
      },
      'body, #__next': {
        minH: 'inherit',
        h: 'inherit',
      },
    },
  },
  components: { NumberInput },
  shadows,
};

export const theme = extendTheme(themeExtension);
