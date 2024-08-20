
import { Contact } from '../../utils/columnsDefs';
import { apiSlice } from '../apiSlice';

export const outreachApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllContacts: builder.query({
      query: () => '/outreach-contacts',
      providesTags: ['Contact'], // Use the defined tag type
      transformResponse: (response: {
        status: string;
        data: { length: number; contacts: Contact[] };
      }) => {
        // Sort the contacts by 'createdAt' in descending order
        const contacts = response.data.contacts;
        return contacts.sort(
          (a: Contact, b: Contact) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      },
    }),
    addContact: builder.mutation({
      query: (contact) => ({
        url: `/outreach-contacts`,
        method: 'POST',
        body: contact,
      }),
      invalidatesTags: ['Contact'], // Invalidate the 'Contact' tag on successful delete
    }),
    updateContact: builder.mutation({
      query: (contact) => ({
        url: `/outreach-contacts/${contact.id}`,
        method: 'PATCH',
        body: contact,
      }),
      invalidatesTags: ['Contact'], // Invalidate the 'Contact' tag on successful update
    }),
    deleteContactByID: builder.mutation<void, number>({
      query: (id) => ({
        url: `/outreach-contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Contact'], // Invalidate the 'Contact' tag on successful delete
    }),
  }),
});



export const { useGetAllContactsQuery, useDeleteContactByIDMutation, useAddContactMutation, useUpdateContactMutation } = outreachApiSlice;
