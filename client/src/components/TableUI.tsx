import { IoSearch } from 'react-icons/io5';
import CreateContactModal from './CreateContactModal';
import { useRef } from 'react';
import { Table } from '@tanstack/react-table';
import { Contact } from '../utils/columnsDefs';

interface HeaderProps {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}

type TableFooterProps = {
  table: Table<Contact>;
};
export const TableHeader = ({ globalFilter, setGlobalFilter }: HeaderProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <div className='flex md:flex-row md:justify-between p-4 flex-col gap-2'>
      <div className='flex items-center gap-2'>
        <p>show</p>
        <select className='select w-fit'>
          <option>10</option>
          <option>20</option>
          <option>30</option>
        </select>
        <p>entries</p>
      </div>

      <label className='input input-bordered flex items-center gap-2'>
        <IoSearch />
        <input
          type='text'
          className='grow'
          placeholder='Search'
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </label>

      <button className='btn btn-primary text-white' onClick={openModal}>
        + Add New Contact
      </button>
      <CreateContactModal ref={modalRef} closeModal={closeModal} />
    </div>
  );
};

export const TableFooter = ({ table }: TableFooterProps) => {
  const pageCount = table.getPageCount();

  return (
    <div className='flex items-center justify-between py-1'>
      <label htmlFor=''>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
      </label>
      <div className='join mx-auto'>
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => table.setPageIndex(index)}
            className={`btn join-item ${
              table.getState().pagination.pageIndex === index && 'btn-accent'
            }`}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};
