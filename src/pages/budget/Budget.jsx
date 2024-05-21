import React from "react";
import SideBar from "../../components/sideBar/SideBar.";
import Header from "../../components/header/Header";
import BudgetTable from "./BudgetTable";

const Budget = () => {
  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div className="bg-[#F5F5F5] w-[100%] min-h-[100svh] ml-60 ">
        <Header />
        <BudgetTable />
      </div>
    </div>
  );
};

export default Budget;
