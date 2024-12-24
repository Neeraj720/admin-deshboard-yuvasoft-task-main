import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Loader from '../../Components/Loading/Loader'
import { getProductDetails } from '../../Redux/Product/ProductSlice'
import Back from '../../Components/Button/Back'
import imageNotFound from '../../assets/img/imgNotFound.png'
function ProductDetails() {
   const {id} = useParams()
   const {isLoading , productInfo} = useSelector((state) => state.product)
   const dispatch = useDispatch()
   useEffect(() =>{
    dispatch(getProductDetails(id))
   },[id])
  return (
    <>
    <div className="page-content">
        <div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          {
            isLoading ? <Loader /> :  <div>
            <Link to='/product/deshboard'>
              <Back />
            </Link>
            <div className="shadow-lg" style={{ padding: '1rem 2rem' }}>
              <h5>product Details</h5>
              <img src={!productInfo.fileName? imageNotFound :
                  `https://node-js-wse4.onrender.com/uploads/${productInfo.fileName}`} width={150} height={150} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Name :{productInfo.name}</h5>
                <p className="card-text">Description :{productInfo.description}</p>
                <p className='card-text'>CreateAt :{new Date(productInfo.createAt).toLocaleDateString(
                  "en-In"
                )}</p>
                <p>Updated At : {new Date(productInfo?.updateAt).toLocaleDateString(
                "en-In"
              )}</p>
              </div>
            </div>
              {/* <p>Name : {productInfo?.name}</p>
              <p>Created At: {new Date(productInfo?.createAt).toLocaleDateString(
                "en-In"
              )}</p>
              <p>Updated At : {new Date(productInfo?.updateAt).toLocaleDateString(
                "en-In"
              )}</p> */}
            </div>
          }
         
        </div>
      </div>
      <h1></h1>
    </>
  )
}

export default ProductDetails