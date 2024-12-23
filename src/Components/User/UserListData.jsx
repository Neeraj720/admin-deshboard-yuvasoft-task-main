import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUserData } from '../../Redux/Auth/AuthSlice'
import {  useNavigate } from 'react-router-dom'
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import Pagination from '../Pagination/Pagination';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loading/Loader'


function UserListData() {
    const { user, allUserData,isLoading } = useSelector((state) => state.auth)
    console.log("user list")
    // console.log(allUserData)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllUserData())
    }, [user.token])
    // pagination

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10
    const totelPages = Math.ceil(allUserData?.length / itemPerPage)

    // Current Item Page

    const currentItems = allUserData?.slice(
        (currentPage - 1) * itemPerPage, currentPage * itemPerPage
    )
    // User details

    const handleUserDetails = (id) => {
        navigate(`/user/details/${id}`)
    }

    // update user details
    const handleUserUpdate = (userId) => {
        navigate(`/user/update/${userId}`)
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
    const handleDeleteUser = () => {
        dispatch(deleteUser(deleteItemId))
        handleCloseModel()
    }
    return (
        <>
            <div className="container-fluid">
                {
                    isLoading ? <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
                        <Loader />
                    </div> : <> <div className="row">
                    <div className="col-lg-12">
                              <div className="block margin-bottom-sm">
                                  <div className="title"><strong>Basic Table</strong></div>
                                  <div className="table-responsive">
                                      <table className="table">
                                          <thead>
                                              <tr>
                                                  <th>Name</th>
                                                  <th>Email</th>
                                                  <th>Actions</th>
                                              </tr>
                                          </thead>
                                          <tbody>
                                              {
                                                  currentItems.map((user, index) => {
                                                      return <>
                                                          <tr key={user.id}>
                                                              <td>{user.name}</td>
                                                              <td>{user.email}</td>
                                                              <td>
                                                                  <FaEye style={{ marginRight: '1rem' }} size={20} onClick={() => handleUserDetails(user.id)} />
                                                                  <MdModeEdit style={{ marginRight: '1rem' }} size={20} onClick={() => handleUserUpdate(user.id)} />
                                                                  {/* <MdDelete data-toggle="modal" data-target="#exampleModal" style={{ marginRight: '1rem' }} size={20} onClick={() => handleShowModel(user.id)} />
                                                                   */}
                                                                   <button className='btn btn-danger' onClick={() => handleShowModel(user.id)}>Delete</button>
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
                                                          <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleDeleteUser}>Yes</button>
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
                  </div></>
                }
               
            </div>

        </>
    )
}

export default UserListData