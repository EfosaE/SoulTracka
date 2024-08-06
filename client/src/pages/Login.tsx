import { useDispatch } from "react-redux";
import { LoginRequest, useLoginMutation } from "../redux/api/authApiSlice";
import { setUser, setToken } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch()
  const navigate = useNavigate();
    const handleLogin = async (credentials:LoginRequest) => {
      try {
        const response = await login(credentials).unwrap();
        const user = response.user
          const accessToken = response.accessToken
        dispatch(setUser(user))
        dispatch(setToken(accessToken));
        console.log('Login successful:', response);
        navigate('/');
      } catch (error) {
        console.error('Failed to login:', error);
      }
    };
  return (
    <div>
      {/* Form for user to input credentials */}
      <button
        onClick={() =>
          handleLogin({ email: 'tosin@soul.io', password: '12wwwed3' })
        }>
        Login
      </button>
    </div>
  );
}

export default Login