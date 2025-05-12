import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StaffScreen() {
  const [staff, setStaff] = useState([]);
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    idProof: '',
    gender: 'Male',
    salary: '',
    position: 'Manager',
  });

  const fetchStaff = async () => {
    const res = await axios.get('/staff');
    setStaff(res.data);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/staff', form);
      setForm({
        name: '',
        age: '',
        phone: '',
        idProof: '',
        gender: 'Male',
        salary: '',
        position: 'Manager',
      });
      fetchStaff();
    } catch (err) {
      console.error('Error saving staff:', err);
    }
  };

  const handleEdit = (s) => {
    setForm(s);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg mb-5">
        <div className="card-header bg-warning text-white text-center">
          <h4 className="mb-0">Staff Management</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Name */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>

              {/* Age */}
              <div className="col-md-3">
                <label className="form-label fw-bold text-white">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              {/* Phone */}
              <div className="col-md-3">
                <label className="form-label fw-bold text-white">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>

              {/* ID Proof */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">ID Proof</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID Card Number"
                  value={form.idProof}
                  onChange={(e) => setForm({ ...form, idProof: e.target.value })}
                />
              </div>

              {/* Gender */}
              <div className="col-md-3">
                <label className="form-label fw-bold text-white">Gender</label>
                <select
                  className="form-select"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Salary */}
              <div className="col-md-3">
                <label className="form-label fw-bold text-white">Salary (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Salary"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                />
              </div>

              {/* Position */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Position</label>
                <select
                  className="form-select"
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                >
                  <option value="Manager">Manager</option>
                  <option value="Cleaner">Cleaner</option>
                  <option value="Room Boy">Room Boy</option>
                </select>
              </div>
            </div>

            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-save me-2"></i>Save Staff
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Staff List */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">All Staff</h5>
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-secondary">
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>ID Proof</th>
                <th>Gender</th>
                <th>Salary</th>
                <th>Position</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.phone}</td>
                  <td>{item.idProof}</td>
                  <td>{item.gender}</td>
                  <td>₹{item.salary}</td>
                  <td>{item.position}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleEdit(item)}
                    >
                      <i className="bi bi-pencil"></i> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
