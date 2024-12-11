import { categoryCreate, categoryUpdate, getAllCategory, getSingleCategory } from "./CategoryService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "category",
  initialState: {
    allCategoryData: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message:'',
    categoryInfo:{},
    categoryUpdateStatus:""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // get all category
      .addCase(getAllCategoryList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getAllCategoryList.fulfilled,(state,action) =>{
        console.log("category data:" , action.payload);
        
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.allCategoryData = action.payload
        state.categoryUpdateStatus=''
      })
      .addCase(getAllCategoryList.rejected,(state,action) =>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload
      })
    //   get single category
    .addCase(getCategoryDetails.pending,(state,action) =>{
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
    })
    .addCase(getCategoryDetails.fulfilled,(state,action) =>{
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.categoryInfo = action.payload
    })
    .addCase(getCategoryDetails.rejected,(state,action) =>{
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload
    })
    // create category
    .addCase(createCategory.pending,(state,action) =>{
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(createCategory.fulfilled,(state,action) =>{
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      state.allCategoryData = [...state.allCategoryData,action.payload]
    })
    .addCase(createCategory.rejected,(state,action) =>{
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload
    })
    // Update category
    .addCase(updateCategory.pending,(state,action)=>{
      state.isLoading = true;
      state.isSuccess = false;
      state.isError = false;
    })
    .addCase(updateCategory.fulfilled,(state,action) =>{
      // console.log(action.payload)
      state.isLoading = false;
      state.isSuccess = true;
      state.isError = false;
      // const index = state.allCategoryData.findIndex((category) => category._id === action.payload._id)
      // if(index == -1){
      //   state.allCategoryData[index] = action.payload
      // }
      state.categoryUpdateStatus = "Success"
    })
  },
});
// get all category list
export const getAllCategoryList = createAsyncThunk(
  "GET/ALLCATEGORY",
  async (thunkApi) => {
    try {
      return await getAllCategory();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// get single category list

export const getCategoryDetails = createAsyncThunk("GET/SINGLECATEGORY", async(userId,thunkApi) =>{
    try {
        return await getSingleCategory(userId);
      } catch (error) {
        return thunkApi.rejectWithValue(error.response.data.message);
      }
})
// craete a category
export const createCategory = createAsyncThunk("CREATE/CATEGORY", async(data,thunkApi) =>{
  try {
    return await categoryCreate(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
})

// update category

export const updateCategory = createAsyncThunk("UPDATE/CATEGORY", async(data,thunkApi) =>{
  try {
    return await categoryUpdate(data);
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data.message);
  }
})
export default slice.reducer;
