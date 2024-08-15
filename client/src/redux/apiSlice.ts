import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RootState } from './store';
import { logOut, setToken, setUser } from './features/authSlice';

interface RefreshTokenResponse {
  accessToken: string;
}
interface GetUserResponse {
  status?: string;
  user: unknown;
}
let baseURL 

if (import.meta.env.VITE_ENVIRONMENT === 'production') {
  baseURL = import.meta.env.VITE_BASE_SERVER_URL;
} else {
  baseURL = import.meta.env.VITE_BASE_LOCAL_SERVER_URL;
}
// Define the base query function
console.log(baseURL)
const baseQuery = fetchBaseQuery({
  baseUrl: `${baseURL}/api/v1`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Define the base query function with re-authentication when token expires and user refreshes
const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log('result for no error', result);

  if (result?.error?.status === 403) {
    console.log('sending refresh token');
    const refreshedAccessToken = (await baseQuery(
      '/users/refresh',
      api,
      extraOptions
    )) as { data: RefreshTokenResponse };
    console.log('accessToken', refreshedAccessToken);
    if (refreshedAccessToken?.data) {
      api.dispatch(setToken(refreshedAccessToken.data.accessToken));
      const response = (await baseQuery(
        '/users/profile',
        api,
        extraOptions
      )) as {
        data: GetUserResponse;
      };
      console.log('user', response.data.user);
      api.dispatch(setUser(response.data.user));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

// Create the API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Contact'], // Define the tag types here
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
