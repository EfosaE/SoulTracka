import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

import { apiSlice } from './apiSlice';
import appReducer from './features/appSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
