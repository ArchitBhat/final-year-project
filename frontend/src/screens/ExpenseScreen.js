import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ExpenseScreen() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ byDay: {}, byMonth: {} });
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Daily',
    date: new Date().toISOString().substr(0, 10),
  });

  const fetchExpenses = async () => {
    const res = await axios.get('/expenses');
    setExpenses(res.data);
  };

  const fetchSummary = async () => {
    const res = await axios.get('/expense-summary');
    setSummary(res.data);
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/expenses', form);
      setForm({ ...form, title: '', amount: '' });
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  return (
    <div className="container mt-5">
      {/* Form Card */}
      <div className="card shadow-lg mb-5">
        <div className="card-header bg-danger text-white text-center">
          <h4 className="mb-0">Add New Expense</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Title */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Expense Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              {/* Amount */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Amount (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              </div>

              {/* Category */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Category</label>
                <select
                  className="form-select"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  <option value="">Select Category</option>
                  <option value="Daily">Daily</option>
                  <option value="Staff">Staff</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Laundry">Laundry</option>
                </select>
              </div>

              {/* Date */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
              </div>
            </div>

            <div className="d-grid mt-4">
              <button className="btn btn-primary" type="submit">
                <i className="bi bi-plus-circle me-2"></i>Save Expense
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">All Expenses</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((exp) => (
                <tr key={exp._id}>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td>{exp.title}</td>
                  <td>
                    <span className="badge bg-info text-dark">{exp.category}</span>
                  </td>
                  <td>{exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Daily Totals */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Daily Expense Summary</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.byDay).map(([day, total]) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Totals */}
      <div className="card shadow-sm">
        <div className="card-header bg-secondary text-white">
          <h5 className="mb-0">Monthly Expense Summary</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Month</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(summary.byMonth).map(([month, total]) => (
                <tr key={month}>
                  <td>{month}</td>
                  <td>{total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
