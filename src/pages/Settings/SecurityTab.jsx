import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import PasswordIcon from '@mui/icons-material/Password'
import LockResetIcon from '@mui/icons-material/LockReset'
import LockIcon from '@mui/icons-material/Lock'
import LogoutIcon from '@mui/icons-material/Logout'
import { FIELD_REQUIRED_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useForm } from 'react-hook-form'
import { useConfirm } from 'material-ui-confirm'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { updateUserAPI, logoutUserAPI } from '~/redux/user/userSlice'

function SecurityTab() {
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const confirmChangePassword = useConfirm()

  const submitChangePassword = (data) => {
    confirmChangePassword({
      title: (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LogoutIcon sx={{ color: 'warning.main' }} /> Change Password
        </Box>
      ),
      description: 'You will need to log in again after changing your password. Continue?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel'
    }).then(() => {
      const { current_password, new_password } = data
      toast.promise(dispatch(updateUserAPI({ current_password, new_password })), {
        pending: 'Updating password...'
      }).then((res) => {
        if (!res.error) {
          toast.success('Password updated successfully! Please log in again.')
          dispatch(logoutUserAPI(false))
        }
      })
    }).catch(() => {})
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        Security & Password
      </Typography>

      <form onSubmit={handleSubmit(submitChangePassword)} style={{ width: '100%', maxWidth: 440 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <Box>
            <TextField
              fullWidth
              label="Current Password"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PasswordIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              {...register('current_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              error={!!errors['current_password']}
            />
            <FieldErrorAlert errors={errors} fieldName="current_password" />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              {...register('new_password', {
                required: FIELD_REQUIRED_MESSAGE,
                pattern: {
                  value: PASSWORD_RULE,
                  message: PASSWORD_RULE_MESSAGE
                }
              })}
              error={!!errors['new_password']}
            />
            <FieldErrorAlert errors={errors} fieldName="new_password" />
          </Box>

          <Box>
            <TextField
              fullWidth
              label="Confirm New Password"
              type="password"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockResetIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              {...register('password_confirmation', {
                validate: (value) => {
                  if (value === watch('new_password')) return true
                  return 'Password confirmation does not match!'
                }
              })}
              error={!!errors['password_confirmation']}
            />
            <FieldErrorAlert errors={errors} fieldName="password_confirmation" />
          </Box>

          <Button
            className="interceptor-loading"
            type="submit"
            variant="contained"
            color="warning"
            size="large"
            fullWidth
            sx={{ py: 1.2, fontWeight: 700 }}
          >
            Change Password
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default SecurityTab

