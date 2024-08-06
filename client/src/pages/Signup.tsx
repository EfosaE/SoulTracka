import { Form, useNavigate } from 'react-router-dom';
import SubmitBtn from '../components/SubmitBtn';
import { useState } from 'react';
import { useSignUpMutation } from '../redux/api/authApiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [signup, { isLoading, isError }] = useSignUpMutation();

  console.log('loading', isLoading);
  console.log(isError);
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
    if (formDataObject.password !== formDataObject.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // This deletes the confirm password field from the form data object
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...newFormObject } = formDataObject;

    console.log(newFormObject);
    // note to self rtk query with TS is a whole lot abeg
    try {
      const response = await signup(newFormObject).unwrap();
      if (response.status === 'success') {
        navigate('/login')
      }
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
    <section className='h-screen flex items-center justify-center '>
      <Form
        className='flex flex-col  w-fit  px-4 py-8 rounded-lg items-center libre shadow-lg'
        onSubmit={handleSubmit}>
        <h1 className='libre font-bold text-primary text-3xl'> Soul Tracka</h1>
        <div className='flex flex-col gap-4 my-4'>
          <div>
            <label htmlFor='username'>Name</label>
            <input
              type='text'
              placeholder='enter your name'
              className='input-primary w-full  input input-sm'
              name='username'
              required
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='enter your email'
              className='input-primary w-full  input input-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='input-primary w-full  input input-sm'
              required
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              className='input-primary w-full  input input-sm'
              required
            />
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <SubmitBtn text={'Submit'} disabled={isLoading} />

        <p>Already have an account</p>
      </Form>
    </section>
  );
};

export default Signup;
