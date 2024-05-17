import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, Download } from "react-feather";
import TransactionForm from "./TransactionForm";
import { ModelShowContext } from "../../context/ModelShow";
import Table from "./Table";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useGetTransactionsQuery } from "../../redux/transaction/transactionApi";
import ReactToPrint from "react-to-print";
import PrintableComponent from "./PrintableComponent ";
import { IoPrintOutline } from "react-icons/io5";

const TransactionTable = () => {
  const [filter, setFilter] = useState();
  const { showModal, handleModelShow } = useContext(ModelShowContext);
  const [searchResults, setSearchResults] = useState([]);
  const [isExpenseChecked, setIsExpenseChecked] = useState(true);
  const [isIncomeChecked, setIsIncomeChecked] = useState(true);
  const filterRef = useRef(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionType, setTransactionType] = useState("");

  const { data: TransactionData } = useGetTransactionsQuery({
    type: transactionType,
  });

  const componentRef = useRef();

  const handleFilter = () => {
    setFilter(!filter);
  };

  // removes the dropdowns if the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        isExpenseChecked &&
        isIncomeChecked
      ) {
        setFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filter]);

  // filtering functionality
  // Function to handle Income checkbox
  const handleIncomeChange = () => {
    // If both are true or if Expense is false (meaning Income is true), toggle Income.
    if (isExpenseChecked || !isIncomeChecked) {
      setIsIncomeChecked(!isIncomeChecked);
    }
  };

  // Function to handle Expense checkbox
  const handleExpenseChange = () => {
    // If both are true or if Income is false (meaning Expense is true), toggle Expense.
    if (isIncomeChecked || !isExpenseChecked) {
      setIsExpenseChecked(!isExpenseChecked);
    }
  };

  // handleSearch it is about the search filter
  // handle filter
  const ApplyFilter = () => {
    if (isIncomeChecked && isExpenseChecked) {
      setTransactionType(null);
    } else if (isIncomeChecked) {
      setTransactionType("INCOME");
    } else if (isExpenseChecked) {
      setTransactionType("EXPENSE");
    }
  };

  useEffect(() => {
    ApplyFilter();
  }, [ApplyFilter, setTransactionType, isExpenseChecked, isIncomeChecked]);

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

  //Export pdf
  const downloadPdf = () => {
    const pdf = new jsPDF();

    // Define the columns for the table
    const columns = [
      { title: "Date", dataKey: "date" },
      { title: "Username", dataKey: "username" },
      { title: "Description", dataKey: "description" },
      { title: "Category", dataKey: "category" },
      { title: "Amount", dataKey: "amount" },
      // Add more columns as needed
    ];

    // Use your state that contains the table data
    const data = TransactionData?.data.map((item) => ({
      date: item.transactionDate,
      username: item.name,
      description: item.description,
      category: item.category,
      amount: item.amount,
      // Map other properties as needed
    }));

    // Add a title
    pdf.text("Personal Finance Manager", 20, 20);

    // Add the table to the PDF
    pdf.autoTable({
      columns: columns,
      body: data,
    });

    // Save the PDF
    pdf.save("table.pdf");
  };

  //Debounced Search
  const debounce = (func, delay = 500) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // search Functionality

  const handleSearch = useCallback(
    debounce((event) => {
      setSearchResults(event.target.value);
    }, 1000),
    []
  );

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
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
              onChange={handleSearch}
            />
            <div
              className="relative flex flex-col items-center"
              ref={filterRef}
            >
              <button
                onClick={handleFilter}
                className="z-10 flex items-center mb-4 gap-x-3"
              >
                Filter <ChevronDown />{" "}
              </button>
              <div
                className={` absolute z-10 mt-10 w-40 h-fit bg-[#F5F5F5] rounded-md py-2 px-2 gap-y-1 ${
                  filter ? "block" : "hidden"
                }`}
              >
                <div className="flex items-center mb-1 cursor-pointer gap-x-1">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={isIncomeChecked}
                    id="income"
                    onChange={handleIncomeChange}
                  />
                  <label
                    htmlFor="income"
                    className="cursor-pointer select-none"
                  >
                    Income
                  </label>
                </div>
                <div className="flex items-center mb-1 cursor-pointer gap-x-1 ">
                  <input
                    type="checkbox"
                    className="w-4 h-4 cursor-pointer"
                    checked={isExpenseChecked}
                    id="expense"
                    onChange={handleExpenseChange}
                  />
                  <label
                    htmlFor="expense"
                    className="cursor-pointer select-none"
                  >
                    Expense
                  </label>
                </div>
              </div>
            </div>
            <button
              onClick={downloadPdf}
              className="flex items-center h-8 px-3 text-sm border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md"
            >
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
            <div>
              <ReactToPrint
                trigger={() => (
                  <button className="flex items-center h-8 px-3 text-sm border-2 border-[#121B28] hover:text-white hover:bg-[#121B28] rounded-md">
                    <IoPrintOutline className="w-5 h-5 mr-1 cursor-pointer" />
                    Print Here
                  </button>
                )}
                content={() => componentRef.current}
                documentTitle="Transaction Report"
                pageStyle="print"
                onAfterPrint={() => console.log("Printed")}
                // onBeforePrint={() => console.log("Before Print")}
              />
              <div style={{ display: "none" }}>
                <PrintableComponent
                  ref={componentRef}
                  data={TransactionData?.data || []}
                />
              </div>
            </div>
          </div>
        </div>

        <Table
          setSelectedTransaction={setSelectedTransaction}
          transactionType={transactionType}
          searchResults={searchResults}
        />
      </div>
    </>
  );
};

export default TransactionTable;
