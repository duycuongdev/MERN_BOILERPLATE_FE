import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '60px'

const theme = extendTheme({
  app: {
    appBarHeight: APP_BAR_HEIGHT
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Roboto", "Helvetica", "Arial", sans-serif'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#2563eb',
          light: '#60a5fa',
          dark: '#1d4ed8'
        },
        background: {
          default: '#f8fafc',
          paper: '#ffffff'
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#3b82f6',
          light: '#93c5fd',
          dark: '#1d4ed8'
        },
        background: {
          default: '#0f172a',
          paper: '#1e293b'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*': {
            boxSizing: 'border-box'
          },
          '*::-webkit-scrollbar': {
            width: '6px',
            height: '6px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(100, 116, 139, 0.3)',
            borderRadius: '4px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(100, 116, 139, 0.6)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8
          }
        }
      }
    }
  }
})

export default theme

