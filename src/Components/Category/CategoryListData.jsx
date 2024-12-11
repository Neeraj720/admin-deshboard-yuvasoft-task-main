import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryList } from '../../Redux/Category/CategorySlice'
import Pagination from '../Pagination/Pagination'
import { FaEye } from 'react-icons/fa'
import { MdDelete, MdModeEdit } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function CategoryListData() {
  const {allCategoryData} = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() =>{
    dispatch(getAllCategoryList())
  },[])
    // pagination

    const [currentPage, setCurrentPage] = useState(1)
    const itemPerPage = 10
    const totelPages = Math.ceil(allCategoryData?.length / itemPerPage)

    // Current Item Page

    const currentItems = allCategoryData?.slice(
        (currentPage - 1) * itemPerPage, currentPage * itemPerPage
    )
    // get single category

    const handleCategoryDetails = (id) =>{
      navigate(`/category/details/${id}`)
    }
    // Update category
   const handleCategoryUpdate = (id) =>{
    navigate(`/category/update/${id}`)
   }
  return (
    <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="block margin-bottom-sm">
                            <div className="title"><strong>Basic Table</strong></div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            currentItems.map((category, index) => {
                                                return <>
                                                    <tr key={category._id}>
                                                        <td>{category.name}</td>
                                                        <td>
                                                            <FaEye style={{ marginRight: '1rem' }} size={20} onClick={() => handleCategoryDetails(category._id)} />
                                                            <MdModeEdit style={{ marginRight: '1rem' }} size={20} onClick={() => handleCategoryUpdate(category._id)} />
                                                        </td>
                                                    </tr>
                                                </>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <Pagination totalPages={totelPages}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
  
  )
}

export default CategoryListData