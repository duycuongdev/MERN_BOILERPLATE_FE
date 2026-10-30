import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Chip from '@mui/material/Chip'
import AppBar from '~/components/AppBar/AppBar'
import { selectCurrentUser } from '~/redux/user/userSlice'

// Material Icons
import SecurityIcon from '@mui/icons-material/Security'
import BoltIcon from '@mui/icons-material/Bolt'
import StorageIcon from '@mui/icons-material/Storage'
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed'
import CloudQueueIcon from '@mui/icons-material/CloudQueue'
import PaletteIcon from '@mui/icons-material/Palette'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function Home() {
  const currentUser = useSelector(selectCurrentUser)

  const features = [
    {
      icon: <SecurityIcon sx={{ fontSize: 36, color: '#2563eb' }} />,
      title: 'Dual-Authentication Engine',
      description: 'Zero-friction auth with HttpOnly Cookies for desktop browsers & Bearer Tokens for mobile devices, plus silent token refresh rotation and Google OAuth 2.0.'
    },
    {
      icon: <StorageIcon sx={{ fontSize: 36, color: '#10b981' }} />,
      title: 'Native MongoDB Driver',
      description: 'High-throughput database operations using the official MongoDB native driver without the memory overhead of Mongoose. Validated with strict Joi schemas.'
    },
    {
      icon: <BoltIcon sx={{ fontSize: 36, color: '#f59e0b' }} />,
      title: 'Real-Time WebSockets',
      description: 'Integrated Socket.IO room architecture for private user notifications, presence awareness, and collaborative live event broadcasting.'
    },
    {
      icon: <PaletteIcon sx={{ fontSize: 36, color: '#8b5cf6' }} />,
      title: 'MUI v5 & Dual Theme Engine',
      description: 'Complete Material UI design system featuring fluid Light and Dark modes with automatic system preference detection.'
    },
    {
      icon: <CloudQueueIcon sx={{ fontSize: 36, color: '#06b6d4' }} />,
      title: 'Cloudinary & Brevo Email',
      description: 'In-memory buffer streaming to Cloudinary for media uploads and transactional email verification powered by Brevo REST API v3.'
    },
    {
      icon: <DynamicFeedIcon sx={{ fontSize: 36, color: '#ec4899' }} />,
      title: 'Blueprint CRUD Resource',
      description: 'Pre-wired complete CRUD template with server-side pagination, search queries, soft deletion, and Redux Toolkit state slices.'
    }
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: { xs: 8, sm: 12 }, pb: { xs: 8, sm: 10 }, textAlign: 'center' }}>
        <Chip
          label="🚀 Production-Ready MERN Boilerplate"
          color="primary"
          variant="outlined"
          sx={{ fontWeight: 700, mb: 3, py: 0.5, px: 1, borderRadius: 2 }}
        />
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '4rem', md: '4.5rem' },
            fontWeight: 800,
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            maxWidth: 900,
            mx: 'auto',
            mb: 3
          }}
        >
          Enterprise foundation for your next web application.
        </Typography>

        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.25rem' },
            color: 'text.secondary',
            maxWidth: 720,
            mx: 'auto',
            lineHeight: 1.6,
            fontWeight: 400,
            mb: 5
          }}
        >
          A clean, modern full-stack template with Dual-Auth, Google OAuth 2.0, Redux Toolkit,
          MUI v5 Dark/Light theme, MongoDB Native driver, and real-time Socket.IO.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
          {currentUser ? (
            <Button
              component={Link}
              to="/dashboard"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ py: 1.5, px: 4, fontSize: '1.05rem', fontWeight: 700 }}
            >
              Open Dashboard
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{ py: 1.5, px: 4, fontSize: '1.05rem', fontWeight: 700 }}
              >
                Get Started Free
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{ py: 1.5, px: 4, fontSize: '1.05rem', fontWeight: 600 }}
              >
                Sign In
              </Button>
            </>
          )}
        </Stack>
      </Container>

      {/* Feature Grid */}
      <Box sx={{ py: 8, bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0b1329' : '#f1f5f9' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="overline" sx={{ fontWeight: 700, color: 'primary.main', letterSpacing: 1.5 }}>
              CORE ARCHITECTURE
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
              Engineered for Speed & Security
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, idx) => (
              <Grid xs={12} sm={6} md={4} key={idx}>
                <Card sx={{
                  height: '100%',
                  p: 2,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => theme.palette.mode === 'dark'
                      ? '0 12px 24px rgba(0,0,0,0.4)'
                      : '0 12px 24px rgba(0,0,0,0.06)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Tech Stack Summary */}
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Built with Industry-Leading Technologies
        </Typography>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" justifyContent="center" gap={1}>
          {['React 18', 'Vite 4/5', 'Node.js', 'Express.js', 'MongoDB Native v6', 'Redux Toolkit', 'Material-UI v5', 'Socket.IO', 'Google OAuth 2.0', 'Cloudinary', 'Brevo REST API'].map((tech) => (
            <Chip key={tech} icon={<CheckCircleIcon sx={{ fontSize: 16 }} />} label={tech} variant="outlined" />
          ))}
        </Stack>
      </Container>
    </Box>
  )
}

export default Home

