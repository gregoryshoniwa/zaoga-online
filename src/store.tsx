import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import themeReducer from "./slices/theme";

const reducer = {
  auth: authReducer,
  message: messageReducer,
  theme: themeReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})

export default store;