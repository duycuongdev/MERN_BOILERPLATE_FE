let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
  apiRoot = 'http://localhost:8017'
}
if (process.env.BUILD_MODE === 'production') {
  apiRoot = process.env.VITE_API_ROOT || ''
}

export const API_ROOT = apiRoot
export const GOOGLE_CLIENT_ID = process.env.VITE_GOOGLE_CLIENT_ID || 'dummy-google-client-id'

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

