import { Outlet, Navigate} from "react-router";
import useAuthStatus from "../hooks/useAuthStatus";
const PrivateRoute = () => {

    const loggedIn = useAuthStatus();

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute