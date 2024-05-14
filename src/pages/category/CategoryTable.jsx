import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "react-feather";
import TransactionForm from "../transaction/TransactionForm";
import { ModelShowContext } from "../../context/ModelShow";
import Table from "./Table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import CategoryModal from "./CategoryModal";

// import DataTable from "react-data-table-component";
const CategoryTable = () => {
  // this is for model show or hidden and it's context Api
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <>
      <div className="relative w-[85%] mt-20 px-5 py-5 bg-white mx-20 rounded-xl h-fit ">
        <CategoryModal
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <div className="flex justify-between">
          <div className="mb-5">
            <h1 className="mb-2 text-3xl font-semibold">Categories!</h1>
            <p className="text-slate-700">
              Streamline Categories. Elevate decisions.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                handleModelShow(true);
              }}
              className="hover:bg-[#121B28] border-2 font-semibold border-[#121B28] text-[#121B28] hover:text-white rounded-lg py-2 px-4 "
            >
              {" "}
              New Category
            </button>
          </div>
        </div>
        <Table
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
};

export default CategoryTable;
