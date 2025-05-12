import React, { useState } from 'react';
import axios from 'axios';

export default function AddRoom() {
  const [room, setRoom] = useState({ roomNo: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/rooms', room);
    alert('Room added!');
    setRoom({ roomNo: '', type: '' });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0">Add New Room</h4>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Room Number */}
            <div className="mb-3">
              <label htmlFor="roomNo" className="form-label fw-bold text-white">Room Number</label>
              <input
                id="roomNo"
                type="text"
                className="form-control"
                placeholder="Enter room number"
                value={room.roomNo}
                onChange={e => setRoom({ ...room, roomNo: e.target.value })}
                required
              />
            </div>

            {/* Room Type */}
            <div className="mb-4">
              <label htmlFor="roomType" className="form-label fw-bold text-white">Room Type</label>
              <select
                id="roomType"
                className="form-select"
                value={room.type}
                onChange={e => setRoom({ ...room, type: e.target.value })}
                required
              >
                <option value="">Select Type</option>
                <option value="AC">AC</option>
                <option value="Non-AC">Non-AC</option>
              </select>
            </div>

            {/* Submit */}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                <i className="bi bi-plus-circle me-2"></i>Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
