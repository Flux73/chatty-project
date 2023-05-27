import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notifications: [],
  unseenNotifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = [...state.notifications, ...action.payload];
      console.log("Action", state.notifications);
    },

    setUnseenNotifications: (state, action) => {
      state.unseenNotifications = [
        ...state.unseenNotifications,
        ...action.payload.filter((not) => not.isSeen === false),
      ];
      console.log("UNSEEn", state.unseenNotifications);
    },

    deleteUnseenNotifications: (state, action) => {
      state.unseenNotifications = [];
    },

    deleteNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (not) => not.id !== action.payload.id
      );
    },
  },
});

export const {
  setNotifications,
  deleteNotification,
  setUnseenNotifications,
  deleteUnseenNotifications,
} = notificationSlice.actions;
export default notificationSlice.reducer;
