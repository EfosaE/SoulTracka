import { FirstTimer } from '../../utils/columnsDefs';
import { apiSlice } from '../apiSlice';

// // Define a type for the response from your API
// type FirstTimer = {
//   id: string;
//   name: string;
//   // Add other relevant fields here
// };

export const firstTimerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFirstTimers: builder.query({
      query: () => '/first-timers',
      providesTags: ['FirstTimer'],
      transformResponse: (response: {
        status: string;
        firstTimers: FirstTimer[];
      }) => {
        return response.firstTimers;
      },
    }),
    addFirstTimer: builder.mutation({
      query: (firstTimer) => ({
        url: `/first-timers`,
        method: 'POST',
        body: firstTimer,
      }),
      invalidatesTags: ['FirstTimer'], // Invalidate the 'Contact' tag on successful delete
    }),
  }),
});

export const { useGetAllFirstTimersQuery, useAddFirstTimerMutation } =
  firstTimerApiSlice;
