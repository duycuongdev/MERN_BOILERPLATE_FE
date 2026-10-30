import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { API_ROOT } from '~/utils/constants'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { toast } from 'react-toastify'

const initialState = {
  currentUser: null
}

export const loginUserApi = createAsyncThunk(
  'user/loginUserApi',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    return response.data
  }
)

export const loginGoogleUserAPI = createAsyncThunk(
  'user/loginGoogleUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/google-login`, data)
    return response.data
  }
)

export const fetchCurrentUserAPI = createAsyncThunk(
  'user/fetchCurrentUserAPI',
  async () => {
    const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/users/me`)
    return response.data
  }
)

export const logoutUserAPI = createAsyncThunk(
  'user/logoutUserAPI',
  async (showSuccessMessage = true) => {
    let responseData = {}
    try {
      const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/users/logout`)
      responseData = response.data
    } catch (_error) {
      // Client still logs out even if backend fails
    }
    if (showSuccessMessage) {
      toast.success('Logged out successfully!')
    }
    return responseData
  }
)

export const updateUserAPI = createAsyncThunk(
  'user/updateUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/users/update`, data)
    toast.success('Profile updated successfully!')
    return response.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      if (state.currentUser) {
        state.currentUser.accessToken = action.payload
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUserApi.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(loginGoogleUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(fetchCurrentUserAPI.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload
      }
    })
    builder.addCase(logoutUserAPI.fulfilled, (state) => {
      state.currentUser = null
    })
    builder.addCase(logoutUserAPI.rejected, (state) => {
      state.currentUser = null
    })
    builder.addCase(updateUserAPI.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        ...action.payload
      }
    })
  }
})

export const { setAccessToken } = userSlice.actions
export const selectCurrentUser = (state) => state.user.currentUser
export const userReducer = userSlice.reducer

