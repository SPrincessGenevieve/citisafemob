import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    Online: true,
    setIsLoggedIn: false,
    token: "",
    enforcer: {},

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
      state.enforcer = {}
      state.setIsLoggedIn = false;
    },
    setEnforcer: (state, action) => {
      state.enforcer = action.payload
    },
    setOnline: (state) => {
      state.Online = true
    },
    setOffline: (state) => {
      state.Online = false
    }
  },
});

export const { setToken, setLogin, setLogout, setEnforcer, setOnline, setOffline } = authSlice.actions;

export default authSlice.reducer;
