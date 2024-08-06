import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'url(/back2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        color: '#0F0F0F',
        minHeight: '80vh',
      },
      a: {
        color: '#f8f9fb',
        _hover: {
          textDecoration: 'underline',
        },
      },
      h1: {
        color: '#0F0F0F',
      },
      h2: {
        color: '#0F0F0F',
      },
      p: {
        color: '#0F0F0F',
      },
    },
  },
     fonts: {
        heading: `'Gilroy', serif`,
        body: `'Gilroy', serif`,
      },
});

export default theme;
