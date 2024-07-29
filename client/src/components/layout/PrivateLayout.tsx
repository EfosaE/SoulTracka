import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';


const PrivateLayout = () => {
  const {token} = useSelector((store: RootState)=> store.auth)
  const location = useLocation();
    return token  ? (
      <Outlet />
    ) : (
      <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default PrivateLayout;



