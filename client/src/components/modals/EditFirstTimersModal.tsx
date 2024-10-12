import { forwardRef, useEffect, useState } from 'react';

import { FirstTimer } from '../../utils/columnsDefs';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useUpdateFirstTimerMutation } from '../../redux/api/firstTimerApiSlice';

type ModalProps = {
  firstTimer: FirstTimer | null;
  closeModal: () => void;
};

const EditFirstTimersModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ firstTimer, closeModal }, ref) => {
    const [updateFirstTimer, { isLoading }] = useUpdateFirstTimerMutation();

    const [formData, setFormData] = useState<FirstTimer | null>({
      isStudent: false,
      createdAt: '', // ISO date string
      id: 0,
      name: '',
      phoneNumber: '',
      updatedAt: '', // ISO date string
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      if (firstTimer) {
        setFormData(firstTimer);
      }
    }, [firstTimer]);

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      console.log(name, value);
      setFormData((prevFormData) => {
        if (prevFormData) {
          console.log('Previous Form Data:', prevFormData);

          // Create a new formData object with the updated field
          const newFormData = {
            ...prevFormData,
            [name]: name === 'isStudent' ? value === 'true' : value, // Special case for 'isStudent'
          };

          console.log('New Form Data:', newFormData);
          return newFormData;
        }

        return prevFormData;
      });
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      try {
        const response = await updateFirstTimer(formData).unwrap();
        console.log(response);
        toast.success('Contact Edited Successfully');
        closeModal();
      } catch (error) {
        const typedError = error as FetchBaseQueryError;
        if (
          typedError.data &&
          typeof typedError.data === 'object' &&
          'message' in typedError.data
        ) {
          setError((typedError.data as { message: string }).message);
        } else {
          console.log('An unexpected error occurred');
        }
      }
    }

    return (
      <dialog id='' className='modal' ref={ref}>
        <div className='modal-box'>
          <div className='flex justify-between items-center'>
            <h3 className='text-lg capitalize'> edit first-timer</h3>
            <button
              className='btn btn-neutral'
              onClick={() => {
                closeModal();
              }}>
              Close
            </button>
          </div>

          {formData && (
            <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-2'>
                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  name='name'
                  onChange={handleInputChange}
                  placeholder='Type here'
                  value={formData?.name}
                  className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                  required
                />
              </div>
              <div className='flex flex-col  gap-2'>
                <label htmlFor='outreachLocation'>Address:</label>
                <input
                  type='text'
                  name='address'
                  placeholder='address'
                  onChange={handleInputChange}
                  value={formData?.address}
                  className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input
                  type='tel'
                  id='phone'
                  placeholder='0708436782'
                  onChange={handleInputChange}
                  minLength={11}
                  maxLength={13}
                  pattern='\d{1,11}'
                  title='Enter a phone number in the format: 0234567890'
                  name='phoneNumber'
                  value={formData?.phoneNumber}
                  className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                  required
                />
              </div>
              <div className='flex flex-col gap-2'>
                <label htmlFor='outreachDateTime'>Occupation:</label>
                <input
                  type='text'
                  name='occupation'
                  onChange={handleInputChange}
                  value={formData?.occupation}
                  className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                  required
                />
              </div>
              <label htmlFor='isStudent' className='items-center flex gap-2'>
                <span>isStudent: </span>

                <select
                  className='select'
                  name='isStudent'
                  onChange={handleInputChange}
                  value={formData?.isStudent ? 'true' : 'false'}>
                  <option value='true'>true</option>
                  <option value='false'>false</option>
                </select>
              </label>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <button
                className='btn bg-secondary self-end'
                disabled={isLoading}>
                Submit
              </button>
            </form>
          )}
        </div>
      </dialog>
    );
  }
);
export default EditFirstTimersModal;


