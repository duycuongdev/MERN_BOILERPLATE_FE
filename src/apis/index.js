import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

/**
 * User & Authentication APIs
 */
export const registerUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/register`, data)
  return response.data
}

export const verifyUserAPI = async (data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/verify`, data)
  toast.success('Account verified successfully! You can now log in.', {
    toastId: 'account-verified-success'
  })
  return response.data
}

export const refreshTokenAPI = async (refreshToken) => {
  const headers = {}
  if (refreshToken) {
    headers['x-refresh-token'] = refreshToken
  }
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`, { headers })
  return response.data
}

export const fetchCurrentUserAPI = async () => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/me`)
  return response.data
}

/**
 * Example Resource CRUD APIs
 */
export const fetchExamplesAPI = async (params = {}) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/examples`, { params })
  return response.data
}

export const fetchExampleDetailsAPI = async (id) => {
  const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/examples/${id}`)
  return response.data
}

export const createExampleAPI = async (data) => {
  const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/examples`, data)
  toast.success('Item created successfully!')
  return response.data
}

export const updateExampleAPI = async (id, data) => {
  const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/examples/${id}`, data)
  toast.success('Item updated successfully!')
  return response.data
}

export const deleteExampleAPI = async (id) => {
  const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/examples/${id}`)
  toast.success('Item deleted successfully!')
  return response.data
}

