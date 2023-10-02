import { createSlice } from "@reduxjs/toolkit";
// axios

export const authSlice = createSlice({
  name: "auth",
  initialState: {
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
    }
  },
});

export const { setToken, setLogin, setLogout, setEnforcer } = authSlice.actions;

export default authSlice.reducer;
