import React from "react";
import JTECHLOGO from "../../assets/Jtech Logo.png";
import moment from "moment";

const PrintableComponent = React.forwardRef(({ data }, ref) => (
  <div ref={ref} style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #ddd",
        paddingBottom: "10px",
        marginBottom: "20px",
      }}
    >
      <img src={JTECHLOGO} alt="Logo" style={{ height: "70px" }} />
      <h1 style={{ margin: 0 }}>Personal Finance Manager</h1>
    </header>

    <section>
      <h2 style={{ borderBottom: "1px solid #ddd", paddingBottom: "5px" }}>
        Transaction Report
      </h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead className="font-semibold bg-slate-800">
          <tr>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Date
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Username
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Description
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Category
            </th>
            <th style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {moment(item.transactionDate).format("DD/MM/YYYY")}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {item.name}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {item.description}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {item.category}
              </td>
              <td style={{ borderBottom: "1px solid #ddd", padding: "10px" }}>
                {item.type === "INCOME" ? (
                  <span className="font-bold text-green-800">
                    {item.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                ) : (
                  <span className="font-bold text-red-600">
                    {item.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>

    <footer
      style={{
        marginTop: "40px",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        paddingTop: "10px",
      }}
    >
      <p style={{ margin: 0 }}>Printed by Personal Finance Manager</p>
      <p style={{ margin: 0 }}>© 2024 JTECH</p>
      <div className="mt-20">
        <p>
          <strong className="font-bold">Note: </strong>it was a pleasure working
          with you and your team. We hope you will keep us in mind for future
          freelance projects. Thank You!
        </p>
      </div>
    </footer>
  </div>
));

export default PrintableComponent;
