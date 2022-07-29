import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import selectors from "redux/session/session-selectors";

const PublicRoute = ({ children, restricted = false }) => {
  const isAuth = useSelector(selectors.getIsAuth);
  return <>{isAuth && restricted ? <Navigate to="/home" /> : children}</>;
};

export default PublicRoute;
