import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import emailImg from '../../assets/img/email.png'
import { resetState, verifyEmail } from '../../Redux/Auth/AuthSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function EmailVarification() {
  const {registerUser,isLoading,isSuccess,isError,message,varificationMessage} = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = {
    id: registerUser.id,
    emailVerificationTOken: registerUser.emailVerificationTOken,
  };
  const handleVerification = () =>{
    dispatch(verifyEmail(data))
  }

  useEffect(() =>{
    if(isSuccess && varificationMessage){
      dispatch(resetState())
      toast.success(varificationMessage)
      navigate('/')
    }
    else if(isError && message){
      toast.error(message)
    }
  },[isSuccess,message,isError,navigate])
  return (
    <>
     <div className="d-flex align-items-center justify-content-center" style={{height:'100vh'}}>
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={emailImg}
            className="card-img-top"
            alt="email verification image"
          />
          <div className="card-body">
            <h5 className="card-title">Email verification</h5>
            <p className="card-text">
              please verify your email before logging in
            </p>
            <button onClick={handleVerification} className="btn btn-primary">
              {
                isLoading ? "Verifing" : "Verify"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default EmailVarification