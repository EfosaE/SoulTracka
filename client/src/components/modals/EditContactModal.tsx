import { forwardRef, useEffect, useState } from 'react';

import { useUpdateContactMutation } from '../../redux/api/outreachApiSlice';

import { Contact } from '../../utils/columnsDefs';
import { toast } from 'react-toastify';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type ModalProps = {
  contact: Contact | null;
  closeModal: () => void;
};

const EditContactModal = forwardRef<HTMLDialogElement, ModalProps>(
  ({ contact, closeModal }, ref) => {
    const [updateContact, { isLoading }] = useUpdateContactMutation();

    const [formData, setFormData] = useState<Contact | null>({
      contacted: false,
      createdAt: '', // ISO date string
      groupName: '',
      id: 0,
      name: '',
      outreachDateTime: '', // ISO date string
      outreachLocation: '',
      phoneNumber: '',
      updatedAt: '', // ISO date string
    });
    const [error, setError] = useState<string | null>(null);

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
            [name]: name === 'contacted' ? value === 'true' : value, // Special case for 'contacted'
          };

          console.log('New Form Data:', newFormData);
          return newFormData;
        }

        return prevFormData;
      });
    };

    useEffect(() => {
      if (contact) {
        const formattedDate = contact.outreachDateTime
          ? contact.outreachDateTime.split('T')[0]
          : '';

        // Set form data with the formatted outreachDateTime
        setFormData({
          ...contact,
          outreachDateTime: formattedDate,
        });
      }
    }, [contact]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      let parsedOutreachDateTime;

      if (formData) {
        parsedOutreachDateTime = new Date(
          formData.outreachDateTime
        ).toISOString();
      }

      // Update the updatedAt field with the current date and time
      const updatedFormData = {
        ...formData,
        outreachDateTime: parsedOutreachDateTime,
      };

      console.log(updatedFormData);

      try {
        const response = await updateContact(updatedFormData).unwrap();
        console.log(response);
        toast.success('Contact Editted Successfully');
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
            <h3 className='text-lg capitalize'> edit contact</h3>
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
                <label htmlFor='outreachLocation'>Outreach Location:</label>
                <input
                  type='text'
                  name='outreachLocation'
                  placeholder='Type here'
                  onChange={handleInputChange}
                  value={formData?.outreachLocation}
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
                <label htmlFor='outreachDateTime'>Outreach Date:</label>
                <input
                  type='date'
                  name='outreachDateTime'
                  onChange={handleInputChange}
                  value={formData?.outreachDateTime}
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
                  onChange={handleInputChange}
                  value={formData?.groupName}
                  className='border border-slate-400 bg-transparent py-2 px-4 rounded-lg w-full text-sm'
                  required
                />
              </div>
              <label htmlFor='contacted' className='items-center flex gap-2'>
                <span>Contacted: </span>

                <select
                  className='select'
                  name='contacted'
                  onChange={handleInputChange}
                  value={formData?.contacted ? 'true' : 'false'}>
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
export default EditContactModal;
