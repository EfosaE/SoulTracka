import { FaPersonWalking } from "react-icons/fa6";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { RiContactsLine } from "react-icons/ri";
import { TbMessagePlus, TbReportSearch } from "react-icons/tb";

export const sideLinks = [
  {
    icon: <LuLayoutDashboard className='text-2xl' />,
    name: 'dashboard',
    url: '/',
  },
  {
    icon: <RiContactsLine  className='text-2xl' />,
    name: 'outreach',
    url: '/outreach-contacts',
  },
  {
    icon: <FaPersonWalking  className='text-2xl' />,
    name: 'first timers',
    url: '/first-timers',
  },
  {
    icon: <TbReportSearch  className='text-2xl' />,
    name: 'reports',
    url: '/reports',
  },
  {
    icon: <TbMessagePlus className='text-2xl' />,
    name: 'Messages',
    url: '/messages',
  },
  {
    icon: <LuSettings className='text-2xl' />,
    name: 'Settings',
    url: '/settings',
  },
];
