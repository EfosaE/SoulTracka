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
export type FirstTimer = {
  isStudent: boolean;
  createdAt: string; // ISO date string
  id: number;
  name: string;
  address?: string;
  occupation?: string;
  phoneNumber: string;
  updatedAt: string; // ISO date string
};
const contactColumnHelper = createColumnHelper<Contact>();
const firstTimerColumnHelper = createColumnHelper<FirstTimer>();

export const contactColumns = [
  contactColumnHelper.accessor((_row, index) => index + 1, {
    id: 'serialNumber',
    header: 'S/N',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  contactColumnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  contactColumnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  contactColumnHelper.accessor('contacted', {
    header: 'Contacted',
    cell: (info) => info.getValue().toString(),
    footer: (info) => info.column.id,
  }),
  contactColumnHelper.accessor('createdAt', {
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
  contactColumnHelper.accessor('updatedAt', {
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
  contactColumnHelper.accessor('outreachDateTime', {
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
  contactColumnHelper.accessor('outreachLocation', {
    header: 'Outreach Location',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  contactColumnHelper.accessor('groupName', {
    header: 'Group Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  // Action column
  contactColumnHelper.display({
    id: 'actions',
    header: 'Actions',
  }),
];

export const firstTimerColumns = [
  firstTimerColumnHelper.accessor((_row, index) => index + 1, {
    id: 'serialNumber',
    header: 'S/N',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  firstTimerColumnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  firstTimerColumnHelper.accessor('phoneNumber', {
    header: 'Phone Number',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  firstTimerColumnHelper.accessor('isStudent', {
    header: 'isStudent',
    cell: (info) => info.getValue().toString(),
    footer: (info) => info.column.id,
  }),
  firstTimerColumnHelper.accessor('createdAt', {
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
  firstTimerColumnHelper.accessor('updatedAt', {
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

  firstTimerColumnHelper.accessor('address', {
    header: 'Address',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),

  firstTimerColumnHelper.accessor('occupation', {
    header: 'Occupation',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  // Action column
  firstTimerColumnHelper.display({
    id: 'actions',
    header: 'Actions',
  }),
];
