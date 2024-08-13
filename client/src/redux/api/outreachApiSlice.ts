import { apiSlice } from '../apiSlice';

export const outreachApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => '/outreach-contacts',
    }),
  }),
});

export const { useGetAllContactsQuery } = outreachApiSlice;
