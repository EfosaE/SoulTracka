import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateLayout from './components/PrivateLayout';
import Home from './pages/Home';

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
        index: true,
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
