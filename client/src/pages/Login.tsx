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


 const handleLogin = async (
   e?: React.FormEvent<HTMLFormElement>,
   demoCredentials?: { email: string; password: string }
 ) => {
   if (e) {
     e.preventDefault();
   }
   setError(null);

   // If demo credentials are provided, use them; otherwise, use the form data
   let formDataObject;
   if (demoCredentials) {
     formDataObject = demoCredentials;
   } else if (e) {
     const formData = new FormData(e.currentTarget);
     formDataObject = Object.fromEntries(formData.entries());
   }

   console.log(formDataObject);

   try {
     const response = await login(formDataObject).unwrap();
     console.log('Login successful:', response);

     if (response.status === 'success') {
       const user = response.user;
       const accessToken = response.accessToken;
      //  dispatch(setUser(user));
       // Check for Demo Users
       dispatch(setUser({ ...user, isDemo: user.email === 'demo@tracka.com' }));

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
       console.log('An unexpected error occurred');
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
              placeholder='Enter your password'
              autoComplete='current-password'
              className='input-primary w-full  input '
              required
            />
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <SubmitBtn text={'Submit'} disabled={isLoading} />

        <p className='text-sm libre my-4'>
          No account yet?{' '}
          <Link to='/signup' className='text-primary hover:opacity-70'>
            Sign Up
          </Link>
          <a
            className='block text-primary mt-2 cursor-pointer hover:opacity-70'
            onClick={()=>{handleLogin(undefined, {
              email: 'demo@tracka.com',
              password: 'demo1234',
            });}}>
            Sign In as a Demo User
          </a>
        </p>
      </Form>
    </section>
  );
};

export default Login;
