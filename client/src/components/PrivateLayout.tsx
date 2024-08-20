import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useGetProfileQuery } from '../redux/api/authApiSlice';
import { setUser } from '../redux/features/authSlice';

const PrivateLayout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token, user } = useSelector((store: RootState) => store.auth);

  const { data, isLoading, isSuccess } = useGetProfileQuery('', {
    skip: !token,
  });

  console.log(token);
  console.log(user);

  if (isLoading) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <span className='loading loading-spinner text-primary'></span>
      </div>
    ); // Or a more sophisticated loading indicator
  }
  console.log(isLoading)
  console.log(isSuccess);

  if (isSuccess) {
    dispatch(setUser(data?.user));
    return <Outlet />;
  }

    return <Navigate to='/login' state={{ from: location }} replace />;
 

};

export default PrivateLayout;
