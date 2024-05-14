import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Route, RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginDashboard from "./pages/login/LoginDashboard.jsx";
import RegisterDashboard from "./pages/register/RegisterDashboard.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import ErrorPage from "./error/ErrorPage.jsx";
import Budget from "./pages/budget/Budget.jsx";
import Report from "./pages/report/Report.jsx";
import Settings from "./pages/settings/Settings.jsx";
import ForgetPassword from "./pages/forgetPassword/ForgetPassword.jsx";
import { NavBaRProvider } from "./context/NavBarHidden.jsx";
import Transaction from "./pages/transaction/Transaction.jsx";
import { ModelShowProvider } from "./context/ModelShow.jsx";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import PrivateRoutes from "./components/privateRoutes/PrivateRoutes.jsx";
import PublicRoutes from "./components/privateRoutes/PublicRoutes.jsx";
import EditProfile from "./components/header/EditProfile.jsx";
import Category from "./pages/category/Index.jsx";

const routerProvider = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
  },

  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginDashboard />
      </PublicRoutes>
    ),
  },
  {
    path: "/forgetPassword",
    element: (
      <PublicRoutes>
        <ForgetPassword />
      </PublicRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <RegisterDashboard />
      </PublicRoutes>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
  },
  {
    path: "/transaction",
    element: (
      <PrivateRoutes>
        <Transaction />
      </PrivateRoutes>
    ),
  },
  {
    path: "/budget",
    element: (
      <PrivateRoutes>
        <Budget />
      </PrivateRoutes>
    ),
  },
  {
    path: "/report",
    element: (
      <PrivateRoutes>
        <Report />
      </PrivateRoutes>
    ),
  },
  {
    path: "/settings",
    element: (
      <PrivateRoutes>
        <Settings />
      </PrivateRoutes>
    ),
  },
  {
    path: "/Edit-profile",
    element: (
      <PrivateRoutes>
        <EditProfile />
      </PrivateRoutes>
    ),
  },
  {
    path: "/category",
    element: (
      <PrivateRoutes>
        <Category />
      </PrivateRoutes>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <NavBaRProvider>
        <ModelShowProvider>
          <RouterProvider router={routerProvider}></RouterProvider>
        </ModelShowProvider>
      </NavBaRProvider>
    </React.StrictMode>
  </Provider>
);
