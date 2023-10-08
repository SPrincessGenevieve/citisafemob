import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    Online: false,
    setIsLoggedIn: false,
    token: "",
    enforcer: {

    },

  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;    
    },
    setLogin: (state) => {
      state.setIsLoggedIn = true;
    },
    setLogout: (state) => {
      state.token = "";
      state.setIsLoggedIn = false;
    },
    setEnforcer: (state, action) => {
      state.enforcer = action.payload
    },
    setOnline: (state) => {
      state.Online = true
    }
  },
});

export const { setToken, setLogin, setLogout, setEnforcer, setOnline } = authSlice.actions;

export default authSlice.reducer;
