import axiosInstance from "../Service/axiosServiceHandler";

// get all category
export const getAllCategory = async() =>{
    const response = await axiosInstance.get('/category?pageNumber=1&pageSize=50')
    return response.data.data
}
// get Single user deatisl

export const getSingleCategory = async(userId) =>{
    const response =await axiosInstance.get(`/category/${userId}`)
    return response.data.details
}
// create category

export const categoryCreate = async(data) =>{
    const response = await axiosInstance.post('/category',data)
    console.log(response)
    return response.data.data
}
// Update category

export const categoryUpdate = async(data) =>{
    const {id,...updateData} = data
    const response = await axiosInstance.put(`/category/${id}`, updateData)
    return response.data.data
}