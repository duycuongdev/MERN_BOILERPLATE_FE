import { useEffect, useState } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import { verifyUserAPI } from '~/apis/index'
import PageLoadingSpinner from '~/components/Loading/PageLoadingSpinner'

function AccountVerification() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const token = searchParams.get('token')

  const [verified, setVerified] = useState(false)

  useEffect(() => {
    if (email && token) {
      verifyUserAPI({ email, token })
        .then(() => setVerified(true))
        .catch(() => setVerified(false))
    }
  }, [email, token])

  if (!email || !token) {
    return <Navigate to="/404" />
  }

  if (verified) {
    return <Navigate to={`/login?verifiedEmail=${email}`} />
  }

  return <PageLoadingSpinner caption="Verifying your account, please wait..." />
}

export default AccountVerification

