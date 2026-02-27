import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#87CEEB',
      light: '#B0E2F5',
      dark: '#5BA8C9',
      contrastText: '#fff',
    },
    secondary: {
      main: '#98FB98',
      light: '#C4FCC4',
      dark: '#6BC86B',
      contrastText: '#333',
    },
    background: {
      default: '#F8FFFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", sans-serif',
    h5: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 20,
          fontWeight: 600,
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #87CEEB, #98FB98)',
          color: '#333',
          '&:hover': {
            background: 'linear-gradient(135deg, #5BA8C9, #6BC86B)',
            color: '#fff',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(135,206,235,0.15)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #E8F4FA',
        },
      },
    },
  },
});

export default theme;
