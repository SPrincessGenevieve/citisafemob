import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../screens/Authentication/authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
  }
})