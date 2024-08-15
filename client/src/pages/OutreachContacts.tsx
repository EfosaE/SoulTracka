import { useEffect, useState } from 'react';
import {
  useDeleteContactByIDMutation,
  useGetAllContactsQuery,
} from '../redux/api/outreachApiSlice';
import {
  CellContext,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, Contact } from '../utils/columnsDefs';
import { TableFooter, TableHeader } from '../components/TableUI';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';

const OutreachContacts = () => {
  const { data: outreachContact, isLoading } = useGetAllContactsQuery('');
  const [deleteContact] = useDeleteContactByIDMutation();
  // Set up state to hold the table data
  const [data, setData] = useState<Contact[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  console.log('outreach', outreachContact);
  // Effect to update the state when server data is fetched
  useEffect(() => {
    if (outreachContact) {
      // Ensure a stable reference by using setState
      setData(outreachContact);
    }
  }, [outreachContact]);

  const handleDelete = async (contactId: number) => {
    try {
      await deleteContact(contactId).unwrap();
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete the contact:', error);
    }
  };

  const handleEdit = (contact: Contact) => {
    console.log('Edit contact:', contact);
    // Implement the edit logic here, e.g., open a modal with the contact details
  };

  // Extend the columns with action handlers, I did this so I can use my mutation on the table action
  const actionColumns = columns.map((column) => {
    if (column.id === 'actions') {
      return {
        ...column,
        cell: (info: CellContext<Contact, unknown>) => (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => handleEdit(info.row.original)}>
              <FaEdit className='text-secondary text-lg' />
            </button>
            <button onClick={() => handleDelete(info.row.original.id)}>
              <RiDeleteBinLine className='text-error text-lg' />
            </button>
          </div>
        ),
      };
    }
    return column;
  });

  const table = useReactTable({
    data,
    columns: actionColumns,
    state: {
      globalFilter,
    },
    globalFilterFn: (row, _, filterValue) => {
      // Check all properties of the row's original object
      return Object.values(row.original).some((value) =>
        value?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    //Skeleton loader
    return (
      <div className='flex flex-col gap-4 w-full'>
        <div className='skeleton h-32 w-full'></div>
        <div className='skeleton h-4 w-28'></div>
        <div className='skeleton h-4 w-full'></div>
        <div className='skeleton h-4 w-full'></div>
      </div>
    );
  }
  return (
    <section className='w-full transition'>
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <div className='overflow-scroll h-[540px]'>
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
          <tbody className='capitalize'>
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
      <TableFooter />
    </section>
  );
};

export default OutreachContacts;
