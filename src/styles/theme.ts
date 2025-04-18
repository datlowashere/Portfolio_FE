import { createTheme, Theme, ThemeOptions } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#000000' : '#FFFFFF',
    },
    secondary: {
      main: mode === 'light' ? '#FFFFFF' : '#000000',
    },
    background: {
      default: mode === 'light' ? '#FFFFFF' : '#000000',
      paper: mode === 'light' ? '#FFFFFF' : '#000000',
    },
    text: {
      primary: mode === 'light' ? '#000000' : '#FFFFFF',
      secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: 'Merriweather, serif',
    allVariants: {
      fontFamily: 'Merriweather, serif'
    },
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      fontWeight: 400,
    },
    body2: {
      fontWeight: 400,
    },
    button: {
      fontFamily: '"Merriweather", serif',
    },
    caption: {
      fontFamily: '"Merriweather", serif',
    },
    subtitle1: {
      fontFamily: '"Merriweather", serif',
    },
    subtitle2: {
      fontFamily: '"Merriweather", serif',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        }
      }
    }
  }
});

export const getTheme = (mode: PaletteMode): Theme => createTheme(getDesignTokens(mode)); 