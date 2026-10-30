import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'

function NotFound() {
  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'background.default',
      color: 'text.primary',
      p: 3,
      textAlign: 'center'
    }}>
      <Typography variant="h1" sx={{ fontSize: { xs: '6rem', sm: '9rem' }, fontWeight: 900, color: 'primary.main', lineHeight: 1 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 480, mb: 4 }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeIcon />}
        size="large"
        sx={{ borderRadius: 2 }}
      >
        Return to Home
      </Button>
    </Box>
  )
}

export default NotFound

