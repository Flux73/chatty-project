import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unseenMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUnseenMessages: (state, action) => {
      state.unseenMessages = [...state.unseenMessages, ...action.payload];
    },

    deleteUnseenMessages: (state, action) => {
      state.unseenMessages = [];
    },
  },
});

export const { setUnseenMessages, deleteUnseenMessages } = chatSlice.actions;
export default chatSlice.reducer;
