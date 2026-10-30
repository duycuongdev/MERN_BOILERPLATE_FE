import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Alert from '@mui/material/Alert'
import Divider from '@mui/material/Divider'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginUserApi, loginGoogleUserAPI } from '~/redux/user/userSlice'
import { GoogleLogin } from '@react-oauth/google'
import LogoIcon from '~/components/Icons/LogoIcon'

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const registeredEmail = searchParams.get('registeredEmail')
  const verifiedEmail = searchParams.get('verifiedEmail')

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: verifiedEmail || registeredEmail || ''
    }
  })

  const submitLogIn = (data) => {
    const { email, password } = data
    toast.promise(dispatch(loginUserApi({ email, password })), {
      pending: 'Signing in...'
    }).then((res) => {
      if (!res.error) { navigate('/dashboard') }
    })
  }

  const handleGoogleLoginSuccess = (credentialResponse) => {
    if (!credentialResponse?.credential) return
    toast.promise(dispatch(loginGoogleUserAPI({ token: credentialResponse.credential })), {
      pending: 'Signing in with Google...'
    }).then((res) => {
      if (!res.error) { navigate('/dashboard') }
    })
  }

  const handleGoogleLoginError = () => {
    toast.error('Google Sign In was unsuccessful. Please try again.')
  }

  return (
    <form onSubmit={handleSubmit(submitLogIn)} style={{ width: '100%', maxWidth: 420 }}>
      <Zoom in={true} style={{ transitionDelay: '150ms' }}>
        <MuiCard sx={{
          width: '100%',
          borderRadius: 3.5,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 12px 40px rgba(0, 0, 0, 0.45)'
            : '0 12px 36px rgba(0, 0, 0, 0.08)',
          border: '1px solid',
          borderColor: (theme) => theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.08)',
          bgcolor: 'background.paper'
        }}>
          <Box sx={{
            p: { xs: 3, sm: 4 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <Box sx={{
              width: 48,
              height: 48,
              borderRadius: 2.5,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2
            }}>
              <LogoIcon sx={{ fontSize: 28 }} />
            </Box>

            <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5, color: 'text.primary' }}>
              Welcome back
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Sign in to continue to your dashboard
            </Typography>

            {/* Google OAuth Button */}
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mb: 2 }}>
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onError={handleGoogleLoginError}
                shape="rectangular"
                theme="outline"
                text="continue_with"
                width="340"
              />
            </Box>

            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', my: 2 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography variant="caption" sx={{ px: 2, color: 'text.secondary', fontWeight: 600 }}>
                OR WITH EMAIL
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            {verifiedEmail && (
              <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
                Your email has been verified! You can now log in.
              </Alert>
            )}

            {registeredEmail && (
              <Alert severity="info" sx={{ width: '100%', mb: 2 }}>
                An activation link has been sent to <b>{registeredEmail}</b>. Please check your inbox.
              </Alert>
            )}

            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  variant="outlined"
                  error={!!errors['email']}
                  {...register('email', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: EMAIL_RULE,
                      message: EMAIL_RULE_MESSAGE
                    }
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName="email" />
              </Box>

              <Box>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  error={!!errors['password']}
                  {...register('password', {
                    required: FIELD_REQUIRED_MESSAGE,
                    pattern: {
                      value: PASSWORD_RULE,
                      message: PASSWORD_RULE_MESSAGE
                    }
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName="password" />
              </Box>
            </Box>

            <CardActions sx={{ width: '100%', px: 0, pt: 3, pb: 1 }}>
              <Button
                className="interceptor-loading"
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{ py: 1.3, fontWeight: 700 }}
              >
                Sign In
              </Button>
            </CardActions>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Don&apos;t have an account yet?{' '}
                <Link to="/register" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                  Create one now
                </Link>
              </Typography>
            </Box>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default LoginForm

