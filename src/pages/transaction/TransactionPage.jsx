import React from "react";
import ResultBoxes from "../../components/ResultBoxes";
import TransactionTable from "./TransactionTable";

const TransactionPage = () => {
  return (
    <div className="mx-10 mt-6">
      <ResultBoxes />
      <TransactionTable />
    </div>
  );
};

export default TransactionPage;
