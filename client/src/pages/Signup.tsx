import { Form } from "react-router-dom";
import SubmitBtn from "../components/SubmitBtn";
import { useState } from "react";

const Signup = () => {
   const [error, setError] = useState<string | null>(null);
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    const formDataObject = Object.fromEntries(formData.entries());
    console.log(formDataObject);
    if (formDataObject.password !== formDataObject.confirmPassword) {
       setError('Passwords do not match');
       return;
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
            />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='enter your email'
              className='input-primary w-full  input input-sm'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              className='input-primary w-full  input input-sm'
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              className='input-primary w-full  input input-sm'
            />
          </div>
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <SubmitBtn text={'Submit'} />

        <p>Already have an account</p>
      </Form>
    </section>
  );
};

export default Signup;
