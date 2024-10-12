import { forwardRef, useState } from 'react';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useAddFirstTimerMutation } from '../../redux/api/firstTimerApiSlice';

type ModalProps = {
  closeModal: () => void;
};

const CreateFirstTimerModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ closeModal }, ref) => {
    const [addfirstTimer, { isLoading }] = useAddFirstTimerMutation();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formDataObject = Object.fromEntries(formData.entries());

     
    
      // Convert 'isStudent' to boolean
      const parsedFormData = {
        ...formDataObject,
        isStudent: formDataObject.isStudent === 'true',
      };
      console.log(parsedFormData);
      try {
        const response = await addfirstTimer(parsedFormData).unwrap();
        console.log(response);
        toast.success('Contact added succesfully');
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
            <h3 className='text-lg capitalize'> create a new contact</h3>
            <button
              className='btn btn-neutral'
              onClick={() => {
                closeModal();
              }}>
              Close
            </button>
          </div>

          <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-2'>
              <label htmlFor='name'>Name:</label>
              <input
                type='text'
                name='name'
                placeholder='Type here'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <div className='flex flex-col  gap-2'>
              <label htmlFor='address'>Address:</label>
              <input
                type='text'
                name='address'
                placeholder='Type here'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='phoneNumber'>Phone Number:</label>
              <input
                type='tel'
                id='phone'
                placeholder='Enter a phone number'
                minLength={11}
                maxLength={11}
                pattern='\d{1,11}'
                title='Enter a phone number in the format: 07084367821'
                name='phoneNumber'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='occupation'>Occupation:</label>
              <input
                type='text'
                name='occupation'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>

            <label htmlFor='isStudent' className='items-center flex gap-2'>
              <span>isStudent: </span>
              <select className='select' name='isStudent'>
                <option value='true'>true</option>
                <option value='false'>false</option>
              </select>
            </label>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button className='btn bg-secondary self-end' disabled={isLoading}>
              Submit
            </button>
          </form>
        </div>
      </dialog>
    );
  }
);

export default CreateFirstTimerModal;
