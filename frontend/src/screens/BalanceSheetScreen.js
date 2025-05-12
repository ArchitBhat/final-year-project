import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function BalanceSheetScreen() {
  const [data, setData] = useState({ byDay: {}, byMonth: {} });

  const fetchBalance = async () => {
    const res = await axios.get('/balance-sheet');
    setData(res.data);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-5">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Balance Sheet Overview</h4>
        </div>
        <div className="card-body">

          {/* Daily Balance Table */}
          <h5 className="text-success fw-bold mt-3 mb-2">
            <i className="bi bi-calendar-day me-2"></i>Daily Report
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Profit (₹)</th>
                  <th>Expense (₹)</th>
                  <th>Net Profit/Loss (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.byDay).map(([day, val]) => (
                  <tr key={day}>
                    <td>{day}</td>
                    <td>{val.profit.toFixed(2)}</td>
                    <td>{val.expense.toFixed(2)}</td>
                    <td className={val.net >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                      {val.net.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Monthly Balance Table */}
          <h5 className="text-info fw-bold mt-5 mb-2">
            <i className="bi bi-calendar3 me-2"></i>Monthly Report
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Month</th>
                  <th>Profit (₹)</th>
                  <th>Expense (₹)</th>
                  <th>Net Profit/Loss (₹)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.byMonth).map(([month, val]) => (
                  <tr key={month}>
                    <td>{month}</td>
                    <td>{val.profit.toFixed(2)}</td>
                    <td>{val.expense.toFixed(2)}</td>
                    <td className={val.net >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                      {val.net.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
