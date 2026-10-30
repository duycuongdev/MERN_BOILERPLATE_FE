import { useEffect, useState } from 'react'
import AppBar from '~/components/AppBar/AppBar'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import { Link, useLocation } from 'react-router-dom'
import AccountTab from './AccountTab'
import SecurityTab from './SecurityTab'

const TABS = {
  ACCOUNT: 'account',
  SECURITY: 'security'
}

function Settings() {
  const location = useLocation()
  const getDefaultTab = () => {
    if (location.pathname.includes(TABS.SECURITY)) return TABS.SECURITY
    return TABS.ACCOUNT
  }

  const [activeTab, setActiveTab] = useState(getDefaultTab())

  useEffect(() => {
    setActiveTab(location.pathname.includes(TABS.SECURITY) ? TABS.SECURITY : TABS.ACCOUNT)
  }, [location.pathname])

  const handleChangeTab = (event, selectedTab) => {
    setActiveTab(selectedTab)
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar />
      <Container maxWidth="md" sx={{ pt: 4, pb: 8 }}>
        <TabContext value={activeTab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
            <TabList onChange={handleChangeTab}>
              <Tab
                label="Account & Profile"
                value={TABS.ACCOUNT}
                icon={<PersonIcon />}
                iconPosition="start"
                component={Link}
                to="/settings/account"
              />
              <Tab
                label="Security & Password"
                value={TABS.SECURITY}
                icon={<SecurityIcon />}
                iconPosition="start"
                component={Link}
                to="/settings/security"
              />
            </TabList>
          </Box>
          <TabPanel value={TABS.ACCOUNT} sx={{ px: 0 }}>
            <AccountTab />
          </TabPanel>
          <TabPanel value={TABS.SECURITY} sx={{ px: 0 }}>
            <SecurityTab />
          </TabPanel>
        </TabContext>
      </Container>
    </Box>
  )
}

export default Settings

