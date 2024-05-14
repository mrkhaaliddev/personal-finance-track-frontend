import React, { useContext } from "react";
import SideBar from "../../components/sideBar/SideBar..jsx";
import CategoryTable from "./CategoryTable";
import Header from "../../components/header/Header";
import { NavBarHiddenContext } from "../../context/NavBarHidden.jsx";
// import TransactionTable from "../transaction/TransactionTable.jsx";

const category = () => {
  const { isShow } = useContext(NavBarHiddenContext);

  return (
    <div className="flex">
      <SideBar />
      <div
        className={`bg-[#F5F5F5] w-[100%] min-h-[100vh] ${
          isShow ? "ml-60" : "ml-0"
        }`}
      >
        <Header />
        <CategoryTable />{" "}
      </div>
    </div>
  );
};

export default category;
