import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Accountability() {
  const [profits, setProfits] = useState({ byDay: {}, byMonth: {}, byYear: {} });

  useEffect(() => {
    axios.get('/profits')
      .then(res => setProfits(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-5">
        <div className="card-header bg-success text-white text-center">
          <h4 className="mb-0">Accountability Report</h4>
        </div>
        <div className="card-body">

          {/* Daily Profit */}
          <h5 className="text-success fw-bold mt-4 mb-3">
            <i className="bi bi-calendar-day me-2"></i>Daily Profit
          </h5>
          <div className="row g-3">
            {Object.entries(profits.byDay).map(([day, amount]) => (
              <div key={day} className="col-12 col-md-4">
                <div className="card bg-light border-success shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">{day}</h6>
                    <p className="card-text fw-bold text-success">₹{amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Monthly Profit */}
          <h5 className="text-info fw-bold mt-5 mb-3">
            <i className="bi bi-calendar3 me-2"></i>Monthly Profit
          </h5>
          <div className="row g-3">
            {Object.entries(profits.byMonth).map(([month, amount]) => (
              <div key={month} className="col-12 col-md-4">
                <div className="card bg-light border-info shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">{month}</h6>
                    <p className="card-text fw-bold text-info">₹{amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Yearly Profit */}
          <h5 className="text-primary fw-bold mt-5 mb-3">
            <i className="bi bi-calendar-range me-2"></i>Yearly Profit
          </h5>
          <div className="row g-3">
            {Object.entries(profits.byYear).map(([year, amount]) => (
              <div key={year} className="col-12 col-md-4">
                <div className="card bg-light border-primary shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">{year}</h6>
                    <p className="card-text fw-bold text-primary">₹{amount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
