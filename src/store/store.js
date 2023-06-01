import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./theme-slice";
import languageReducer from "./language-slice";
import userReducer from "./user-slice";
import notificationReducer from "./notification-slice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
