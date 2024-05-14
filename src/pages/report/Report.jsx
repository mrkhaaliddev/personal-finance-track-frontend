import React from "react";
import SideBar from "../../components/sideBar/SideBar.";
import Header from "../../components/header/Header";

const Report = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="bg-[#F5F5F5] w-[100%] min-h-[100%] ml-60 ">
        <Header />
        <h1>Hello this is a Report Page still under development</h1>
      </div>
    </div>
  );
};

export default Report;
