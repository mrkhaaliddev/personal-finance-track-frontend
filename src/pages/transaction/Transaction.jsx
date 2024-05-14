import React, { useContext } from "react";
import SideBar from "../../components/sideBar/SideBar.";
import Header from "../../components/header/Header";
import TransactionTable from "./TransactionTable";
import ResultBoxes from "../../components/ResultBoxes";
import { NavBarHiddenContext } from "../../context/NavBarHidden";
import TransactionPage from "./TransactionPage";

const Transaction = () => {
  const { isShow } = useContext(NavBarHiddenContext);

  return (
    <div className="flex">
      <div>
        <SideBar />
      </div>
      <div
        className={`bg-[#F5F5F5] w-[100%] min-h-[100vh] h-auto overflow-x-hidden ${
          isShow ? "ml-60" : "ml-0"
        }`}
      >
        <Header />
        <TransactionPage />
      </div>
    </div>
  );
};

export default Transaction;
