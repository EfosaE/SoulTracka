import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetProfileQuery } from '../redux/api/authApiSlice';
import { useEffect } from 'react';
import { setUser } from '../redux/features/authSlice';

const PrivateLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store: RootState) => store.auth);
  const { data, isLoading } = useGetProfileQuery('', { skip: !token });

  console.log(token);

  useEffect(() => {
    console.log('privatelayout', data);
    dispatch(setUser(data?.user));
  }, [data, dispatch]);

  const location = useLocation();
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading indicator
  }

  return token ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default PrivateLayout;
