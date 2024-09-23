import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateLayout from './components/PrivateLayout';
import Home from './pages/Home';
import CommonUi from './components/CommonUi';
import OutreachContacts from './pages/OutreachContacts';
import FirstTimer from './pages/FirstTimers';
import Reports from './pages/Reports';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';


const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    element: <PrivateLayout />,
    children: [
      {
        element: <CommonUi />,
        children: [
          {
            index: true,
            path: '/',
            element: <Home />,
          },
          {
            path: '/outreach-contacts',
            element: <OutreachContacts />,
          },
          {
            path: '/first-timers',
            element: <FirstTimer />,
          },
          {
            path: '/reports',
            element: <Reports />,
          },
          {
            path: '/messages',
            element: <Messages />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer theme='light'/>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
