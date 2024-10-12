import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token') || null;
};

interface User {
  username: string;
  email: string;
  isDemo?: boolean; // Add this property to track if the user is a demo user
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload; // Now typed correctly as 'User'
    },
    setToken: (state, action: PayloadAction<string>) => {
      const accessToken = action.payload;
      state.token = accessToken;
      localStorage.setItem('token', accessToken);
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { setUser, setToken, logOut } = authSlice.actions;

export default authSlice.reducer;
