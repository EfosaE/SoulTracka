import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateLayout from './components/layout/PrivateLayout';
import Home from './pages/Home';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Signup />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'signup',
    element: <Signup/>,
  },
  {
    element: <PrivateLayout />,
    children: [{
      index: true,
      path: 'home',
      element: <Home/>
    }]
}
]);


function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
