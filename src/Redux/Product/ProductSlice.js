import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "./ProductService";

const slice = createSlice({
  name: "product",
  initialState: {
    allProductData: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
    productInfo: {},
    AddStatus: false,
    productUpdateStatus:""
  },
  reducers: {
    resetProductState: (state, action) => {
      (state.isError = false),
        (state.isSuccess = false),
        (state.isLoading = false),
        (state.message = ""),
        (state.AddStatus = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductList.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllProductList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allProductData = action.payload;
      })
      .addCase(getAllProductList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // get single product
      .addCase(getProductDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.productInfo = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // delete product
      .addCase(productDelete.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.allProductData = state.allProductData.filter(
          (product) => product._id !== action.payload.id
        );
        state.message = action.payload.message;
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      // create product
      .addCase(productCreate.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = true;
        state.AddStatus = true;
        state.message = action.payload.message;
      })
      .addCase(productCreate.rejected, (state, action) => {
        state.message = action.payload;
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
    //   update product
    .addCase(productUpdate.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
    })
    .addCase(productUpdate.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        // const index = state.allProductData.findIndex((product) => product._id === action.payload._id)
        // if(index == -1){
        //   state.allProductData[index] = action.payload
        // }
        state.AddStatus = true
        state.message = "product updated successFully";
    })
    .addCase(productUpdate.rejected,(state,action) =>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload
    })
  },
});

// get all product data

export const getAllProductList = createAsyncThunk(
  "GET/ALLPRODUCT",
  async (thunkApi) => {
    try {
      return await getAllProduct();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// get single product details

export const getProductDetails = createAsyncThunk(
  "GET/SINGLEPRODUCT",
  async (productId, thunkApi) => {
    try {
      return await getSingleProduct(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// Delete Product

export const productDelete = createAsyncThunk(
  "DELETE/PRODUCT",
  async (productId, thunkApi) => {
    try {
      return await deleteProduct(productId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// create a product

export const productCreate = createAsyncThunk(
  "CREATE/PRODUCT",
  async (formData, thunkApi) => {
    try {
      return await createProduct(formData);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// update product

export const productUpdate= createAsyncThunk("UPDATE/PRODUCT" , async(data) =>{
    try{
        return await updateProduct(data)
    }
    catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
})
export const { resetProductState } = slice.actions;
export default slice.reducer;
