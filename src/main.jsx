import ReactDOM from 'react-dom/client'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import GlobalStyles from '@mui/material/GlobalStyles'
import theme from '~/theme'
import App from '~/App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Material UI Confirm Provider
import { ConfirmProvider } from 'material-ui-confirm'

// Redux & Persist
import { Provider } from 'react-redux'
import { store } from '~/redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

// Router
import { BrowserRouter } from 'react-router-dom'

// Inject Redux store into Axios interceptor
import { injectStore } from '~/utils/authorizeAxios'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GOOGLE_CLIENT_ID } from '~/utils/constants'

const persistor = persistStore(store)
injectStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} locale="en">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter basename="/" future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <CssVarsProvider theme={theme}>
            <ConfirmProvider defaultOptions={{
              dialogProps: { maxWidth: 'xs' },
              confirmationButtonProps: { color: 'primary', variant: 'contained' },
              cancellationButtonProps: { color: 'inherit' },
              allowClose: false,
              buttonOrder: ['confirm', 'cancel']
            }}>
              <GlobalStyles styles={{
                a: { textDecoration: 'none' },
                '.Toastify__toast-container': {
                  width: 'min(92vw, 380px) !important',
                  left: '50% !important',
                  transform: 'translateX(-50%) !important',
                  top: '16px !important',
                  padding: '0 !important',
                  zIndex: '99999 !important'
                },
                '.Toastify__toast': {
                  borderRadius: '12px !important',
                  minHeight: '44px !important',
                  padding: '8px 14px !important',
                  fontSize: '13.5px !important',
                  fontWeight: '500 !important',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2) !important',
                  marginBottom: '8px !important'
                },
                '.Toastify__toast-body': {
                  padding: '0 !important',
                  margin: '0 !important',
                  lineHeight: '1.4 !important'
                },
                '.Toastify__toast-icon': {
                  width: '18px !important',
                  marginRight: '10px !important'
                },
                '.Toastify__close-button': {
                  alignSelf: 'center !important',
                  opacity: '0.8 !important'
                }
              }} />
              <CssBaseline />
              <App />
              <ToastContainer
                position="top-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="colored"
              />
            </ConfirmProvider>
          </CssVarsProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>
)

