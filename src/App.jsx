import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoute from './Routes/AppRoute'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <BrowserRouter>
      <AppRoute />
      <ToastContainer />
    </BrowserRouter>
  )
}
export default App