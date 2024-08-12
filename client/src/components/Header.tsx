import { useRef } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown, MdOutlineWbSunny } from 'react-icons/md';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { openSidebar, toggleTheme } from '../redux/features/appSlice';
import { RootState } from '../redux/store';
import { FiMoon } from 'react-icons/fi';

const Header = () => {
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const { headerTitle, theme } = useSelector((store: RootState) => store.app);
  const { user } = useSelector((store: RootState) => store.auth);
  const dispatch = useDispatch();

  return (
    <header
      className='h-fit py-6 mb-4 exo sticky bg-base-100 top-0 z-40 shadow-lg'
      ref={headerRef}>
      <div className='container  flex items-center justify-between capitalize'>
        <div className='md:hidden'>
          <RxHamburgerMenu
            className='text-2xl'
            onClick={() => {
              dispatch(openSidebar());
            }}
          />
        </div>
        <h1 className='capitalize text-xl  font-semibold '>
          {headerTitle ? headerTitle : 'dashboard'}
        </h1>

        <div className='flex items-center md:space-x-4'>
          <div className='relative'>
            <label className=''>
              {/* this hidden checkbox controls the state */}
              <input
                type='checkbox'
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                onChange={() => {
                  dispatch(toggleTheme());
                }}
              />
              {theme === 'night' ? (
                <MdOutlineWbSunny className='text-2xl' />
              ) : (
                <FiMoon className='text-2xl' />
              )}
            </label>
          </div>
          <div className='bg-white size-10 rounded-full drop-shadow-lg items-center justify-center hidden md:flex'>
            <IoNotificationsOutline className='text-2xl text-[#46464D]' />
          </div>

          <div className='flex gap-2 items-center justify-center'>
            <p className='font-medium  hidden md:block'>{user?.username}</p>
            <MdKeyboardArrowDown className='text-[#46464D] text-2xl hidden md:block' />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
