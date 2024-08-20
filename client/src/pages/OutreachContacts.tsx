import { useEffect, useRef, useState } from 'react';
import {
  useDeleteContactByIDMutation,
  useGetAllContactsQuery,
} from '../redux/api/outreachApiSlice';
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { columns, Contact } from '../utils/columnsDefs';
import { TableFooter, TableHeader } from '../components/TableUI';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import SkeletonLoader from '../components/SkeletonLoader';
import TableComponent from '../components/TableComponent';

import EditContactModal from '../components/EditContactModal';

const OutreachContacts = () => {
  const { data: outreachContact, isLoading } = useGetAllContactsQuery('');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteContact] = useDeleteContactByIDMutation();

  // to target the Edit Modal
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };
  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });
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
    console.log('contact:', selectedContact);
    console.log('Edit contact:', contact);
    setSelectedContact(contact);
    openModal();
    // Implement the edit logic here, e.g., open a modal with the contact details
  };
  useEffect(() => {
    console.log('selectedContact updated:', selectedContact);
  }, [selectedContact]);
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
    onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
    state: {
      globalFilter,
      pagination,
    },
    globalFilterFn: (row, _, filterValue) => {
      // Check all properties of the row's original object
      return Object.values(row.original).some((value) =>
        value?.toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className='w-full transition'>
      <TableHeader
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        table={table}
      />
      {isLoading ? <SkeletonLoader /> : <TableComponent table={table} />}

      <TableFooter table={table} />
      <EditContactModal
        contact={selectedContact}
        closeModal={closeModal}
        ref={modalRef}
      />
    </section>
  );
};

export default OutreachContacts;
