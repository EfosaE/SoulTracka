import { createColumnHelper } from '@tanstack/react-table';


export type Contact = {
  contacted: boolean;
  createdAt: string; // ISO date string
  groupName: string;
  id: number;
  name: string;
  outreachDateTime: string; // ISO date string
  outreachLocation: string;
  phoneNumber: string;
  updatedAt: string; // ISO date string
};

const columnHelper = createColumnHelper<Contact>();

export const columns = [
  columnHelper.accessor((_row, index) => index + 1, {
    id: 'serialNumber',
    header: 'S/N',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('contacted', {
    header: 'Contacted',
    cell: (info) => info.getValue().toString(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Date Created',
    cell: (info) => {
      const dateString = info.getValue(); // Get the date string
      const date = new Date(dateString); // Create a Date object

      // Format the date without time zone
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return formattedDate; // Return the formatted date
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Date Updated',
    cell: (info) => {
      const dateString = info.getValue(); // Get the date string
      const date = new Date(dateString); // Create a Date object

      // Format the date without time zone
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return formattedDate; // Return the formatted date
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('outreachDateTime', {
    header: 'Outreach Date',
    cell: (info) => {
      const dateString = info.getValue(); // Get the date string
      const date = new Date(dateString); // Create a Date object

      // Format the date without time zone
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return formattedDate; // Return the formatted date
    },
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('outreachLocation', {
    header: 'Outreach Location',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  columnHelper.accessor('groupName', {
    header: 'Group Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  // Action column
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    // cell: (info) => (
    //   <div style={{ display: 'flex', gap: '0.5rem' }}>
    //     <button onClick={() => console.log(info.row.original)}>
    //       <FaEdit className='text-secondary text-lg' />
    //     </button>
    //     <button onClick={() => console.log(info.row.original.id)}>
    //       <RiDeleteBinLine className='text-error text-lg' />

    //     </button>
    //   </div>
    // ),
  }),
];


// Example handlers
// const handleEdit = (contact) => {
//   console.log('Edit contact:', contact);
//   // Implement the edit logic here, e.g., open a modal with the contact details
// };

// const handleDelete = (contactId) => {
//   console.log('Delete contact with ID:', contactId);
//   // Implement the delete logic here, e.g., show a confirmation dialog and delete the contact
// };