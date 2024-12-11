import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProductList, productDelete } from '../../Redux/Product/ProductSlice'
import Pagination from '../Pagination/Pagination'
import { FaEye } from 'react-icons/fa'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import imageNotFound from '../../assets/img/imgNotFound.png'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loading/Loader'
function ProductListData() {
    const { allProductData } = useSelector((state) => state.product)
    // console.log("all :", allProductData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProductList())
    }, [])
    // pagination

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 5
    const totelPages = Math.ceil(allProductData?.length / itemPerPage)

    // Current Item Page

    const currentItems = allProductData?.slice(
        (currentPage - 1) * itemPerPage, currentPage * itemPerPage
    )
    // Update product
    const handleProductDetails = (id) => {
        navigate(`/product/details/${id}`)
    }

    // model
    const [showModel, setShowModel] = useState(false)
    const [deleteItemId, setDeleteItemId] = useState(null)


    const handleShowModel = (id) => {
        setShowModel(true)
        setDeleteItemId(id)
    }

    const handleCloseModel = () => {
        setShowModel(false)
        setDeleteItemId(null)
    }
    // Delete Product
    const handleDeleteProduct = () => {
        // console.log(id)
        dispatch(productDelete(deleteItemId))
        handleCloseModel()
    }
    // update 
    const handleUserUpdate = (id) => {
        navigate(`/product/update/${id}`)
    }
    return (
        <>
            <div className="container-fluid">
                {
                    allProductData.length > 0 ? (<>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="block margin-bottom-sm">
                                    <div className="title"><strong>Basic Table</strong></div>
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    currentItems.map((product, index) => {
                                                        return <>
                                                            <tr key={product._id}>
                                                                <td>
                                                                    <img src={product.fileName 
                                                                        ? imageNotFound
                                                                        : `https://node-js-wse4.onrender.com/uploads/${product.fileName}`} alt="" width={150} />
                                                                </td>
                                                                <td>{product.name}</td>
                                                                <td>{product.description}</td>
                                                                <td>
                                                                    <FaEye style={{ marginRight: '1rem' }} size={20} onClick={() => handleProductDetails(product._id)} />
                                                                    <MdModeEdit style={{ marginRight: '1rem' }} size={20} onClick={() => handleUserUpdate(product._id)} />
                                                                    <MdDelete data-toggle="modal" data-target="#exampleModal" style={{ marginRight: '1rem' }} size={20} onClick={() => handleShowModel(product._id)} />
                                                                </td>
                                                            </tr>
                                                        </>
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {/* Model start */}
                                        {
                                            showModel && <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Delete</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModel}>
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body">
                                                            are you sure you want to delete user?
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleCloseModel}>No</button>
                                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleDeleteProduct}>Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }

                                        {/* model end */}
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            <Pagination totalPages={totelPages}
                                currentPage={currentPage}
                                onPageChange={setCurrentPage}
                            />
                        </div></>) : (
                        <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
                            <h5>Product List is Empty</h5>
                        </div>
                    )
                }

            </div>

        </>
    )
}

export default ProductListData