import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    // primary: {
    //   main: #efefef,
    // },
    // secondary: {
    //   main: '#..',
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#efefef',
          color: '#888889;',
          lineHeight: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
      defaultProps: {
        elevation: 0,
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '1.8rem',
          '@media (min-width:600px)': {
            minHeight: '2rem',
          },
        },
      },
    },
  },
});
