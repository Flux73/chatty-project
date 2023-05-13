import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload.theme;
      document.querySelector("html").dataset.theme = state.theme;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
