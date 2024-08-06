import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import { logOut } from '../redux/features/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.auth);
  console.log(user);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome to Soul Tracka, {user.username}!</p>
          <button
            onClick={() => {
              dispatch(logOut());
            }}>
            log out
          </button>
        </div>
      ) : (
        <div>Welcome to Soul Tracka!</div>
      )}
    </div>
  );
};

export default Home;