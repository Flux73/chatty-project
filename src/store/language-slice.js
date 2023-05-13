import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "english",
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload.language;
      document.querySelector("html").lang =
        state.language === "english" ? "en" : "ar";
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
