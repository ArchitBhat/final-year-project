import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function CustomerHistory() {
  const [bookings, setBookings] = useState([]);
  const [sortBy, setSortBy] = useState('checkInTime');
  const [order, setOrder] = useState('asc');

  const fetchBookings = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/bookings?sortBy=${sortBy}&order=${order}`
      );
      setBookings(res.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  }, [sortBy, order]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const toggleOrder = () => {
    setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Customer Booking History</h4>
        <div className="d-flex align-items-center">
          <label className="form-label me-2 mb-0 fw-bold">Sort By:</label>
          <select
            className="form-select form-select-sm me-3"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="checkInTime">Booking Time</option>
            <option value="name">Customer Name (A-Z)</option>
            <option value="room">Room Number (Asc)</option>
          </select>

          <button className="btn btn-sm btn-outline-primary" onClick={toggleOrder}>
            {order === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
          </button>
        </div>
      </div>

      <div className="row g-4">
        {bookings.map((b, i) => {
          const checkIn = new Date(b.checkInTime);
          const checkOut = new Date(checkIn.getTime() + b.hours * 60 * 60 * 1000);

          return (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h5 className="card-title mb-2">
                    <i className="bi bi-person-fill me-2 text-primary"></i>
                    {b.customerName}
                  </h5>
                  <p className="mb-1"><strong>Phone:</strong> {b.phoneNo}</p>
                  <p className="mb-1"><strong>Room No:</strong> <span className="badge bg-secondary">{b.roomNo}</span></p>
                  <p className="mb-1"><strong>Check-in:</strong> {checkIn.toLocaleString()}</p>
                  <p className="mb-1"><strong>Check-out:</strong> {checkOut.toLocaleString()}</p>
                  <p className="mb-0"><strong>Duration:</strong> {b.hours} hours</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
