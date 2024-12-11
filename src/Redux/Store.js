import { configureStore } from "@reduxjs/toolkit";
// import authReducer from './Auth/AuthSlice'
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from './CombineReducer'

const persistConfig = {
    key: "root",
    storage,
  };
  const persistedReducer = persistReducer(persistConfig, reducer);
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  export default store
  