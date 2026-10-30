import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  fetchExamplesAPI,
  createExampleAPI,
  updateExampleAPI,
  deleteExampleAPI
} from '~/apis/index'

const initialState = {
  items: [],
  total: 0,
  page: 1,
  itemsPerPage: 12,
  totalPages: 1,
  isLoading: false,
  error: null
}

export const getExamplesThunk = createAsyncThunk(
  'example/getExamplesThunk',
  async (params) => {
    return await fetchExamplesAPI(params)
  }
)

export const createExampleThunk = createAsyncThunk(
  'example/createExampleThunk',
  async (data) => {
    return await createExampleAPI(data)
  }
)

export const updateExampleThunk = createAsyncThunk(
  'example/updateExampleThunk',
  async ({ id, data }) => {
    return await updateExampleAPI(id, data)
  }
)

export const deleteExampleThunk = createAsyncThunk(
  'example/deleteExampleThunk',
  async (id) => {
    await deleteExampleAPI(id)
    return id
  }
)

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getExamplesThunk.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getExamplesThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.items || []
        state.total = action.payload.total || 0
        state.page = action.payload.page || 1
        state.itemsPerPage = action.payload.itemsPerPage || 12
        state.totalPages = action.payload.totalPages || 1
      })
      .addCase(getExamplesThunk.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
      .addCase(createExampleThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.total += 1
      })
      .addCase(updateExampleThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(deleteExampleThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload)
        state.total = Math.max(0, state.total - 1)
      })
  }
})

export const selectExamples = (state) => state.example.items
export const selectExampleMeta = (state) => ({
  total: state.example.total,
  page: state.example.page,
  itemsPerPage: state.example.itemsPerPage,
  totalPages: state.example.totalPages,
  isLoading: state.example.isLoading
})

export const exampleReducer = exampleSlice.reducer

