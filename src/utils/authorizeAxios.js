import axios from 'axios'
import { toast } from 'react-toastify'
import { interceptorLoadingElements } from './formatter'
import { refreshTokenAPI } from '~/apis/index'
import { logoutUserAPI, setAccessToken } from '~/redux/user/userSlice'

let axiosReduxStore
export const injectStore = (mainStore) => { axiosReduxStore = mainStore }

const authorizedAxiosInstance = axios.create()
authorizedAxiosInstance.defaults.timeout = 10 * 60 * 1000
authorizedAxiosInstance.defaults.withCredentials = true

// Request Interceptor: Attach Bearer Token & anti-spam loading state
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    interceptorLoadingElements(true)

    // Dual-Auth: Attach Bearer token from Redux store for mobile / third-party clients
    const currentUser = axiosReduxStore?.getState()?.user?.currentUser
    const accessToken = currentUser?.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

let refreshTokenPromise = null

// Response Interceptor: Auto token refresh & global error toast handling
authorizedAxiosInstance.interceptors.response.use(
  (response) => {
    interceptorLoadingElements(false)
    return response
  },
  (error) => {
    interceptorLoadingElements(false)
    const originalRequests = error.config

    // Case 1: Unauthorized 401 (invalid/stale session) -> Logout immediately
    if (
      error.response?.status === 401 &&
      !originalRequests?.url?.includes('/users/login') &&
      !originalRequests?.url?.includes('/users/register') &&
      !originalRequests?.url?.includes('/users/logout')
    ) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    // Case 2: 410 GONE (Access token expired) -> Silent refresh token rotation
    if (error.response?.status === 410 && !originalRequests._retry) {
      originalRequests._retry = true

      if (!refreshTokenPromise) {
        const currentRefreshToken = axiosReduxStore?.getState()?.user?.currentUser?.refreshToken
        refreshTokenPromise = refreshTokenAPI(currentRefreshToken)
          .then((data) => {
            if (data?.accessToken) {
              axiosReduxStore.dispatch(setAccessToken(data.accessToken))
            }
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(logoutUserAPI(false))
            return Promise.reject(_error)
          })
          .finally(() => {
            refreshTokenPromise = null
          })
      }

      return refreshTokenPromise.then((accessToken) => {
        if (accessToken) {
          originalRequests.headers.Authorization = `Bearer ${accessToken}`
        }
        return authorizedAxiosInstance(originalRequests)
      })
    }

    // Centralized Error Notification Toast
    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    }

    if (error.response?.status === 401) {
      toast.error(errorMessage, { toastId: 'auth-unauthorized-error' })
    } else if (error.response?.status !== 410) {
      toast.error(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default authorizedAxiosInstance

