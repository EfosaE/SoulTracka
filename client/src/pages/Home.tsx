import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logOut } from '../redux/features/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);

  return (
    <div>
      <div className='container'>
        <p>Welcome to Soul Tracka, {user?.username}!</p>
        <button
          onClick={() => {
            dispatch(logOut());
          }}>
          log out
        </button>
      </div>
    </div>
  );
};

export default Home;
