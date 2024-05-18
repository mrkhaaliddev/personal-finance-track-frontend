import React from "react";
import { Chart as Chartjs, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useGetTransactionGraphDataQuery } from "@/redux/transaction/transactionApi";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.padding = 10;
defaults.plugins.title.color = "black";

const GraphDashboard = () => {
  const { data: data } = useGetTransactionGraphDataQuery();
  const months = data?.data;
  console.log(months);
  // console.log(months?.map((data) => data.totalIncome));
  // console.log(months?.map((data) => data.month));
  // console.log(months?.map((data) => data.totalExpense));
  return (
    <>
      <div className="w-[74%] mb-5 bg-white h-[400px] rounded-xl flex text-center items-center justify-center border-none p-5">
        <Line
          data={{
            labels: months?.map((data) => data.month),
            datasets: [
              {
                label: "income",
                data: months?.map((data) => data.totalIncome),
                backgroundColor: "#BED5F1",
                borderColor: "#BED5F1",
                borderJoinStyle: "round",
                pointRadius: 3,
                tension: 0.4,
                pointHoverBorderWidth: 3,
              },
              {
                label: "expense",
                data: months?.map((data) => data.totalExpense),
                backgroundColor: "#FFB7AF",
                borderColor: "#FFB7AF",
                borderJoinStyle: "round",
                pointRadius: 3,
                tension: 0.4,
                pointHoverBorderWidth: 3,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Monthly Income and Expenses",
                align: "start",
              },
              legend: {
                position: "top",
                align: "end",
                labels: {
                  boxWidth: 12,
                  padding: 20,
                },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default GraphDashboard;
