import React, { useContext } from "react";
import SideBar from "../../components/sideBar/SideBar.";
import DashboardPage from "./DashboardPage";
import Header from "../../components/header/Header";
import { NavBarHiddenContext } from "../../context/NavBarHidden";

const Dashboard = () => {
  const { isShow } = useContext(NavBarHiddenContext);
  return (
    <>
      <div className="flex overflow-hidden">
        <div>
          <SideBar />
        </div>
        <div
          className={`bg-[#F5F5F5] w-[100%] min-h-[100vh] ${
            isShow ? "ml-60" : "ml-0"
          }`}
        >
          <Header />
          <DashboardPage />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
