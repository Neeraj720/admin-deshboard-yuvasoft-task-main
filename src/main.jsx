import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from "redux-persist";
import { Provider } from 'react-redux'
import store from './Redux/Store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'
const persistor = persistStore(store)
const GOOGLE_CLIENT_ID = "620201569110-8oilv2o04samm4an172cnlcfu6c5dlc5.apps.googleusercontent.com";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
