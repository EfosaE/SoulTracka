import { createSlice } from '@reduxjs/toolkit';
const themes = { emerald: 'emerald', night: 'night'}
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('theme') || themes.emerald;
  document.documentElement.setAttribute('data-theme', theme);
  return theme;
};
const initialState = {
  isExpanded: true,
  isSideBarOpen: false,
  headerTitle: '',
  theme: getThemeFromLocalStorage(),
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isSideBarOpen = false;
    },
    openSidebar: (state) => {
      state.isSideBarOpen = true;
    },
    toggleExpanded: (state) => {
      state.isExpanded = !state.isExpanded;
    },
    toggleTheme: (state) => {
      const { emerald, night } = themes;
      state.theme = state.theme === night ? emerald : night;
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    },
    addHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    }
  },
});

export const { closeSidebar, openSidebar, toggleExpanded, addHeaderTitle, toggleTheme} = appSlice.actions;

export default appSlice.reducer;
