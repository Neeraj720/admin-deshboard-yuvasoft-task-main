import axiosInstance from "../Service/axiosServiceHandler";

// get all  product
export const getAllProduct = async() =>{
    const response = await axiosInstance.get('/product?pageNumber=1&pageSize=20')
    return response.data.data
}
// get single product

export const getSingleProduct = async(productId) =>{
    const response = await axiosInstance.get(`/product/${productId}`)
    return response.data.data
}
// delete product

export const deleteProduct = async(productId) =>{
    const response = await axiosInstance.delete(`/product/${productId}`)
    const data = {
        id:productId,
        response:response.data.message
    }
    return data
}
// create product

export const createProduct = async(formData) =>{
    const response = await axiosInstance.post('/product' , formData) 
    return response.data
}

// update product

export const updateProduct = async(data) =>{
    const {id,...formData} = data
    const response = await axiosInstance.post(`/product/${id}`,formData)
    return response.data.data
}