import { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUser, fetchCurrentUserAPI } from '~/redux/user/userSlice'

// Pages
import Home from '~/pages/Home/Home'
import Dashboard from '~/pages/Dashboard/Dashboard'
import Settings from '~/pages/Settings/Settings'
import Auth from '~/pages/Auth/Auth'
import AccountVerification from '~/pages/Auth/AccountVerification'
import NotFound from '~/pages/404/NotFound'

const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to="/login" replace={true} />
  return <Outlet />
}

function App() {
  const dispatch = useDispatch()
  const location = useLocation()
  const currentUser = useSelector(selectCurrentUser)
  const currentUserId = currentUser?._id

  // Proactive session validation on mount, route change, and window focus
  useEffect(() => {
    if (!currentUserId) return

    dispatch(fetchCurrentUserAPI())

    const handleCheckSession = () => {
      if (document.visibilityState === 'visible') {
        dispatch(fetchCurrentUserAPI())
      }
    }

    window.addEventListener('focus', handleCheckSession)
    document.addEventListener('visibilitychange', handleCheckSession)

    return () => {
      window.removeEventListener('focus', handleCheckSession)
      document.removeEventListener('visibilitychange', handleCheckSession)
    }
  }, [dispatch, currentUserId, location.pathname])

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={currentUser} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/account" element={<Settings />} />
        <Route path="/settings/security" element={<Settings />} />
      </Route>

      {/* Authentication */}
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/account/verification" element={<AccountVerification />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

