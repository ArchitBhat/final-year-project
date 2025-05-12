import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function BookRoom() {
  const [rooms, setRooms] = useState([]);
  const [booking, setBooking] = useState({
    roomNo: '',
    customerName: '',
    phoneNo: '',
    idCardNo: '',
    age: '',
    peopleCount: '',
    hours: '',
    price: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error('Error fetching rooms:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/bookings', booking);
    alert('Room booked!');
    setBooking({
      roomNo: '',
      customerName: '',
      phoneNo: '',
      idCardNo: '',
      age: '',
      peopleCount: '',
      hours: '',
      price: '',
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-success text-white text-center">
          <h4 className="mb-0">Book a Room</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Room Number */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Select Room</label>
                <select
                  className="form-select"
                  value={booking.roomNo}
                  onChange={e => setBooking({ ...booking, roomNo: e.target.value })}
                  required
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room._id} value={room.roomNo}>
                      {room.roomNo} - {room.type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Customer Name */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Full name"
                  value={booking.customerName}
                  onChange={e => setBooking({ ...booking, customerName: e.target.value })}
                  required
                />
              </div>

              {/* Phone No */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Phone number"
                  value={booking.phoneNo}
                  onChange={e => setBooking({ ...booking, phoneNo: e.target.value })}
                  required
                />
              </div>

              {/* ID Card No */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">ID Card Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="ID Card Number"
                  value={booking.idCardNo}
                  onChange={e => setBooking({ ...booking, idCardNo: e.target.value })}
                />
              </div>

              {/* Age */}
              <div className="col-md-4">
                <label className="form-label fw-bold text-white">Age</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={booking.age}
                  onChange={e => setBooking({ ...booking, age: e.target.value })}
                />
              </div>

              {/* People Count */}
              <div className="col-md-4">
                <label className="form-label fw-bold text-white">No. of People</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="People count"
                  value={booking.peopleCount}
                  onChange={e => setBooking({ ...booking, peopleCount: e.target.value })}
                />
              </div>

              {/* Hours */}
              <div className="col-md-4">
                <label className="form-label fw-bold text-white">Hours</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="No. of hours"
                  value={booking.hours}
                  onChange={e => setBooking({ ...booking, hours: e.target.value })}
                  required
                />
              </div>

              {/* Price */}
              <div className="col-md-6">
                <label className="form-label fw-bold text-white">Price (in ₹)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Booking price"
                  value={booking.price}
                  onChange={e => setBooking({ ...booking, price: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="d-grid mt-4">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-calendar-check me-2"></i>Book Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
