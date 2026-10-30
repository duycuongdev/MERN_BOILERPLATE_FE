import React from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import SecurityIcon from '@mui/icons-material/Security'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, logoutUserAPI } from '~/redux/user/userSlice'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'

function Profile() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const dispatch = useDispatch()
  const currentUser = useSelector(selectCurrentUser)
  const confirmLogout = useConfirm()

  const handleLogout = () => {
    confirmLogout({
      title: 'Log out of your account?',
      confirmationText: 'Log out',
      cancellationText: 'Cancel'
    }).then(() => {
      dispatch(logoutUserAPI())
    }).catch(() => {})
  }

  return (
    <Box>
      <Tooltip title="Account settings">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ padding: 0 }}
          aria-controls={open ? 'basic-menu-profile' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar
            sx={{ width: 36, height: 36, border: '2px solid rgba(255,255,255,0.4)' }}
            alt={currentUser?.displayName || currentUser?.username}
            src={currentUser?.avatar}
          />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-profile"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/settings/account" style={{ color: 'inherit', textDecoration: 'none' }}>
          <MenuItem>
            <Avatar sx={{ width: 28, height: 28, mr: 1.5 }} src={currentUser?.avatar} />
            Profile & Account
          </MenuItem>
        </Link>
        <Link to="/settings/security" style={{ color: 'inherit', textDecoration: 'none' }}>
          <MenuItem>
            <ListItemIcon>
              <SecurityIcon fontSize="small" />
            </ListItemIcon>
            Security & Password
          </MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Profile

