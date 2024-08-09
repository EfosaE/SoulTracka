import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const CommonUi = () => {
  return (
    <main className='flex w-full'>
      <Sidebar />
      <section className='flex flex-col w-full'>
        <Header />
        <Outlet />
      </section>
    </main>
  );
};

export default CommonUi;
