import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Login from '../Pages/Auth/Login'
import Register from '../Pages/Auth/Register'
import EmailVarification from '../Pages/Auth/EmailVarification'
import { useSelector } from 'react-redux'
import LayOut from './LayOut'
import ResetPassword from '../Pages/Auth/ResetPassword'
import ForgotPassword from '../Components/Login/ForgotPassword'
import PageNotFound from '../Components/PageNotFound/PageNotFound'
function AppRoute() {
  const {userToken} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  // useEffect(()=>{
  //   if(!userToken){
  //     navigate('/')
  //   }
  // },[userToken])
  return (
    <>
    { 
      !userToken ?(<Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/email/varification' element={<EmailVarification />} />
        <Route path='/forgot/password' element={<ForgotPassword />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/auth/reset-password/:id/:token' element={<ResetPassword />}/>
    </Routes>) :(<LayOut/>)
    }
    </>
  )
}

export default AppRoute