import { createSlice } from "@reduxjs/toolkit";

export const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    ticketInfo: {}
  },
  reducers: {
    setTicketInfo: (state, action) => {
        state.ticketInfo = action.payload
    },
  },
});

export const { 
 setTicketInfo,
} = ticketSlice.actions;

export default ticketSlice.reducer;
