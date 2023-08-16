import { configureStore } from '@reduxjs/toolkit'
import authReducer from './../src/screens/Authentication/authSlice.js'
import infoReducer from './../src/components/camera/infoSlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    infoText: infoReducer,
  }
})