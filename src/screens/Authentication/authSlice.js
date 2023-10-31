import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    Online: true,
    setIsLoggedIn: false,
    token: "",
    enforcer: {
      email: '',
      id: '',
      username: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      profile_picture: '',
      position: '',
    },
    isPrinterConnected: false,

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
    },
    // manual
    setEnforcerEmail: (state, action) => {
      state.enforcer.email = action.payload
    },
    setEnforcerID: (state, action) => {
      state.enforcer.id = action.payload
    },
    setEnforcerUsername: (state, action) => {
      state.enforcer.username = action.payload
    },
    setEnforcerFirstName: (state, action) => {
      state.enforcer.first_name = action.payload
    },
    setEnforcerLastName: (state, action) => {
      state.enforcer.last_name = action.payload
    },
    setEnforcerMiddleName: (state, action) => {
      state.enforcer.middle_name = action.payload
    },
    setEnforcerProfilePicture: (state, action) => {
      state.enforcer.profile_picture = action.payload
    },
    setEnforcerPosition: (state, action) => {
      state.enforcer.position = action.payload
    },
    setisPrinter: (state) => {
      state.isPrinterConnected = true
    },
  },
});

export const { setToken, setLogin, setLogout, setEnforcer, setOnline, setOffline,
setEnforcerEmail, setEnforcerID, setEnforcerFirstName, setEnforcerUsername, setEnforcerLastName,
setEnforcerMiddleName, setEnforcerProfilePicture, setEnforcerPosition, setisPrinter } = authSlice.actions;

export default authSlice.reducer;
