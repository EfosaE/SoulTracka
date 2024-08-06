import { createSlice } from '@reduxjs/toolkit';

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token') || null;
};

interface User {
  username: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  token: getTokenFromLocalStorage(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    setToken: (state, action) => {
      const accessToken = action.payload;
      state.token = accessToken;
      localStorage.setItem('token', accessToken)
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token')
    },
  },
});

export const { setUser, setToken, logOut } = authSlice.actions;

export default authSlice.reducer;
