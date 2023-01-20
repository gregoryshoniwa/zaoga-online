import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeState : 'light'
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
        
      return { themeState: action.payload };
    }
  },
});

const { reducer, actions } = themeSlice;

export const { setTheme } = actions
export default reducer;