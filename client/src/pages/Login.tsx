import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../redux/api/authApiSlice';
import { setUser, setToken } from '../redux/features/authSlice';
import { Form, Link, useNavigate } from 'react-router-dom';
import SubmitBtn from '../components/SubmitBtn';
import { useState } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);

    // .unwrap() does the same thing as response.json()
    try {
      const response = await login(formDataObject).unwrap();

      console.log('Login successful:', response);

      if (response.status === 'success') {
        const user = response.user;
        const accessToken = response.accessToken;
        dispatch(setUser(user));
        dispatch(setToken(accessToken));

        navigate('/');
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
        console.log('an unexpected error occurred');
      }
    }
  };
  return (
    <section className='h-screen flex items-center justify-center '>
      <Form
        className='flex flex-col  w-fit  px-4 py-8 rounded-lg items-center libre shadow-lg'
        onSubmit={handleLogin}>
        <h1 className='libre font-bold text-primary text-3xl'> Soul Tracka</h1>
        <div className='flex flex-col gap-4 my-4'>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='enter your email'
              className='input-primary w-full  input '
              required
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='input-primary w-full  input '
              required
            />
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <SubmitBtn text={'Submit'} disabled={isLoading} />

        <p className='text-sm libre mt-2'>
          No account yet?{' '}
          <Link to='/signup' className='text-primary'>
            Sign Up
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
