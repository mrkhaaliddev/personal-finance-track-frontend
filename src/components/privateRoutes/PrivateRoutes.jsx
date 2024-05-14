import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  // console.log("userInfo", userInfo);

  return userInfo ? children : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
