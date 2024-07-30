import { useSelector } from "react-redux"
import { RootState} from "../redux/store"
import { Navigate } from "react-router-dom"


const Home = () => {
  const { user } = useSelector((store: RootState) => store.auth)
  console.log(user)

   return (
     <div>
       {user ? (
         <div>Welcome to Soul Tracka, {user.username}!</div>
       ) : (
        <Navigate to='/login'/>
       )}
     </div>
   );

}

export default Home