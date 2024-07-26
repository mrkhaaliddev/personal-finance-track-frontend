// import React, { useEffect } from "react";
// import { useGetValidUserJWTQuery } from "./authUserSlice";
// import { useDispatch } from "react-redux";
// import { logout } from "./authSlice";

// function AuthManager() {
//   const { data: isUserValid, isLoading, isError } = useGetValidUserJWTQuery();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!isLoading && !isUserValid && !isError) {
//       dispatch(logout());
//     }
//   }, [isUserValid, isLoading, isError, dispatch]);

//   return null; // or any appropriate JSX
// }

// export default AuthManager;
