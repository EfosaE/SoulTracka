import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

import { RootState } from './store';
import { logOut, setToken, setUser, User } from './features/authSlice';

interface RefreshTokenResponse {
  accessToken: string;
}
interface GetUserResponse {
  status?: string;
  user: User;
}

let baseURL = import.meta.env.VITE_BASE_SERVER_URL;

if (import.meta.env.VITE_ENVIRONMENT === 'development') {
  baseURL = import.meta.env.VITE_BASE_LOCAL_SERVER_URL;
}
// Define the base query function
console.log(baseURL);
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
    console.log('refreshedAccessToken:', refreshedAccessToken);
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
      console.log('userDemo', {
        ...response.data.user,
        isDemo: response.data.user.email === 'demo@tracka.com',
      });
      api.dispatch(
        setUser({
          ...response.data.user,
          isDemo: response.data.user.email === 'demo@tracka.com',
        })
      );
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
  tagTypes: ['Contact', 'FirstTimer'], // Define the tag types here
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
