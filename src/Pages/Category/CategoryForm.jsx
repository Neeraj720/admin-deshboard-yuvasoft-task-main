import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { createCategory, updateCategory } from '../../Redux/Category/CategorySlice'
function CategoryForm() {
    const { id } = useParams()
    const { allCategoryData ,categoryUpdateStatus} = useSelector((state) => state.category)
    const category = allCategoryData.find((item) => item._id === id)
    const navigate = useNavigate()
    const [initialValue, setInitialValues] = useState({
        name: '',
        status: false
    })

    useEffect(() => {
        if (category) {
            setInitialValues({
                name: category.name,
                status: category.status
            })
        }
    }, [category])
    const dispatch = useDispatch()
    const formik = useFormik({
        // when we update a form 
        enableReinitialize: true,
        initialValues: initialValue,
        validationSchema: Yup.object().shape({
            name: Yup.string("Enter category name").required("Category name is required"),
            status: Yup.string("Select category status").required("category Status is required")
        }),
        onSubmit: (values) => {
            if(category){
                dispatch(updateCategory({id:category._id,...values}))
            }
            else{
                dispatch(createCategory(values))
            }
        }
    })
    useEffect(()=>{
        if(categoryUpdateStatus == "Success"){
            navigate('/category/deshboard')
        }
    },[categoryUpdateStatus])
    return (
        <div className="page-content">
            <div className="page-header no-margin-bottom">
                <div className="container-fluid">
                    <h2 className="h5 no-margin-bottom">Basic forms</h2>
                </div>
            </div>
            <div className="container-fluid">
                <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to='/category/deshboard'>Home</Link>
                    </li>
                    <li className="breadcrumb-item active">{category ? "Category Update form" : "Category Add form"}</li>
                </ul>
            </div>
            <section className="no-padding-top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="block">
                                <div className="title"><strong className="d-block">{category ? "Update Form" : "Add Form"}</strong></div>
                                <div className="block-body">
                                    <form onSubmit={formik.handleSubmit}>
                                        <div className="form-group">
                                            <label className="form-control-label">Name</label>
                                            <input
                                                type="text"
                                                placeholder="Category  Name"
                                                className="form-control"
                                                name='name'
                                                onChange={formik.handleChange}
                                                value={formik.values.name}
                                            // value={category.name}
                                            />
                                            {formik.touched.name && formik.errors.name && (
                                                <div style={{ color: 'red' }}>
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <select name="status" class="form-control mb-3 mb-3" value={formik.values.status} onChange={formik.handleChange}>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                            {formik.touched.status && formik.errors.status && (
                                                <div style={{ color: 'red' }}>
                                                    {formik.errors.status}
                                                </div>
                                            )}
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary" type='submit'>{category ? "Update" : "Add"}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CategoryForm