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
      900: '#051257',
      800: '#0A207A',
      700: '#10339D',
      600: '#133EAE',
      500: '#3E6EE9',
      400: '#638DEE',
      300: '#88AAF2',
      200: '#BFD2F8',
      100: '#D1DFFA',
      50: '#E3ECFC',
    },
    white: '#F8FAFC',
    black: '#051257',
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
