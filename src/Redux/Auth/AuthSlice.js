import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  emailVarification,
  forgotPassword,
  getAllUser,
  getSingleUser,
  loginGoogle,
  registerUser,
  resetPassword,
  userDelete,
  userLogin,
  userUpdate,
} from "./AuthService";

const slice = createSlice({
  name: "auth",
  initialState: {
    registerUser: {},
    isLoading: false,
    isError: false,
    isSuccess: false,
    varificationMessage: "",
    user: {},
    userToken: "",
    allUserData: [],
    userInfo: {},
    updateStatus: "Failed",
  },
  reducers: {
    // setUpdateUser:(state,action) =>{
    //   state.updateUser = action.payload
    // }
    resetState: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.registerUser = null;
      state.message = "";
      state.varificationMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Register User
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        // console.log("Result:" , action.payload)
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.registerUser = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(createUser.rejected, (state, action) => {
        // console.log("Error:",action.payload)
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // Email Varification
      .addCase(verifyEmail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.varificationMessage = action.payload;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isError = true;
        (state.isLoading = false), (state.isSuccess = false);
        state.message = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.isSuccess = true;
        state.user = action.payload;
        state.userToken = action.payload.token;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // get All users
      .addCase(getAllUserData.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getAllUserData.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.allUserData = action.payload;
      })
      .addCase(getAllUserData.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // get single user details
      .addCase(getUserDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        console.log("user :", action.payload);
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.userInfo = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // delete user
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.allUserData = state.allUserData.filter(
          (user) => user.id !== action.payload.userId
        );
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // Update User
      .addCase(updateUser.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        console.log("update user response : ", action.payload);
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateStatus = "Success";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      // forgot password
      .addCase(passwordForgot.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(passwordForgot.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(passwordForgot.rejected, (state, action) => {
        console.log("Forgot :", action.payload);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      // reset password
      .addCase(passwordReset.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })

      //  google login
      .addCase(googleLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        localStorage.setItem("token", action.payload.token);
        state.userToken = action.payload.token;
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

// Register User

export const createUser = createAsyncThunk(
  "CREATE/USER",
  async (data, thunkApi) => {
    try {
      return await registerUser(data);
    } catch (error) {
      // console.log("Error" , error.response.data.message)
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);

// Email varification

export const verifyEmail = createAsyncThunk(
  "EMAIL/VERIFY",
  async (varifyData, thunkApi) => {
    try {
      // console.log("Slice Data is :" , varifyData)
      return await emailVarification(varifyData);
    } catch (error) {
      // console.log("Error" , error.response.data.message)
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// Login User

export const loginUser = createAsyncThunk(
  "LOGIN/USER",
  async (data, thunkApi) => {
    try {
      return await userLogin(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// Get all Users

export const getAllUserData = createAsyncThunk(
  "GET/ALLUSER",
  async (thunkApi) => {
    try {
      return await getAllUser();
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// get single user details
export const getUserDetails = createAsyncThunk(
  "GET/USERDETAILS",
  async (userId, thunkApi) => {
    try {
      return await getSingleUser(userId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// Delete User

export const deleteUser = createAsyncThunk(
  "DELETE/USER",
  async (userId, thunkApi) => {
    try {
      return await userDelete(userId);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// update user
export const updateUser = createAsyncThunk(
  "UPDATE/USER",
  async (data, thunkApi) => {
    try {
      // console.log("Data in Slice",data)
      return await userUpdate(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// forgot password
export const passwordForgot = createAsyncThunk(
  "FORGOT/PASSWORD",
  async (email, thunkApi) => {
    try {
      // console.log("Data in Slice",data)
      return await forgotPassword(email);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const passwordReset = createAsyncThunk(
  "RESET/PASSWORD",
  async (data, thunkApi) => {
    try {
      // console.log("Data in Slice",data)
      return await resetPassword(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
// google Login

export const googleLogin = createAsyncThunk(
  "GOOGLE/LOGIN",
  async (data, thunkApi) => {
    try {
      // console.log("Data in Slice",data)
      return await loginGoogle(data);
    } catch (error) {
      return thunkApi.rejectWithValue(error.response.data.message);
    }
  }
);
export const { resetState } = slice.actions;
export default slice.reducer;
