import { NavLink, useLocation } from 'react-router-dom';

import { useRef, useEffect } from 'react';


import { HiOutlineArrowLeftOnRectangle } from 'react-icons/hi2';

import { useDispatch, useSelector } from 'react-redux';
// import { addTitle, toggleExpanded } from '@/config/redux/slices/headerSlice'

import { sideLinks } from '../data';
import { RootState } from '../redux/store';
import { RxCross2 } from 'react-icons/rx';
import { toggleExpanded, closeSidebar, addHeaderTitle } from '../redux/features/appSlice';
import { FaAngleDoubleLeft } from 'react-icons/fa';


const Sidebar = () => {
  const { isExpanded, isSideBarOpen } = useSelector(
    (store: RootState) => store.app
  );

  const location = useLocation();

  const sideNavRef = useRef(null);
  const dispatch = useDispatch();

  function removeSlash(pathname: string) {
    return decodeURIComponent(
      pathname.startsWith('/') ? pathname.substring(1) : pathname
    );
  }
  function handleToggle() {
    dispatch(toggleExpanded());
  }

  useEffect(() => {
    dispatch(addHeaderTitle(removeSlash(location.pathname)));
  }, [dispatch, location.pathname]);

  //   useEffect(() => {
  //     function handleClickOutside(e) {
  //       if (sideNavRef.current && !sideNavRef.current.contains(e.target)) {
  //         dispatch(closeSideBar());
  //       }
  //     }
  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => {
  //       document.removeEventListener('mousedown', handleClickOutside);
  //     };
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [sideNavRef]);

  //   const dynamicStyles = isSideBarOpen ? 'translate-x-0' : '-translate-x-full';
  //   const sectionStyles = ` ${dynamicStyles}`;

  return (
    <aside
      className={`flex flex-col md:relative bg-base-100 absolute inset-0 z-50 px-[26px] shadow-lg  py-[32px] mr-2 h-screen overflow-y-auto overscroll-contain ${
        isExpanded ? 'w-1/5' : 'w-fit'
      } transition  ${
        isSideBarOpen ? 'translate-x-0 w-full' : ' -translate-x-full md:translate-x-0'
      }`}
      ref={sideNavRef}>
      <div className='flex justify-between items-center'>
        <div>
          <h3
            className={`overflow-hidden text-xl libre font-bold text-primary transition ${
              isExpanded ? 'w-fit' : 'w-0 h-0'
            }`}>
            Soul Tracka
          </h3>
        </div>

        {/* <img
          src={logo}
          alt=''
          className={`block transition-all   ${
            isExpanded ? 'w-[101px]' : 'w-0 h-0'
          }`}
        /> */}
        {/* only show this in mobile */}
        <RxCross2
          className='md:hidden text-2xl'
          onClick={() => {
            dispatch(closeSidebar());
          }}
        />
        {/* then show this on greater than medium screens */}
        <div
          className={`hidden md:block mb-1 h-[11px] transition-all  ${
            isExpanded ? '' : 'rotate-180'
          }`}
          onClick={handleToggle}>
          <FaAngleDoubleLeft />
        </div>
      </div>

      <div className='flex flex-col justify-center mt-[55px]'>
        <ul className='exo flex flex-col gap-4'>
          {sideLinks.map((sideLink) => {
            const { icon, name, url } = sideLink;
            return (
              <li
                key={name}
                className={`flex items-center transition-all  py-[10px] px-4 ${
                  location.pathname === url && 'bg-primary rounded-lg'
                } ${isExpanded ? 'w-full' : 'w-fit'}`}
                onClick={() => {
                  dispatch(closeSidebar());
                }}>
                <NavLink
                  to={url}
                  className='cursor-pointer block flex items-center'>
                  <div>{icon}</div>

                  <div
                    className={`capitalize font-medium overflow-hidden ${
                      isExpanded ? 'w-fit ml-2 ' : 'w-0 h-0'
                    } `}>
                    {name}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className='w-full justify-center'>
          <hr className='bg-[#EBEBEB] mt-[82px] mb-7' />
          <button type='button' className='flex py-[10px] px-4 '>
            <HiOutlineArrowLeftOnRectangle className='text-2xl inline' />
            <div
              className={`overflow-hidden transition-all  ${
                isExpanded ? 'w-fit ml-2' : 'w-0 m-0'
              }`}>
              Sign Out
            </div>
          </button>
          <hr className='bg-[#EBEBEB] mt-[89px] mb-5' />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
