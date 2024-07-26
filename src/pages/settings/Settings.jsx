import React, { useContext } from "react";
import SideBar from "../../components/sideBar/SideBar.";
import Header from "../../components/header/Header";
import ProfileSettings from "./ProfileSettings";
import { NavBarHiddenContext } from "@/context/NavBarHidden";

const Settings = () => {
  const { isShow } = useContext(NavBarHiddenContext);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div
        className={`bg-[#F5F5F5] w-[100%] min-h-[100vh] ${
          isShow ? "ml-60" : "ml-0"
        }`}
      >
        <Header />
        <div className="-mt-5">
          <ProfileSettings />
        </div>
      </div>
    </div>
  );
};

export default Settings;
