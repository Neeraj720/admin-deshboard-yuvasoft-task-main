import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCategoryDetails } from '../../Redux/Category/CategorySlice'
import Back from '../../Components/Button/Back'
import Loader from '../../Components/Loading/Loader'

function CategoryDetails() {
    const {isLoading,categoryInfo} = useSelector((state) => state.category)
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getCategoryDetails(id))
    },[id])
  return (
    <>
      <div className="page-content">
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          {
            isLoading ? <Loader /> :  <div>
            <Link to='/category/deshboard'>
              <Back />
            </Link>
            <div className="shadow-lg" style={{ padding: '1rem 5rem' }}>
              <h5>Category Details</h5>
              <p>Name : {categoryInfo.name}</p>
              <p>Created At: {new Date(categoryInfo.createAt).toLocaleDateString(
                "en-In"
              )}</p>
              <p>Updated At : {new Date(categoryInfo.updateAt).toLocaleDateString(
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

export default CategoryDetails