import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { googleLogin, loginUser, resetState } from '../../Redux/Auth/AuthSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { GoogleLogin } from '@react-oauth/google'

function Login() {
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter valid email").required("email is required"),
      password: Yup.string().min(6, "password should be of minimum 6 characters length").required("Password is required")
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values))
      .then((payload)=>{
       if(payload.payload.token){
        toast.success("Login Success")
        navigate('/user/deshboard')
       }
      })
    }
  })

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
      dispatch(resetState());
    }
  }, [isError, message, isSuccess, dispatch, navigate]);

  // Google Login
  const handleSuccess = async (response) => {
    const userToken = {
      idToken: response.credential
    }
    dispatch(googleLogin(userToken))
  }

  const handleError = async () => {
    alert("Error while login with google")
  }
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
                    <h1>Login User</h1>
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
                    </div>
                    <div className="form-group">
                      <input id="login-password" type="password" value={formik.values.password} name='password' onChange={formik.handleChange} className="input-material" />
                      <label for="login-password" className="label-material">Password</label>
                      {
                        formik.touched.password && formik.errors.password ? (
                          <>
                            <div style={{ color: 'red' }}>
                              {formik.errors.password}
                            </div>
                          </>
                        ) : null
                      }
                    </div> <button className="btn btn-primary" type='submit'>{isLoading ? "Loading..." : "Login"}</button>
                    <div className="form-group mt-3">
                      <GoogleLogin type="submit" onSuccess={handleSuccess} onError={handleError} size='large' shape="rectangular" />
                    </div>
                  </form>< Link to='/forgot/password' className="forgot-pass">Forgot Password?</Link><br /><small>Do not have an account? </small>
                  <Link to='/register'>Signup</Link>
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

export default Login