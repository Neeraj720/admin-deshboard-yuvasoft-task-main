import { combineReducers } from "@reduxjs/toolkit";
import authSlice from './Auth/AuthSlice'
import productSlice from './Product/ProductSlice'
import categorySlice from './Category/CategorySlice'
const reducers = combineReducers({
    auth:authSlice,
    product:productSlice,
    category:categorySlice
})
export default reducers