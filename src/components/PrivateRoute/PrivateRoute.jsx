import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import authSelectors from "redux/session/session-selectors";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector(authSelectors.getIsAuth);
  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
