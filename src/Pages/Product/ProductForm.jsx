import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { productCreate, productUpdate, resetProductState } from '../../Redux/Product/ProductSlice'
import { toast } from 'react-toastify'
function ProductForm() {
  const { allCategoryData } = useSelector((state) => state.category)
  const { isSuccess, isLoading, isError, AddStatus, message, productUpdateStatus } = useSelector((state) => state.product)
  const { id } = useParams()
  const { allProductData } = useSelector((state) => state.product)
  const product = allProductData.find((product) => product._id == id)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [initialValue, setInitialValues] = useState({
    name: '',
    status: false,
    description: '',
    categoryId: '',
    image: null
  })
  // update form 
  useEffect(() => {
    if (product) {
      setInitialValues({
        name: product.name || '',
        status: product.status || false,
        description: product.description || '',
        categoryId: product.categoryId || '',
        image: product.fileName || null
      })
    }
  }, [product])
  const formik = useFormik({
    // when we update a form 
    enableReinitialize: true,
    initialValues: initialValue,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      description: Yup.string().required("Description is required"),
      status: Yup.boolean().required("Status is required"),
      categoryId: Yup.string().required("Category id is required"),
      image: Yup.mixed().required("An image is required"),
    }),
    onSubmit: (values) => {
      const { name, description, status, categoryId, image } = values
      if (product) {
        dispatch(productUpdate({ id: product._id, ...values }))
      }
      else {
        const fdata = new FormData()
        fdata.append("name", name)
        fdata.append("description", description)
        fdata.append("status", status)
        fdata.append("categoryId", categoryId)
        fdata.append("image", image)
        dispatch(productCreate(fdata))
      }
    }
  })

  useEffect(() => {
    if (isSuccess && AddStatus) {
      toast.success(message)
      dispatch(resetProductState())
      navigate('/product/deshboard')
    }
    else if (isError && message) {
      toast.error(message)
    }
  }, [isError, message, AddStatus, isSuccess, navigate])
  // Handle image change
  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("image", file);
  }
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
            <Link to='/product/deshboard'>Home</Link>
          </li>
          <li className="breadcrumb-item active">{product ? "Product Add form" : "Product Update form"}</li>
        </ul>
      </div>
      <section className="no-padding-top">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="block">
                <div className="title"><strong className="d-block">{product ? "Add Form" : "Update Form"}</strong></div>
                <div className="block-body">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <label className="form-control-label">Name</label>
                      <input
                        type="text"
                        placeholder="Product  Name"
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
                        <option value="">Select Status</option>
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
                      <select name="categoryId" class="form-control mb-3 mb-3" value={formik.values.categoryId} onChange={formik.handleChange}>
                        <option>Select Category</option>
                        {allCategoryData.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.categoryId && formik.errors.categoryId && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.categoryId}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        name='image'
                        onChange={handleImageChange}
                      />
                      {formik.touched.image && formik.errors.image && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.image}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-control-label">Description</label>
                      <textarea
                        type="text"
                        placeholder="Product Description"
                        className="form-control"
                        name='description'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                      // value={category.name}
                      />
                      {formik.touched.description && formik.errors.description && (
                        <div style={{ color: 'red' }}>
                          {formik.errors.description}
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <button className="btn btn-primary" type='submit'>{product ? "Update" : "Add"}</button>
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

export default ProductForm