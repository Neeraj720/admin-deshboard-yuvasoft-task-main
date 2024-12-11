import React, { useEffect } from 'react'
import Sidebar from '../Components/NavBar/Sidebar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import UserList from '../Pages/User/UserList'
import Header from '../Components/NavBar/Header'
import UserDetails from '../Pages/User/UserDetails'
import Footer from '../Components/Footer/Footer'
import UserUpdate from '../Pages/User/UserUpdate'
import ProductList from '../Pages/Product/ProductList'
import CategoryList from '../Pages/Category/CategoryList'
import CategoryDetails from '../Pages/Category/CategoryDetails'
import CategoryForm from '../Pages/Category/CategoryForm'
import ProductDetails from '../Pages/Product/ProductDetails'
import ProductForm from '../Pages/Product/ProductForm'
import { useSelector } from 'react-redux'

function LayOut() {
  const {userToken} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  useEffect(()=>{
    if(userToken){
      navigate('/user/deshboard')
    }
  },[userToken])
  return (<>
    <Header />
    <div class="d-flex align-items-stretch">
      <Sidebar />
      <Routes>
        {/* user routes */}
        <Route path='/user/deshboard' element={<PrivateRoute Component={UserList} />} />
        <Route path='/user/details/:id' element={<PrivateRoute Component={UserDetails} />} />
        <Route path='/user/update/:id' element={<PrivateRoute Component={UserUpdate} />} />
        {/* product routes */}
        <Route path='/product/deshboard' element={<PrivateRoute Component={ProductList} />} />
        <Route path='/product/details/:id' element={<PrivateRoute Component={ProductDetails} />} />
        <Route path='/product/add' element={<PrivateRoute Component={ProductForm} />} />
        <Route path='/product/update/:id' element={<PrivateRoute Component={ProductForm} />} />
        {/* category routes */}
        <Route path='/category/deshboard' element={<PrivateRoute Component={CategoryList} />} />
        <Route path='/category/details/:id' element={<PrivateRoute Component={CategoryDetails} />} />
        <Route path='/category/add/' element={<PrivateRoute Component={CategoryForm} />} />
        <Route path='/category/update/:id' element={<PrivateRoute Component={CategoryForm} />} />

      </Routes>
      <Footer />
    </div>
  </>
  )
}

export default LayOut