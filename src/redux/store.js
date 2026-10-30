import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { userReducer } from './user/userSlice'
import { exampleReducer } from './example/exampleSlice'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const reducers = combineReducers({
  user: userReducer,
  example: exampleReducer
})

const persistedReducer = persistReducer(rootPersistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

