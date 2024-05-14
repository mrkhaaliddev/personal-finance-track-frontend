import React, { useContext, useEffect, useRef, useState } from "react";
import { ChevronDown, Download } from "react-feather";
import TransactionForm from "./TransactionForm";
import { ModelShowContext } from "../../context/ModelShow";
import Table from "./Table";
import jsPDF from "jspdf";
import "jspdf-autotable";

// import DataTable from "react-data-table-component";
const TransactionTable = () => {
  // this is for hidden and showing the filter dropdown
  const [filter, setFilter] = useState();
  // this is for model show or hidden and it's context Api
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  // this have the data of the table taking from localStorage
  const [TransactionForms, setTransactionForms] = useState([]);
  // this is for edit or update table
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState(null);
  // this is for search filtering
  const [searchResults, setSearchResults] = useState([]);
  // making filter dropdowns
  const [isExpenseChecked, setIsExpenseChecked] = useState(true);
  const [isIncomeChecked, setIsIncomeChecked] = useState(true);
  const filterRef = useRef(null);
  // looking the selected helping for the edit
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // this have the column and the rows of the table
  // const [transactionData, setTransactionData] = useState([]);

  // const handleFilter = () => {
  //   setFilter(!filter);
  // };

  // removes the dropdowns if the user clicks outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (filterRef.current && !filterRef.current.contains(event.target)) {
  //       setFilter(false); // Close the dropdown if clicking outside
  //     }
  //     // console.log(event.target);
  //     // console.log(filterRef.current);
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [filter]);

  // filtering functionality
  // Function to handle Income checkbox
  // const handleIncomeChange = () => {
  //   // If both are true or if Expense is false (meaning Income is true), toggle Income.
  //   if (isExpenseChecked || !isIncomeChecked) {
  //     setIsIncomeChecked(!isIncomeChecked);
  //   }
  // };

  // Function to handle Expense checkbox
  // const handleExpenseChange = () => {
  //   // If both are true or if Income is false (meaning Expense is true), toggle Expense.
  //   if (isIncomeChecked || !isExpenseChecked) {
  //     setIsExpenseChecked(!isExpenseChecked);
  //   }
  // };

  // handleSearch it is about the search filter
  // handle filter
  // const ApplyFilter = () => {
  //   const filteredResult = TransactionForms.filter((transaction) => {
  //     const isIncome = transaction.type === "income" && isIncomeChecked;
  //     const isExpense = transaction.type === "expense" && isExpenseChecked;

  //     // console.log(isIncome);
  //     // console.log(isIncomeChecked);
  //     // console.log(isExpense);
  //     // console.log(isExpenseChecked);
  //     return isIncome || isExpense;
  //   });

  //   setSearchResults(filteredResult);
  //   return filteredResult;
  // };

  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value.toLowerCase();

  //   const SearchfilteredResults = TransactionForms.filter((transaction) => {
  //     const matchedSearch =
  //       !searchTerm ||
  //       transaction.category.toLowerCase().includes(searchTerm) ||
  //       transaction.description.toLowerCase().includes(searchTerm) ||
  //       transaction.date.toLowerCase().includes(searchTerm);

  //     return matchedSearch;
  //   });

  //   console.log(SearchfilteredResults);

  //   setSearchResults(SearchfilteredResults);
  //   // console.log(filteredResults);
  // };

  // useEffect(() => {
  //   ApplyFilter();
  // }, [TransactionForms, isExpenseChecked, isIncomeChecked]);

  //Export pdf
  // const downloadPdf = () => {
  //   const pdf = new jsPDF();

  //   // Define the columns for the table
  //   const columns = [
  //     { title: "Date", dataKey: "date" },
  //     { title: "Username", dataKey: "username" },
  //     { title: "Description", dataKey: "description" },
  //     { title: "Category", dataKey: "category" },
  //     { title: "Amount", dataKey: "amount" },
  //     // Add more columns as needed
  //   ];

  //   // Use your state that contains the table data
  //   const data = transactionData.map((item) => ({
  //     date: item.transactionDate,
  //     username: item.name,
  //     description: item.description,
  //     category: item.category,
  //     amount: item.amount,
  //     // Map other properties as needed
  //   }));

  //   // Add a title
  //   pdf.text("Personal Finance Manager", 20, 20);

  //   // Add the table to the PDF
  //   pdf.autoTable({
  //     columns: columns,
  //     body: data,
  //   });

  //   // Save the PDF
  //   pdf.save("table.pdf");
  // };

  return (
    <>
      <div className="relative w-full px-5 py-5 bg-white mb-[105px] rounded-xl h-fit">
        <TransactionForm
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
        />
        <div className="flex justify-between">
          <div className="mb-5">
            <h1 className="mb-2 text-3xl font-semibold">Transactions!</h1>
            <p className="text-slate-700">
              Streamline transactions. Elevate decisions.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                setEditData(null);
                setEditIndex(null);
                handleModelShow(true);
              }}
              className="hover:bg-[#121B28] border-2 font-semibold border-[#121B28] text-[#121B28] hover:text-white rounded-lg py-2 px-4 "
            >
              {" "}
              New Transaction
            </button>
          </div>
        </div>
        <div className="flex items-start justify-between w-full gap-x-4">
          <div className="flex gap-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 py-1 pl-3 text-sm border rounded-md border-slate-300 outline-slate-400"
              // onChange={handleSearch}
            />
            <div
              className="relative flex flex-col items-center"
              ref={filterRef}
            >
              <button
                // onClick={handleFilter}
                className="z-10 flex items-center mb-4 gap-x-3"
              >
                Filter <ChevronDown />{" "}
              </button>
              <div
                className={` absolute mt-10 w-40 h-fit bg-[#F5F5F5] rounded-md py-2 px-2 gap-y-1 ${
                  filter ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center mb-1 cursor-pointer gap-x-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    // checked={isIncomeChecked}
                    id="income"
                    // onChange={handleIncomeChange}
                  />
                  <label htmlFor="income" className="cursor-pointer">
                    Income
                  </label>
                </div>
                <div className="flex items-center mb-1 cursor-pointer gap-x-1 ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    // checked={isExpenseChecked}
                    id="expense"
                    // onChange={handleExpenseChange}
                  />
                  <label htmlFor="expense" className="cursor-pointer">
                    Expense
                  </label>
                </div>
              </div>
            </div>
            <button
              // onClick={downloadPdf}
              className="flex items-center h-8 px-3 text-sm border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
        </div>

        {/* {searchResults.length > 0 ? ( */}
        <Table setSelectedTransaction={setSelectedTransaction} />
        {/* ) : (
          <article>No Matching Transaction</article>
        )} */}
      </div>
    </>
  );
};

export default TransactionTable;
