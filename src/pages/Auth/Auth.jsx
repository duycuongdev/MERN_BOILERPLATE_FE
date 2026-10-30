import { useLocation, Navigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '~/redux/user/userSlice'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import LogoIcon from '~/components/Icons/LogoIcon'

function Auth() {
  const location = useLocation()
  const isLogin = location.pathname === '/login'

  const currentUser = useSelector(selectCurrentUser)
  if (currentUser) {
    return <Navigate to="/dashboard" replace={true} />
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      bgcolor: 'background.default',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Top Bar with Logo & Theme Switcher */}
      <Box sx={{
        py: 2,
        px: { xs: 2, sm: 4 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 10
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <LogoIcon sx={{ fontSize: 30, color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: 'text.primary' }}>
            MERN App
          </Typography>
        </Link>
        <ModeSelect />
      </Box>

      {/* Main Form Center Container */}
      <Container maxWidth="sm" sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        zIndex: 10
      }}>
        {isLogin ? <LoginForm /> : <RegisterForm />}
      </Container>

      {/* Footer */}
      <Box sx={{ py: 2, textAlign: 'center', color: 'text.secondary', fontSize: '0.85rem' }}>
        © {new Date().getFullYear()} MERN Boilerplate. Built for developers.
      </Box>
    </Box>
  )
}

export default Auth

