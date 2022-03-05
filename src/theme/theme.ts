import { extendTheme, ThemeOverride } from '@chakra-ui/react';

const themeExtension: ThemeOverride = {
  colors: {
    brand: {
      500: '#3A6CE9',
      100: '#EDF2F7',
    },
    white: '#F8FAFC',
    black: '#002175',
    gray: {
      100: '#F8FAFC',
      200: '#E6ECFA',
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
};

export const theme = extendTheme(themeExtension);
