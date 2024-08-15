import { IoSearch } from 'react-icons/io5';
import CreateContactModal from './CreateContactModal';
import { useRef} from 'react';
interface HeaderProps {
  globalFilter: string;
  setGlobalFilter: (filterValue: string) => void;
}
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

      <button className='btn btn-primary text-white' onClick={openModal}>+ Add New Contact</button>
      <CreateContactModal ref={modalRef} closeModal={closeModal} />
    </div>
  );
};

export const TableFooter = () => {
  return (
    <div className='flex justify-between p-4'>
      <div className='flex items-center gap-2'>
        <p>show</p>
        <select className='select w-fit'>
          <option disabled selected>
            10
          </option>
          <option>20</option>
          <option>30</option>
        </select>
        <p>entries</p>
      </div>

      <label className='input input-bordered flex items-center gap-2'>
        <IoSearch />
        <input type='text' className='grow' placeholder='Search' />
      </label>

      <button className='btn btn-primary text-white'>+ Add New Contact</button>
    </div>
  );
};
