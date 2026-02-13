import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9B8BB4',
      light: '#B8A9C9',
      dark: '#5C4B7A',
    },
    secondary: {
      main: '#E8B4C8',
      light: '#F0D0DE',
      dark: '#C48BA3',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F5FC',
    },
    text: {
      primary: '#333333',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      fontSize: '1.8rem',
      letterSpacing: '0.08em',
    },
    h5: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
      letterSpacing: '0.05em',
    },
    body1: {
      fontSize: '0.95rem',
      lineHeight: 1.8,
    },
    body2: {
      fontSize: '0.85rem',
      lineHeight: 1.6,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
});

export default theme;
