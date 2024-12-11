import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { passwordForgot, resetState } from '../../Redux/Auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
function ForgotPassword() {
    const {isSuccess,message,isError,isLoading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
          email: ''
        },
        validationSchema: Yup.object({
          email: Yup.string().email("Enter valid email").required("email is required"),
        }),
        onSubmit: (values) => {
          dispatch(passwordForgot(values))  
        }
      })
      // Clear States for Reset Password
  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message)
      dispatch(resetState())
    }
    else if(isError && message){
      toast.error(message)
    }
  }, [ isSuccess,isError,message, dispatch]);
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
                <h1>Forgot Password</h1>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
        {/* <!-- Form Panel    --> */}
        <div className="col-lg-6 bg-white">
          <div className="form d-flex align-items-center">
            <div className="content">
              <form className="form-validate" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                    <input id="login-username" value={formik.values.email} name='email' onChange={formik.handleChange} className="input-material" />
                    <label for="login-username" className="label-material">Email</label>
                    {
                      formik.touched.email && formik.errors.email ? (
                        <>
                          <div style={{ color: 'red' }}>
                            {formik.errors.email}
                          </div>
                        </>
                      ) : null
                    }
                  </div><button className="btn btn-primary" type='submit'>{isLoading ? "Loading...":"Send Link"}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div className="copyrights text-center">
      <p>2023 &copy; Your company. Download From <a target="_blank" href="https://templateshub.net">Templates Hub</a>.</p>
    </div>
  </div>
  )
}

export default ForgotPassword