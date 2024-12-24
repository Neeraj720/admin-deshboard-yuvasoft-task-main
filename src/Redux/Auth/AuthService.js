import axiosInstance from "../Service/axiosServiceHandler";
// Create User
export const registerUser = async(data) =>{
    const response = await axiosInstance.post('/user',data)
    let responseData = {
        response:response.data.data,
        message:response.data.message        
    }
    return responseData
}
// Email Varification
export const emailVarification = async(data) =>{
    const response = await axiosInstance.get(`/user/email/verification?token=${data.emailVerificationTOken}&userId=${data.id}`)
    return response.data.message
}
// Login
export const userLogin = async(data) =>{
    const response = await axiosInstance.post('/user/login',data)
    return response.data.data
}

// get all Users

export const getAllUser = async() =>{
    const response = await axiosInstance.get('/user?pageNumber=1&pageSize=40')
    return response.data.data
}
// get single user

export const getSingleUser = async (id) =>{
    const response = await axiosInstance.get(`/user/${id}`)
    return response.data.user
}
// Delete user
export const userDelete = async(id) =>{
    const response = await axiosInstance.delete(`/user/${id}`)
    const data = {
        message: response.data.message,
        userId:id
    }
    return data
}

// Update user

export const userUpdate = async(data) =>{
    const response = await axiosInstance.put(`/user/${data.id}`,data.values)
    return response.data.data
}
// forgot password

export const forgotPassword = async(email) =>{
    const response = await axiosInstance.post('/user/forgot-password',email)
    return response.data.message
}
// Reset Password

export const resetPassword = async(data) =>{
    const response = await axiosInstance.post('/user/reset-password',data)
    return response.data.message
}
// google login

export const loginGoogle = async(token) =>{
    const response = await axiosInstance.post('/user/google-login',token)
    return response.data.data
}