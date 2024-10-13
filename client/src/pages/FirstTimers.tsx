import { useEffect, useRef, useState } from 'react';
import {
  CellContext,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { FirstTimer, firstTimerColumns } from '../utils/columnsDefs';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinLine } from 'react-icons/ri';
import SkeletonLoader from '../components/SkeletonLoader';

import { useGetAllFirstTimersQuery } from '../redux/api/firstTimerApiSlice';
import { TableFooter, TableHeader } from '../components/FirstTimerTableUi';
import FirstTimerTableComponent from '../components/FirstTimerTableComponent';
import EditFirstTimersModal from '../components/modals/EditFirstTimersModal';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { isDemoUser } from '../utils/utils';
import { RootState } from '../redux/store';

const FirstTimers = () => {
    const { user } = useSelector((store: RootState) => store.auth);
  // The response is transformed take note.
  const { data: firstTimers, isLoading } = useGetAllFirstTimersQuery('');
  const [selectedFirstTimer, setSelectedFirstTimer] =
    useState<FirstTimer | null>(null);

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
  const [data, setData] = useState<FirstTimer[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  console.log(firstTimers);
  // Effect to update the state when server data is fetched
  useEffect(() => {
    if (firstTimers) setData(firstTimers);
    console.log('from useeffect', data);
  }, [data, firstTimers]);

  const handleDelete = async (firstTimerId: number) => {
     if (isDemoUser(user!)) {
       toast.info('This action is not for demo users');
       return;
     }
    console.log(firstTimerId);
    try {
      console.log('Contact deleted successfully');
    } catch (error) {
      console.error('Failed to delete the contact:', error);
    }
  };

  const handleEdit = (firstTimer: FirstTimer) => {
     if (isDemoUser(user!)) {
       toast.info('This action is not for demo users');
       return;
     }
    console.log('Edit firstTimer:', firstTimer);
    setSelectedFirstTimer(firstTimer);
    openModal();
  };

  // Extend the columns with action handlers, I did this so I can use my mutation on the table action
  const actionColumns = firstTimerColumns.map((column) => {
    if (column.id === 'actions') {
      return {
        ...column,
        cell: (info: CellContext<FirstTimer, unknown>) => (
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

      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <FirstTimerTableComponent table={table} />
      )}

      <TableFooter table={table} />
      <EditFirstTimersModal
        firstTimer={selectedFirstTimer}
        closeModal={closeModal}
        ref={modalRef}
      />
    </section>
  );
};

export default FirstTimers;
