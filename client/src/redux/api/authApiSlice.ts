import { apiSlice } from '../apiSlice';



export interface LoginRequest {
  email: string;
  password: string;
}


export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signUp: builder.mutation({
      query: (credentials) => ({
        url: '/users/signup',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    refresh: builder.query({
      query: () => '/users/refresh',
    }),
    getProfile: builder.query({
      query: () => '/users/profile',
    }),
  }),
});

export const { useLoginMutation, useSignUpMutation, useRefreshQuery, useGetProfileQuery } = authApiSlice;
