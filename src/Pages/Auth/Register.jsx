import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { createUser } from '../../Redux/Auth/AuthSlice'
import { toast } from 'react-toastify'
function Register() {
  const {registerUser,isLoading,isSuccess,isError,message} = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string().email("Enter valid email").required("email is required"),
      password: Yup.string().min(6, "password should be of minimum 6 characters length").required("Password is required")
    }),
    onSubmit: (values) => {
      dispatch(createUser(values))
    }
  })

  useEffect(()=>{
    if(registerUser && isSuccess){
      navigate('/email/varification')
      toast.success(message)
    }
    else if(isError && message){
      toast.error(message)
    }
  },[registerUser,isSuccess,isError,message,navigate])
  return (
    <div className="login-page">
      <div className="container d-flex align-items-center">
        <div className="form-holder has-shadow">
          <div className="row">
            {/* <!-- Logo & Information Panel--> */}
            <div className="col-lg-6">
              <div className="info d-flex align-items-center">
                <div className="content">
                  <div className="logo">
                    <h1>Register User</h1>
                  </div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                </div>
              </div>
            </div>
            {/* <!-- Form Panel    --> */}
            <div className="col-lg-6 bg-white">
              <div className="form d-flex align-items-center">
                <div className="content">
                  <form className="text-left form-validate" onSubmit={formik.handleSubmit}>
                    <div className="form-group-material">
                      <input type="text" value={formik.values.name} name='name' onChange={formik.handleChange} className="input-material" />
                      <label className="label-material">Username</label>
                      {
                        formik.touched.name && formik.errors.name ? (
                          <>
                            <div style={{ color: 'red' }}>
                              {formik.errors.name}
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                    <div className="form-group-material">
                      <input  type="email" value={formik.values.email} name='email'   onChange={formik.handleChange}  className="input-material" />
                      <label  className="label-material">Email Address</label>
                      {
                        formik.touched.email && formik.errors.email ? (
                          <>
                            <div style={{ color: 'red' }}>
                              {formik.errors.email}
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                    <div className="form-group-material">
                      <input  type="password" value={formik.values.password} name='password' onChange={formik.handleChange}   className="input-material" />
                      <label  className="label-material">Password</label>
                      {
                        formik.touched.password && formik.errors.password ? (
                          <>
                            <div style={{ color: 'red' }}>
                              {formik.errors.password}
                            </div>
                          </>
                        ) : null
                      }
                    </div>
                    <div className="form-group text-center">
                      <input id="register" type="submit" value={isLoading ? "Loading...": "Register"} className="btn btn-primary" />
                    </div>
                  </form><small>Already have an account?</small>
                  <Link to='/'>Login</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyrights text-center">
        <p >2018 &copy; Your company. Download From <a target="_blank" href="https://templateshub.net">Templates Hub</a></p>
      </div>
    </div>
  )
}

export default Register