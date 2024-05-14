import React from "react";
import ResultBoxes from "../../components/ResultBoxes";
import GraphDashboard from "./GraphDashboard";
import TransactionHistory from "./TransactionHistory";

const DashboardPage = () => {
  return (
    <>
      <div className="mx-10 mt-6 ">
        <ResultBoxes />
        <GraphDashboard />
        <TransactionHistory />
      </div>
    </>
  );
};

export default DashboardPage;
