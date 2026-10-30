import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

function PageLoadingSpinner({ caption = 'Loading...' }) {
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2,
      width: '100vw',
      height: '100vh',
      bgcolor: 'background.default',
      color: 'text.primary'
    }}>
      <CircularProgress size={36} thickness={4} />
      <Typography variant="body1" sx={{ fontWeight: 500 }}>{caption}</Typography>
    </Box>
  )
}

export default PageLoadingSpinner

