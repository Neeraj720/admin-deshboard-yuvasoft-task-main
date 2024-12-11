import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getUserDetails } from '../../Redux/Auth/AuthSlice'
import Back from '../../Components/Button/Back'
import Loader from '../../Components/Loading/Loader'

function UserDetails() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {  userInfo ,isLoading} = useSelector((state) => state.auth)
  const { id } = useParams()
  useEffect(() => {
    dispatch(getUserDetails(id))
  }, [id])
  return (
    <>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          {
            isLoading ? <Loader /> :  <div>
            <Link to='/user/deshboard'>
              <Back />
            </Link>
            <div className="shadow-lg" style={{ padding: '1rem 5rem' }}>
              <h5>User Details</h5>
              <p>Name : {userInfo.name}</p>
              <p>Mobile : {userInfo.email}</p>
              <p>Created At: {new Date(userInfo.createAt).toLocaleDateString(
                "en-In"
              )}</p>
              <p>Updated At : {new Date(userInfo.updateAt).toLocaleDateString(
                "en-In"
              )}</p>
            </div>
          </div>
          }
         
        </div>
      </div>
    </>
  )
}

export default UserDetails