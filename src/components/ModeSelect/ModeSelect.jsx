import { useColorScheme } from '@mui/material/styles'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (event) => {
    setMode(event.target.value)
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120 }}>
      <InputLabel
        id="label-select-dark-light-mode"
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit'),
          '&.Mui-focused': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit')
          }
        }}
      >
        Theme
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode || 'system'}
        label="Theme"
        onChange={handleChange}
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit'),
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)')
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit')
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit')
          },
          '.MuiSvgIcon-root': {
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'inherit')
          }
        }}
      >
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightnessIcon fontSize="small" /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect

