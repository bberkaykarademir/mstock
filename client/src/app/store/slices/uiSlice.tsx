import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: UiState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isSidebarCollapsed = !state.isSidebarCollapsed;
    },
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { toggleSidebar, toggleDarkMode } = uiSlice.actions;

export default uiSlice.reducer;
