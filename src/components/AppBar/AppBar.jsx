import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import Profile from './Menus/Profile'
import LogoIcon from '~/components/Icons/LogoIcon'

function AppBar() {
  const currentUser = useSelector(selectCurrentUser)

  return (
    <Box sx={{
      width: '100%',
      height: (theme) => theme.app.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      px: { xs: 2, sm: 4 },
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#0f172a' : '#2563eb'),
      borderBottom: '1px solid',
      borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'),
      color: 'white',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
    }}>
      {/* Brand Logo & Title */}
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, color: 'white' }}>
          <LogoIcon sx={{ fontSize: 28, color: 'white' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
            MERN App
          </Typography>
        </Link>

        {currentUser && (
          <Button
            component={Link}
            to="/dashboard"
            sx={{
              color: 'white',
              opacity: 0.9,
              '&:hover': { opacity: 1, bgcolor: 'rgba(255,255,255,0.1)' },
              ml: 2,
              display: { xs: 'none', sm: 'inline-flex' }
            }}
          >
            Dashboard
          </Button>
        )}
      </Stack>

      {/* Right Action Icons: ModeSelect, Auth Buttons or Profile Menu */}
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <ModeSelect />
        </Box>

        {currentUser ? (
          <Profile />
        ) : (
          <Stack direction="row" spacing={1}>
            <Button
              component={Link}
              to="/login"
              variant="text"
              sx={{ color: 'white', fontWeight: 600 }}
            >
              Sign in
            </Button>
            <Button
              component={Link}
              to="/register"
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                fontWeight: 700,
                '&:hover': { bgcolor: '#f1f5f9' }
              }}
            >
              Get Started
            </Button>
          </Stack>
        )}
      </Stack>
    </Box>
  )
}

export default AppBar

