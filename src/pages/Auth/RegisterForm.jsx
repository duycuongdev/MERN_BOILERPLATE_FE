import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import MuiCard from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import TextField from '@mui/material/TextField'
import Zoom from '@mui/material/Zoom'
import Divider from '@mui/material/Divider'
import { useForm } from 'react-hook-form'
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { toast } from 'react-toastify'
import { registerUserAPI } from '~/apis/index'
import LogoIcon from '~/components/Icons/LogoIcon'

function RegisterForm() {
  const navigate = useNavigate()
  const { handleSubmit, register, watch, formState: { errors } } = useForm()

  const submitRegister = (data) => {
    const { email, password } = data
    toast.promise(registerUserAPI({ email, password }), {
      pending: 'Creating your account...'
    }).then((user) => {
      navigate(`/login?registeredEmail=${user.email}`)
    })
  }

  return (
    <form onSubmit={handleSubmit(submitRegister)} style={{ width: '100%', maxWidth: 420 }}>
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
              Create an account
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
              Join us to get started immediately
            </Typography>

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

              <Box>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  error={!!errors['password_confirmation']}
                  {...register('password_confirmation', {
                    validate: (value) => {
                      if (value === watch('password')) return true
                      return PASSWORD_CONFIRMATION_MESSAGE
                    }
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName="password_confirmation" />
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
                Create Account
              </Button>
            </CardActions>

            <Divider sx={{ width: '100%', my: 2 }} />

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#2563eb', fontWeight: 600, textDecoration: 'none' }}>
                  Sign in here
                </Link>
              </Typography>
            </Box>
          </Box>
        </MuiCard>
      </Zoom>
    </form>
  )
}

export default RegisterForm

