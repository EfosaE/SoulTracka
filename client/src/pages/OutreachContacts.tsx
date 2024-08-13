import { useEffect, useState } from 'react';
import { useGetAllContactsQuery } from '../redux/api/outreachApiSlice';

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

type Contact = {
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

const columns = [
  columnHelper.accessor('id', {
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
  columnHelper.accessor('createdAt', {
    header: 'Date Created',
    cell: (info) => info.renderValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Date Updated',
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('outreachDateTime', {
    header: 'Outreach Date',
    cell: (info) => info.getValue(),
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
];
const OutreachContacts = () => {
  const { data: outreachContact, isLoading } = useGetAllContactsQuery('');
  // Set up state to hold the table data
  const [data, setData] = useState([]);

  // Effect to update the state when server data is fetched
  useEffect(() => {
    if (outreachContact) {
      // Ensure a stable reference by using setState
      setData(outreachContact.data.contacts);
    }
  }, [outreachContact]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log(outreachContact);
  return (
    <section className='w-full'>
      <div className='overflow-scroll h-[500px]'>
        <table className='table table-zebra text-center overflow-y-scroll'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OutreachContacts;
