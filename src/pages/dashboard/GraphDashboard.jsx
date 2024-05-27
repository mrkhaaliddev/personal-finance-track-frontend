import React from "react";
import { Bar } from "react-chartjs-2";
import { useGetTransactionGraphDataQuery } from "@/redux/transaction/transactionApi";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetGraphDataQuery } from "@/redux/budget/budgetApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const GraphDashboard = () => {
  const { data: Graphdata } = useGetTransactionGraphDataQuery();
  const { data: budgetData } = useGetGraphDataQuery();
  const months = Graphdata?.data;
  const monthData = budgetData?.data[0];

  console.log("budgetData", monthData);

  const incomeData = Array(12).fill(monthData?.monthlyIncome);
  const expenseData = Array(12).fill(monthData?.monthlyExpense);

  console.log("incomeData", incomeData);
  console.log("expenseData", expenseData);
  const data = {
    // months?.map((data) => data.month)
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Income",
        backgroundColor: "#66bb6a",
        borderColor: "#43a047",
        borderWidth: 1,
        hoverBackgroundColor: "#81c784",
        hoverBorderColor: "#66bb6a",
        data: months?.map((data) => data.totalIncome),
      },
      {
        label: "Total Income",
        backgroundColor: "#2adbc4",
        borderColor: "#2adbc4",
        borderWidth: 1,
        hoverBackgroundColor: "#2adbc4",
        hoverBorderColor: "#2adbc4",
        data: incomeData,
      },
      {
        label: "Expense",
        backgroundColor: "#fa113c",
        borderColor: "#fa113c",
        borderWidth: 1,
        hoverBackgroundColor: "#fa113c",
        hoverBorderColor: "#fa113c",
        data: months?.map((data) => data.totalExpense),
      },
      {
        label: "Total Expense",
        backgroundColor: "#9e78f0",
        borderColor: "#9e78f0",
        borderWidth: 1,
        hoverBackgroundColor: "#9e78f0",
        hoverBorderColor: "#9e78f0",
        data: expenseData,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to fully fill the div
    scales: {
      x: {
        barPercentage: 0.8, // Adjusted for better bar thickness
        categoryPercentage: 0.8, // Adjusted for spacing between bars
      },
    },
    plugins: {
      legend: {
        position: "top",
        align: "end",
      },
      title: {
        display: true,
        text: "Monthly Data Comparison",
        align: "start",
        font: {
          size: 16,
        },
      },
    },
  };

  return (
    <>
      <div className="w-[100%] my-5 bg-white h-[500px] rounded-xl flex justify-center items-center p-5 shadow-lg">
        <div className="w-full h-full">
          <Bar data={data} options={options} />
        </div>
      </div>
    </>
  );
};

export default GraphDashboard;
