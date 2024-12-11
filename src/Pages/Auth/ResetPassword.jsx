import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { passwordReset, resetState } from '../../Redux/Auth/AuthSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
function ResetPassword() {
  const { isSuccess, message, isLoading ,isError} = useSelector((state) => state.auth)
  const {id,token} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().min(6, "password should be of minimum 6 characters length").required("Password is required")
    }),
    onSubmit: (values) => {
      // console.log(typeof (values.password))
      console.log(values)
      const data = {
        password: values.password,
        token: token,
        userId: id,
      }
      dispatch(passwordReset(data))
    }
  })

  useEffect(()=>{
    if(isSuccess && message){
      toast.success(message)
      dispatch(resetState())
      navigate('/')
    }
    else if(isError && message){
      dispatch(resetState())
      toast.error(message)
    }
   },[isSuccess,isError,message,navigate])
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
                <h1>Reset Password</h1>
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
                  </div><button className="btn btn-primary" type='submit'>{isLoading ?  "Loading...":"Reset Password"}</button>
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

export default ResetPassword