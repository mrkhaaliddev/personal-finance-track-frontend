import React from "react";
import SideImages from "../../components/SideImages";
import Register from "./Register";

const RegisterDashboard = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row min-h-screen">
        <div className="hidden lg:block lg:w-2/5 bg-[#F6F7F9]">
          <SideImages />
        </div>
        <div className="lg:w-3/5 w-full bg-white flex justify-center items-center">
          <Register className="w-96" />
        </div>
      </div>
    </>
  );
};

export default RegisterDashboard;
