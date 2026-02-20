import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00f5ff',
      light: '#6effff',
      dark: '#00b2cc',
      contrastText: '#000',
    },
    secondary: {
      main: '#bf00ff',
      light: '#f050ff',
      dark: '#8b00cc',
    },
    success: {
      main: '#39ff14',
    },
    warning: {
      main: '#ff6b00',
    },
    background: {
      default: '#060610',
      paper: '#0e0e1f',
    },
    text: {
      primary: '#e0e0ff',
      secondary: '#a0a0cc',
    },
    divider: 'rgba(0, 245, 255, 0.15)',
  },
  typography: {
    fontFamily: '"Rajdhani", "Noto Sans KR", "Roboto", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '0.05em' },
    h2: { fontWeight: 700, letterSpacing: '0.05em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '0.95rem', lineHeight: 1.7 },
    body2: { fontSize: '0.85rem', lineHeight: 1.6 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 700,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #00f5ff 0%, #00b2cc 100%)',
          color: '#000',
          '&:hover': {
            background: 'linear-gradient(135deg, #6effff 0%, #00f5ff 100%)',
            boxShadow: '0 0 20px rgba(0, 245, 255, 0.6)',
          },
        },
        outlinedPrimary: {
          borderColor: '#00f5ff',
          color: '#00f5ff',
          '&:hover': {
            borderColor: '#6effff',
            boxShadow: '0 0 15px rgba(0, 245, 255, 0.4)',
            backgroundColor: 'rgba(0, 245, 255, 0.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(0, 245, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'rgba(0, 245, 255, 0.3)' },
            '&:hover fieldset': { borderColor: 'rgba(0, 245, 255, 0.6)' },
            '&.Mui-focused fieldset': {
              borderColor: '#00f5ff',
              boxShadow: '0 0 8px rgba(0, 245, 255, 0.3)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          letterSpacing: '0.03em',
        },
      },
    },
  },
});

export default theme;
