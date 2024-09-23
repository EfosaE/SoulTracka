import { forwardRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useAddContactMutation } from '../../redux/api/outreachApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type ModalProps = {
  closeModal: () => void;
};

const CreateContactModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ closeModal }, ref) => {
    const [addContact, { isLoading }] = useAddContactMutation();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const formDataObject = Object.fromEntries(formData.entries());

      // Get the current time from the user's machine
      const now = new Date();
      const currentTime = now.toTimeString().split(' ')[0];
      // Append the current time to the date
      if (formDataObject.outreachDateTime) {
        formDataObject.outreachDateTime = `${formDataObject.outreachDateTime} ${currentTime}`;
      }
      // Convert 'contacted' to boolean
      const parsedFormData = {
        ...formDataObject,
        contacted: formDataObject.contacted === 'true',
      };
      console.log(parsedFormData);
      try {
        const response = await addContact(parsedFormData).unwrap();
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
              <label htmlFor='outreachLocation'>Outreach Location:</label>
              <input
                type='text'
                name='outreachLocation'
                placeholder='Type here'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                type='tel'
                id='phone'
                placeholder='0708436782'
                minLength={11}
                maxLength={13}
                pattern='\d{1,11}'
                title='Enter a phone number in the format: 0234567890'
                name='phoneNumber'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='outreachDateTime'>Outreach Date:</label>
              <input
                type='date'
                name='outreachDateTime'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor='groupName'>Group Name:</label>
              <input
                type='text'
                name='groupName'
                placeholder='Type here'
                className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                required
              />
            </div>
            <label htmlFor='contacted' className='items-center flex gap-2'>
              <span>Contacted: </span>

              <select className='select' name='contacted'>
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

export default CreateContactModal;
