import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MailIcon from '@mui/icons-material/Mail'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import FieldErrorAlert from '~/components/Form/FieldErrorAlert'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, updateUserAPI } from '~/redux/user/userSlice'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import VisuallyHiddenInput from '~/components/Form/VisuallyHiddenInput'

function AccountTab() {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      displayName: currentUser?.displayName || ''
    }
  })

  const submitChangeGeneralInformation = (data) => {
    const { displayName } = data
    if (displayName === currentUser?.displayName) return

    toast.promise(dispatch(updateUserAPI({ displayName })), {
      pending: 'Updating profile...'
    })
  }

  const uploadAvatar = (e) => {
    const file = e.target?.files[0]
    const error = singleFileValidator(file)
    if (error) {
      toast.error(error)
      return
    }

    const reqData = new FormData()
    reqData.append('avatar', file)

    toast.promise(dispatch(updateUserAPI(reqData)), {
      pending: 'Uploading avatar to Cloudinary...'
    }).finally(() => {
      e.target.value = ''
    })
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 3
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title="Click to upload new avatar">
          <Box component="label" sx={{ cursor: 'pointer', position: 'relative' }}>
            <Avatar
              sx={{ width: 84, height: 84, mb: 1, border: '3px solid', borderColor: 'primary.main' }}
              alt={currentUser?.displayName}
              src={currentUser?.avatar}
            />
            <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
          </Box>
        </Tooltip>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {currentUser?.displayName || currentUser?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {currentUser?.email}
          </Typography>
          <Button
            component="label"
            variant="outlined"
            size="small"
            startIcon={<CloudUploadIcon />}
            sx={{ mt: 1 }}
          >
            Upload Photo
            <VisuallyHiddenInput type="file" onChange={uploadAvatar} />
          </Button>
        </Box>
      </Box>

      <form onSubmit={handleSubmit(submitChangeGeneralInformation)} style={{ width: '100%', maxWidth: 440 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField
            disabled
            defaultValue={currentUser?.email}
            fullWidth
            label="Email Address"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />

          <TextField
            disabled
            defaultValue={currentUser?.username}
            fullWidth
            label="Username"
            variant="filled"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountBoxIcon fontSize="small" />
                </InputAdornment>
              )
            }}
          />

          <Box>
            <TextField
              fullWidth
              label="Display Name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentIndIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              {...register('displayName', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              error={!!errors['displayName']}
            />
            <FieldErrorAlert errors={errors} fieldName="displayName" />
          </Box>

          <Button
            className="interceptor-loading"
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            sx={{ py: 1.2, fontWeight: 700 }}
          >
            Update Profile
          </Button>
        </Box>
      </form>
    </Box>
  )
}

export default AccountTab

